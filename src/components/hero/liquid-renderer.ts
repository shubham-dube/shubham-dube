import { FRAGMENT_SHADER, VERTEX_SHADER } from './liquid-shader';

export interface LiquidOptions {
  /** Draw a single still frame and never animate. */
  still: boolean;
}

const MAX_DPR = 1.5;
const MIN_SCALE = 0.45;
const SLOW_FRAME_MS = 22;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(`Shader compile failed: ${log}`);
  }
  return sh;
}

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.trim().replace('#', '');
  const v = parseInt(m.length === 3 ? m.replace(/./g, (c) => c + c) : m, 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

/**
 * Owns the WebGL2 context, the render loop and every performance guard:
 * capped DPR, adaptive resolution, pause when off-screen or hidden, and a
 * single still frame for reduced motion. Framework-agnostic; React only mounts it.
 */
export class LiquidRenderer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private u: Record<'res' | 'time' | 'pointer' | 'accent' | 'light', WebGLUniformLocation | null>;
  private raf = 0;
  private running = false;
  private visible = true;
  private scale = 1;
  private start = performance.now();
  private elapsed = 0;
  private last = 0;
  private slowFrames = 0;
  private pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  private observer: ResizeObserver;
  private io: IntersectionObserver;

  constructor(
    private canvas: HTMLCanvasElement,
    private opts: LiquidOptions,
  ) {
    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'high-performance' });
    if (!gl) throw new Error('WebGL2 unavailable');
    this.gl = gl;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.bindAttribLocation(program, 0, 'aPos');
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'link failed');
    this.program = program;
    gl.useProgram(program);

    // One triangle that covers the viewport.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    this.u = {
      res: gl.getUniformLocation(program, 'uRes'),
      time: gl.getUniformLocation(program, 'uTime'),
      pointer: gl.getUniformLocation(program, 'uPointer'),
      accent: gl.getUniformLocation(program, 'uAccent'),
      light: gl.getUniformLocation(program, 'uLight'),
    };

    this.scale = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    this.syncTheme();

    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(canvas);
    this.io = new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting;
      this.updateRunning();
    });
    this.io.observe(canvas);
    document.addEventListener('visibilitychange', this.updateRunning);
    canvas.addEventListener('webglcontextlost', this.onContextLost);
    if (!opts.still) window.addEventListener('pointermove', this.onPointer, { passive: true });

    this.resize();
    this.updateRunning();
  }

  /** Re-read the accent colour and theme from CSS (call after a theme switch). */
  syncTheme = () => {
    const css = getComputedStyle(document.documentElement);
    const light = document.documentElement.dataset.theme === 'light' ? 1 : 0;
    this.gl.uniform3fv(this.u.accent, hexToRgb(css.getPropertyValue('--accent') || '#ff6b3d'));
    this.gl.uniform1f(this.u.light, light);
    if (!this.running) this.draw();
  };

  private onPointer = (e: PointerEvent) => {
    this.pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    this.pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };

  private onContextLost = (e: Event) => {
    e.preventDefault();
    this.stop();
    this.canvas.dataset.lost = '';
  };

  private resize() {
    const { clientWidth: w, clientHeight: h } = this.canvas;
    if (!w || !h) return;
    this.canvas.width = Math.round(w * this.scale);
    this.canvas.height = Math.round(h * this.scale);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.uniform2f(this.u.res, this.canvas.width, this.canvas.height);
    if (!this.running) this.draw();
  }

  private updateRunning = () => {
    const shouldRun = !this.opts.still && this.visible && document.visibilityState === 'visible';
    if (shouldRun && !this.running) {
      this.running = true;
      this.last = performance.now();
      this.start = this.last - this.elapsed * 1000;
      this.raf = requestAnimationFrame(this.frame);
    } else if (!shouldRun && this.running) {
      this.stop();
    }
  };

  private stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private frame = (now: number) => {
    if (!this.running) return;
    const dt = now - this.last;
    this.last = now;

    // Adaptive resolution: a run of slow frames steps the buffer down.
    if (dt > SLOW_FRAME_MS && dt < 200) this.slowFrames++;
    else this.slowFrames = Math.max(0, this.slowFrames - 1);
    if (this.slowFrames > 20 && this.scale > MIN_SCALE) {
      this.scale = Math.max(MIN_SCALE, this.scale * 0.8);
      this.slowFrames = 0;
      this.resize();
    }

    this.elapsed = (now - this.start) / 1000;
    const p = this.pointer;
    p.x += (p.tx - p.x) * 0.04;
    p.y += (p.ty - p.y) * 0.04;
    this.draw();
    this.raf = requestAnimationFrame(this.frame);
  };

  private draw() {
    const gl = this.gl;
    // Still mode shows a well-composed moment rather than t = 0.
    gl.uniform1f(this.u.time, this.opts.still ? 7.5 : this.elapsed + 7.5);
    gl.uniform2f(this.u.pointer, this.pointer.x, -this.pointer.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  destroy() {
    this.stop();
    this.observer.disconnect();
    this.io.disconnect();
    document.removeEventListener('visibilitychange', this.updateRunning);
    window.removeEventListener('pointermove', this.onPointer);
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.gl.deleteProgram(this.program);
  }
}
