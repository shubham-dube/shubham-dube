import { ImageResponse } from 'next/og';
import { highlights, profile } from '@/content';

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** The social card: name, role and three proof points on ink, with the orb. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#08080a',
          color: '#edebe6',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: -40,
            width: 620,
            height: 620,
            borderRadius: 620,
            background:
              'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), rgba(255,255,255,0) 30%), radial-gradient(circle at 72% 76%, #ff6b3d, rgba(255,107,61,0) 55%), radial-gradient(circle at 50% 50%, #3a43a8, #101016 72%)',
          }}
        />
        <div style={{ display: 'flex', fontSize: 22, letterSpacing: 4, color: '#ff6b3d', fontFamily: 'monospace' }}>
          DUBEY.APP
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 128, lineHeight: 0.9, letterSpacing: -4 }}>{profile.name}</div>
          <div style={{ fontSize: 36, marginTop: 24, color: '#a6a49e', fontFamily: 'sans-serif' }}>{profile.role}</div>
          <div style={{ display: 'flex', gap: 48, marginTop: 48 }}>
            {highlights.slice(0, 3).map((h) => (
              <div key={h.label} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 52 }}>{h.value}</div>
                <div style={{ fontSize: 18, color: '#75736e', fontFamily: 'monospace', maxWidth: 260 }}>{h.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
