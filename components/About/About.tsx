import type { Company } from '../../types';
import styles from './About.module.css';

interface AboutProps {
  company: Company;
}

export default function About({ company }: AboutProps) {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.label}>About SAH Constructions</p>
          <h2>Modern construction with a focus on quality, safety and integrity.</h2>
          <p>
            SAH Constructions blends disciplined planning with experienced engineering to execute residential,
            commercial and infrastructure projects on schedule.
          </p>
          <p>
            From early-stage feasibility through final handover, our team keeps communication clear and standards
            high to create built environments that last.
          </p>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>180+</strong>
            <span>Projects completed</span>
          </div>
          <div className={styles.stat}>
            <strong>95%</strong>
            <span>Repeat client rate</span>
          </div>
          <div className={styles.stat}>
            <strong>25+</strong>
            <span>Years of combined experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
