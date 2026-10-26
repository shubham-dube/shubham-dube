/**
 * Content model. Every page, the résumé and the metadata are generated from
 * data that satisfies these types. Edit the data files and leave the components alone.
 */

/** Month precision is all a portfolio needs: "2026-06". */
export type YearMonth = `${number}-${'01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'}`;

export interface Period {
  start: YearMonth;
  /** Omit for "Present". */
  end?: YearMonth;
}

export type LinkKind = 'live' | 'store' | 'repo' | 'extension' | 'profile' | 'mail' | 'phone';

export interface ExternalLink {
  label: string;
  href: string;
  kind: LinkKind;
}

export type Domain = 'founder' | 'backend' | 'mobile' | 'ai' | 'web' | 'security' | 'data' | 'systems';

export type ProjectStatus = 'live' | 'production' | 'in-use' | 'complete' | 'building' | 'archived';

export type ProjectContext = 'founder' | 'product' | 'work' | 'personal' | 'hackathon' | 'academic';

/** Posters are hand-built SVG compositions, keyed by id (see components/posters). */
export type PosterId =
  | 'creditouch'
  | 'gstverify'
  | 'tripple-double'
  | 'cvmorph'
  | 'codeguardian'
  | 'codescrybe'
  | 'assetcop'
  | 'debtorz'
  | 'ophiz'
  | 'generic';

export interface Metric {
  value: string;
  label: string;
}

export interface Feature {
  title: string;
  body: string;
}

export interface PipelineStep {
  label: string;
  detail: string;
}

export interface CaseStudy {
  /** One paragraph: the situation before this existed. */
  problem: string;
  /** What I personally did — the core of the page. */
  built: Feature[];
  /** How it works, drawn as a numbered flow. */
  pipeline?: { title: string; steps: PipelineStep[] };
  /** Dated milestones (used by founder stories). */
  timeline?: { when: string; what: string }[];
  /** What came of it, in plain sentences. */
  outcome: string[];
  /** Honest caveats: what is private or not public yet. */
  note?: string;
}

export interface Project {
  slug: string;
  name: string;
  /** ≤ 70 chars, shown under the name everywhere. */
  tagline: string;
  /** 1–2 sentences for cards and meta descriptions. */
  summary: string;
  period: Period;
  context: ProjectContext;
  /** e.g. "COPIOUS", "Kartavya Technology" — shown as "at …". */
  org?: string;
  role: string;
  team: string;
  domains: Domain[];
  status: ProjectStatus;
  stack: string[];
  metrics?: Metric[];
  links?: ExternalLink[];
  award?: string;
  /** flagship → home page feature; selected → home grid; archive → /work only. */
  tier: 'flagship' | 'selected' | 'archive';
  poster: PosterId;
  /** Optional real image (public/ path) that replaces the poster on cards. */
  cover?: string;
  caseStudy?: CaseStudy;
}

export interface Experience {
  id: string;
  org: string;
  orgNote?: string;
  role: string;
  period: Period;
  mode: 'Remote' | 'On-site' | 'Hybrid';
  location?: string;
  kind: 'founder' | 'internship' | 'campus';
  summary: string;
  highlights: string[];
  stack: string[];
  /** Slugs of projects that came out of this role. */
  projects: string[];
  links?: ExternalLink[];
}

export type SkillLevel = 'strong' | 'proficient' | 'working';

export interface SkillGroup {
  id: string;
  label: string;
  blurb: string;
  skills: { name: string; level: SkillLevel; evidence?: string }[];
}

export interface Award {
  title: string;
  detail: string;
  /** Omit when unsure — never guess a date. */
  year?: string;
  project?: string;
}

export interface Education {
  school: string;
  credential: string;
  period: Period;
  location: string;
  detail: string[];
}

export interface Profile {
  name: string;
  fullName: string;
  initials: string;
  role: string;
  headline: string;
  intro: string;
  about: string[];
  location: string;
  timezone: string;
  availability: { open: boolean; text: string };
  email: string;
  phone: { primary: string; alternate: { number: string; label: string } };
  links: ExternalLink[];
  languages: string[];
  interests: string[];
}
