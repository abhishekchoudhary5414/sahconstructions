'use client';

import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import styles from './UniversalLoader.module.css';

type UniversalLoaderProps = {
  title?: string;
  subtitle?: string;
  compact?: boolean;
};

export default function UniversalLoader({
  title = 'SAH Constructions',
  subtitle = 'Preparing your project workspace',
  compact = false
}: UniversalLoaderProps) {
  return (
    <div className={`${styles.loaderShell} ${compact ? styles.compact : ''}`}> 
      <div className={styles.loaderPanel} aria-label="Loading">
        <div className={styles.iconOrbit}>
          <div className={styles.iconRing}>
            <ConstructionIcon className={styles.primaryIcon} fontSize="large" />
            <EngineeringIcon className={styles.secondaryIcon} fontSize="small" />
          </div>
        </div>

        <div className={styles.loaderText}>
          <span className={styles.loaderEyebrow}>Site Operations</span>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>

        <div className={styles.loadingBar}>
          <span className={styles.loadingFill} />
        </div>
      </div>
    </div>
  );
}
