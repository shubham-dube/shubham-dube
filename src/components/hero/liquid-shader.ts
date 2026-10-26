/**
 * Raymarched "liquid metal": four spheres smooth-unioned into one slowly
 * morphing form, shaded as polished chrome reflecting a procedural studio
 * (key softbox, ember rim, cool fill) with a thin-film sheen at grazing angles.
 *
 * Everything is in one fragment shader over a full-screen triangle, so there is
 * no geometry, no textures and no 3D library.
 */

export const VERTEX_SHADER = /* glsl */ `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export const FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision highp float;

uniform vec2  uRes;      // drawing-buffer size in px
uniform float uTime;     // seconds
uniform vec2  uPointer;  // smoothed, -1..1
uniform vec3  uAccent;   // ember
uniform float uLight;    // 0 = dark theme, 1 = light theme

out vec4 outColor;

const int   STEPS = 72;
const float FAR   = 7.0;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float map(vec3 p) {
  // The whole form leans gently toward the pointer.
  p.xz *= rot(uPointer.x * 0.35);
  p.yz *= rot(-uPointer.y * 0.25);

  float t = uTime * 0.32;
  float d = length(p - vec3(sin(t) * 0.42, cos(t * 1.3) * 0.28, sin(t * 0.7) * 0.25)) - 0.66;
  d = smin(d, length(p - vec3(cos(t * 0.9 + 1.0) * 0.72, sin(t * 1.1) * 0.52, cos(t * 0.6) * 0.35)) - 0.42, 0.48);
  d = smin(d, length(p - vec3(sin(t * 1.6 + 2.0) * 0.62, sin(t * 0.8 + 1.0) * 0.64, 0.2)) - 0.34, 0.42);
  d = smin(d, length(p - vec3(cos(t * 0.5 + 4.0) * 0.5, cos(t * 1.4 + 3.0) * 0.58, -0.25)) - 0.3, 0.38);

  // A slow, low-amplitude ripple keeps the surface alive without looking noisy.
  d += 0.012 * sin(p.x * 7.0 + t * 2.2) * sin(p.y * 8.0 - t * 1.7) * sin(p.z * 6.0 + t);
  return d;
}

// Tetrahedral normal: 4 map() calls instead of 6.
vec3 normalAt(vec3 p) {
  const vec2 k = vec2(1.0, -1.0);
  const float h = 0.0015;
  return normalize(
    k.xyy * map(p + k.xyy * h) +
    k.yyx * map(p + k.yyx * h) +
    k.yxy * map(p + k.yxy * h) +
    k.xxx * map(p + k.xxx * h));
}

vec3 studio(vec3 r) {
  float y = r.y;
  vec3 dark  = mix(vec3(0.012, 0.012, 0.016), vec3(0.085, 0.085, 0.1), smoothstep(-0.6, 0.9, y));
  vec3 light = mix(vec3(0.42, 0.41, 0.40), vec3(0.97, 0.96, 0.94), smoothstep(-0.6, 0.9, y));
  vec3 c = mix(dark, light, uLight);

  // Horizon band: gives chrome its definition on a light background.
  float band = exp(-pow((y + 0.05) * 6.0, 2.0));
  c = mix(c, vec3(0.06, 0.06, 0.07), band * 0.85 * uLight);

  // Two crisp softbox strips (top and left) give chrome its sharp highlights.
  float top  = (1.0 - smoothstep(0.0, 0.06, abs(r.y - 0.62))) * (1.0 - smoothstep(0.1, 0.85, abs(r.x + 0.2)));
  float side = (1.0 - smoothstep(0.0, 0.03, abs(r.x + 0.8))) * (1.0 - smoothstep(0.0, 0.7, abs(r.y - 0.15)));
  float rim  = smoothstep(0.3, 1.0, dot(r, normalize(vec3(0.95, -0.25, -0.25))));
  float fill = smoothstep(0.45, 1.0, dot(r, normalize(vec3(-0.9, -0.35, 0.1))));

  c += vec3(1.0, 0.98, 0.95) * (top * 1.7 + side * 0.9) * mix(1.0, 0.75, uLight);
  c += uAccent * rim * mix(1.3, 1.0, uLight);
  c += vec3(0.30, 0.36, 0.95) * fill * mix(0.32, 0.25, uLight);
  return c;
}

vec3 shade(vec3 p, vec3 rd) {
  vec3 n = normalAt(p);
  vec3 r = reflect(rd, n);
  float ndv = max(dot(n, -rd), 0.0);
  float fresnel = pow(1.0 - ndv, 4.0);

  // Polished metal: tinted F0, then fresnel toward full reflection.
  vec3 f0 = mix(vec3(0.62), vec3(0.78, 0.76, 0.74), uLight);
  vec3 col = studio(r) * mix(f0, vec3(1.0), fresnel);

  // Thin-film sheen only near the silhouette.
  vec3 film = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + ndv * 1.4 + 0.15 * n.y));
  col = mix(col, col * film * 1.6, fresnel * 0.55);

  // Gentle tone map and gamma.
  col = col / (1.0 + col * 0.35);
  return pow(col, vec3(0.92));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, 0.0, 4.4);
  vec3 rd = normalize(vec3(uv, -1.55));

  float t = 0.0;
  float cone = 1e9;   // closest approach relative to distance: soft silhouettes
  float tEdge = 0.0;  // where that closest approach happened
  float dmin = 1e9;   // closest absolute approach: the halo
  bool hit = false;
  for (int i = 0; i < STEPS; i++) {
    float d = map(ro + rd * t);
    dmin = min(dmin, d);
    if (t > 0.0 && d / t < cone) { cone = d / t; tEdge = t; }
    if (d < 0.0008) { hit = true; break; }
    t += d;
    if (t > FAR) break;
  }

  if (hit) {
    outColor = vec4(shade(ro + rd * t, rd), 1.0);
    return;
  }

  // Miss: a faint ember halo, plus the surface itself for pixels the edge
  // only partly covers (cheap anti-aliasing). Output is premultiplied.
  // The vignette takes the halo to zero well inside the canvas edge.
  float halo = exp(-dmin * 6.0) * mix(0.16, 0.1, uLight) * (1.0 - smoothstep(0.32, 0.5, length(uv)));
  vec4 col = vec4(uAccent * halo, halo);
  float edge = 1.0 - smoothstep(0.0, 2.0 / uRes.y, cone);
  if (edge > 0.002) {
    col = mix(col, vec4(shade(ro + rd * tEdge, rd), 1.0), edge);
  }
  outColor = col;
}
`;
