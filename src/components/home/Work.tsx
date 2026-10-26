import { SectionHead } from '@/components/ui/SectionHead';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { FlagshipCard } from '@/components/work/FlagshipCard';
import { ProjectCard } from '@/components/work/ProjectCard';
import { flagshipProjects, projects, selectedProjects } from '@/content';
import styles from './Work.module.css';

export function Work() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <Container>
        <SectionHead
          index={1}
          label="Selected work"
          id="work-title"
          aside="A startup, a paid API, voice AI in production, and a security platform. Each one has a full case study."
        >
          Things I built that are <em>out in the world.</em>
        </SectionHead>

        <div>
          {flagshipProjects.map((p, i) => (
            <FlagshipCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className={styles.moreHead}>
          <h3 className="mono">More work</h3>
          <ButtonLink href="/work" icon="arrowRight">
            All {projects.length} projects
          </ButtonLink>
        </div>
        <ul className={styles.grid}>
          {selectedProjects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 80}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
