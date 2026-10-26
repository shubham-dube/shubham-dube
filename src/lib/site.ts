export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dubey.app').replace(/\/+$/, ''),
  name: 'Shubham Dubey',
  title: 'Shubham Dubey — Founder & Software Engineer',
  description:
    'Co-founder of CrediTouch and software engineer. Backends, Flutter apps on the Play Store, voice AI and security tooling, built end to end.',
} as const;
