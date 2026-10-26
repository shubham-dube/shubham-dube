import type { SkillGroup } from './schema';

/**
 * Only skills I can defend in an interview. "Heard of" and stretch skills
 * are deliberately left out of the public site.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    label: 'Backend',
    blurb: 'APIs that handle money, documents and real-time traffic.',
    skills: [
      { name: 'Node.js · Express', level: 'strong', evidence: 'Ophiz payroll, Debtorz, Assetcop' },
      { name: 'FastAPI', level: 'strong', evidence: 'GSTVerify, CVMorph, Storyframe' },
      { name: 'NestJS', level: 'proficient', evidence: 'CrediTouch' },
      { name: 'REST API design', level: 'proficient' },
      { name: 'WebSockets', level: 'proficient', evidence: 'Debtorz and Assetcop chat' },
      { name: 'Supabase Edge Functions', level: 'working', evidence: 'Tripple Double' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    blurb: 'Flutter apps in production on Google Play.',
    skills: [
      { name: 'Flutter · Dart', level: 'strong', evidence: '4 apps on Google Play' },
      { name: 'BLoC', level: 'proficient' },
      { name: 'Stacked', level: 'working' },
      { name: 'Isar · offline sync', level: 'working' },
      { name: 'FCM push', level: 'working' },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    blurb: 'Pipelines that listen, read and retrieve.',
    skills: [
      { name: 'LLM APIs', level: 'proficient', evidence: 'Anthropic, Gemini, OpenAI, Groq' },
      { name: 'Local LLM + STT', level: 'working', evidence: 'Voice scoring' },
      { name: 'RAG · GraphRAG', level: 'working', evidence: 'Codescrybe, ContrarianAI' },
      { name: 'LangChain', level: 'working' },
      { name: 'OpenCV · YOLOv8', level: 'working', evidence: 'AnonVision' },
      { name: 'spaCy · scikit-learn', level: 'working' },
    ],
  },
  {
    id: 'web',
    label: 'Web',
    blurb: 'Interfaces people actually use every day.',
    skills: [
      { name: 'React', level: 'strong' },
      { name: 'Next.js', level: 'strong' },
      { name: 'TypeScript', level: 'strong' },
      { name: 'Tailwind CSS', level: 'strong' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    blurb: 'The schema comes first.',
    skills: [
      { name: 'PostgreSQL', level: 'proficient' },
      { name: 'Supabase', level: 'proficient' },
      { name: 'MongoDB', level: 'proficient' },
      { name: 'Firebase', level: 'strong' },
      { name: 'Redis', level: 'working' },
      { name: 'Neo4j', level: 'working' },
    ],
  },
  {
    id: 'infra',
    label: 'Infra & security',
    blurb: 'Shipping, and keeping it safe.',
    skills: [
      { name: 'Docker', level: 'strong' },
      { name: 'GCP · DigitalOcean · Vercel', level: 'strong' },
      { name: 'Linux', level: 'strong' },
      { name: 'AWS Lambda · S3', level: 'working' },
      { name: 'GitHub Actions', level: 'working' },
      { name: 'SAST · taint analysis', level: 'working', evidence: 'CodeGuardian' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    blurb: 'What I write it all in.',
    skills: [
      { name: 'TypeScript · JavaScript', level: 'strong' },
      { name: 'Python', level: 'strong' },
      { name: 'Dart', level: 'proficient' },
      { name: 'C++', level: 'proficient' },
      { name: 'Rust', level: 'working', evidence: 'CodeGuardian' },
      { name: 'SQL', level: 'working' },
    ],
  },
];

export const skillLevelLabel = { strong: 'Strong', proficient: 'Proficient', working: 'Working knowledge' } as const;
