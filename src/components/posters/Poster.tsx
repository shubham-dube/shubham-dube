import Image from 'next/image';
import type { Project } from '@/content/schema';
import { AssetcopPoster } from './AssetcopPoster';
import { CodeguardianPoster } from './CodeguardianPoster';
import { CodescrybePoster } from './CodescrybePoster';
import { CreditouchPoster } from './CreditouchPoster';
import { CvmorphPoster } from './CvmorphPoster';
import { DebtorzPoster } from './DebtorzPoster';
import { GenericPoster } from './GenericPoster';
import { GstverifyPoster } from './GstverifyPoster';
import { OphizPoster } from './OphizPoster';
import { TrippleDoublePoster } from './TrippleDoublePoster';

const bespoke = {
  creditouch: CreditouchPoster,
  gstverify: GstverifyPoster,
  'tripple-double': TrippleDoublePoster,
  cvmorph: CvmorphPoster,
  codeguardian: CodeguardianPoster,
  codescrybe: CodescrybePoster,
  assetcop: AssetcopPoster,
  debtorz: DebtorzPoster,
  ophiz: OphizPoster,
} as const;

/** A project's visual: its real cover if it has one, else its poster. */
export function Poster({ project, index = 0, priority = false }: { project: Project; index?: number; priority?: boolean }) {
  if (project.cover) {
    return <Image src={project.cover} alt="" fill sizes="(min-width: 900px) 60vw, 100vw" priority={priority} style={{ objectFit: 'cover' }} />;
  }
  if (project.poster === 'generic') return <GenericPoster project={project} index={index} />;
  const Component = bespoke[project.poster];
  return <Component />;
}
