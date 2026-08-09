'use client';

import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HandymanIcon from '@mui/icons-material/Handyman';
import type { Company } from '../../types';
import styles from './Hero.module.css';

interface HeroProps {
  company: Company;
}

export default function Hero({ company }: HeroProps) {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.bgIcons} aria-hidden="true">
        <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
        <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
        <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
        <HandymanIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
      </div>

      <div className={styles.heroInner}>
        <div className={styles.content}>
          <p className={styles.overline}>Engineering exceptional spaces</p>
          <h1>{company.hero.headline}</h1>
          <p className={styles.lead}>{company.hero.subtitle}</p>

          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <strong>13+</strong>
              <span>Years Experience</span>
            </div>
            <div className={styles.statBox}>
              <strong>150+</strong>
              <span>Projects Completed</span>
            </div>
            <div className={styles.statBox}>
              <strong>100%</strong>
              <span>Client Satisfaction</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryCta}
              onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry'))}
            >
              Start Your Project
            </button>
            <button
              type="button"
              className={styles.secondaryCta}
              onClick={() => (window.location.href = '/works')}
            >
              Our Work
            </button>
          </div>
        </div>

        <div className={styles.media}>
          <div className={styles.card}>
            <div className={styles.lineArt}>
              <div className={styles.gridFrame} />
              <div className={styles.centerRing} />

              <div className={styles.iconTile}>
                <ConstructionIcon className={styles.icon} />
                <span>Build</span>
              </div>
              <div className={styles.iconTileSecondary}>
                <EngineeringIcon className={styles.icon} />
                <span>Design</span>
              </div>
              <div className={styles.iconTileTertiary}>
                <ApartmentIcon className={styles.icon} />
                <span>Structure</span>
              </div>
              <div className={styles.iconTileQuaternary}>
                <HandymanIcon className={styles.icon} />
                <span>Craft</span>
              </div>

              <div className={styles.lineOne} />
              <div className={styles.lineTwo} />
              <div className={styles.dotOne} />
              <div className={styles.dotTwo} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
