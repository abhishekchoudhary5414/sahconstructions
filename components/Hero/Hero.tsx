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
      <div className={styles.content}>
        <p className={styles.overline}>Engineering exceptional spaces</p>
        <h1>{company.hero.headline}</h1>
        <p className={styles.lead}>{company.hero.subtitle}</p>
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

      <div className={styles.actions}>
        <a className={styles.primaryCta} href="#contact">
          {company.hero.cta}
        </a>
        <a className={styles.secondaryCta} href="#projects">
          View Projects
        </a>
      </div>
    </section>
  );
}
