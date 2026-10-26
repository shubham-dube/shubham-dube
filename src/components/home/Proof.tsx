import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { highlights } from '@/content';
import styles from './Proof.module.css';


export function Proof() {
  return (
    <section id="proof" className={styles.proof} aria-label="Highlights">
      <Container>
        <ul className={styles.grid}>
          {highlights.map((p, i) => (
            <Reveal as="li" key={p.label} delay={i * 60} className={styles.cell}>
              <span className={`display ${styles.value}`}>{p.value}</span>
              <span className={`mono ${styles.label}`}>{p.label}</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
