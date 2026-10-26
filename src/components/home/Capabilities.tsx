import { Container } from '@/components/ui/Container';
import { Meter } from '@/components/ui/Meter';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { skillGroups } from '@/content';
import styles from './Capabilities.module.css';

export function Capabilities() {
  return (
    <section id="capabilities" className={styles.section} aria-labelledby="cap-title">
      <Container>
        <SectionHead
          index={3}
          label="Capabilities"
          id="cap-title"
          aside={
            <span className={styles.legend}>
              <span>
                <Meter level="strong" /> Strong
              </span>
              <span>
                <Meter level="proficient" /> Proficient
              </span>
              <span>
                <Meter level="working" /> Working knowledge
              </span>
            </span>
          }
        >
          Range, with <em>depth</em> where it counts.
        </SectionHead>

        <ul className={styles.grid}>
          {skillGroups.map((g, i) => (
            <Reveal as="li" key={g.id} className={styles.group} delay={(i % 4) * 60}>
              <h3 className={`display ${styles.label}`}>{g.label}</h3>
              <p className={styles.blurb}>{g.blurb}</p>
              <ul className={styles.skills}>
                {g.skills.map((s) => (
                  <li key={s.name} className={styles.skill}>
                    <span className={styles.skillName}>
                      {s.name}
                      {s.evidence && <span className={styles.evidence}>{s.evidence}</span>}
                    </span>
                    <Meter level={s.level} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
