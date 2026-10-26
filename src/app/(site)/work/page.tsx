import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { WorkIndex } from '@/components/work/WorkIndex';
import { caseStudies, projects, projectsByDate } from '@/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Every project: startups, production apps, AI systems, security tools and hackathon builds.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <p className="mono">Index · {projects.length} projects</p>
        <h1 className="display">
          Everything I’ve <em>built.</em>
        </h1>
        <p className={styles.lede}>
          {caseStudies.length} with full case studies. The rest link to the live app or the source, from the latest to my first
          Flutter project.
        </p>
      </header>
      <WorkIndex projects={projectsByDate} />
    </Container>
  );
}
