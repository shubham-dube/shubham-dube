import type { Profile } from './schema';

export const profile: Profile = {
  name: 'Shubham Dubey',
  fullName: 'Shubham Kumar Dubey',
  initials: 'SD',
  role: 'Founder & Software Engineer',
  headline: 'I build products end to end: the backend, the app, and the AI that makes them feel effortless.',
  intro:
    'Co-founder and CEO of CrediTouch. SDE Intern at COPIOUS. I have built four apps that are live on the Play Store, I run a paid API product, and I have and built voice AI, payroll and security tooling from the first schema to production.',
  about: [
    'I like owning a problem from the first conversation to the last deploy. Before I wrote a line of CrediTouch, I spent three weeks interviewing AR managers and credit controllers. Before I started CodeGuardian, I wrote the PRD and the architecture.',
    'Most of my work sits where products get hard: money that has to reconcile, apps that must work offline, scrapers that have to survive government portals, and AI that has to be right rather than merely fluent.',
    'I am in my final year of B.Tech CSE at IIIT Raichur. Right now I am taking CrediTouch to its first pilot customers and building voice AI for Tripple Double at COPIOUS.',
  ],
  location: 'Raichur, Karnataka · India',
  timezone: 'Asia/Kolkata',
  availability: { open: true, text: 'Open to SDE, backend and AI roles' },
  email: 'shubham@dubey.app',
  phone: {
    primary: '+91 76878 77772',
    alternate: { number: '+91 99429 99648', label: 'Nandini Raj, co-founder' },
  },
  links: [
    { label: 'GitHub', href: 'https://github.com/shubham-dube', kind: 'profile' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shubhamdubey772/', kind: 'profile' },
    { label: 'X', href: 'https://x.com/Shubham_dubey4', kind: 'profile' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/shubham_dube', kind: 'profile' },
  ],
  languages: ['English', 'Hindi', 'Punjabi (basic)'],
  interests: ['Fintech', 'SaaS', 'Cybersecurity', 'Generative AI', 'Sports tech'],
};
