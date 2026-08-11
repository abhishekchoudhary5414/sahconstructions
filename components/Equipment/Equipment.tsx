'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { EquipmentItem } from '../../types';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import styles from './Equipment.module.css';

interface EquipmentProps {
  equipment: EquipmentItem[];
  showLoadMore?: boolean;
}

export default function Equipment({ equipment, showLoadMore = true }: EquipmentProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(3);

  const filters = useMemo(() => {
    return ['All', ...Array.from(new Set(equipment.map((e) => e.category || 'Other')))];
  }, [equipment]);

  const activeItems = equipment.filter((item) => activeFilter === 'All' || item.category === activeFilter);

  const visibleItems = useMemo(() => {
    if (!showLoadMore) return activeItems;
    return activeItems.slice(0, visibleCount);
  }, [activeFilter, activeItems, showLoadMore, visibleCount]);

  const loadMoreVisible = showLoadMore && activeItems.length > visibleCount;

  return (
    <section className={styles.section} id="equipment">
      <div className={styles.bgIcons} aria-hidden="true">
        <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
        <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
        <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
        <BusinessCenterIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
      </div>

      <div className={styles.headerBlock}>
        <p className={styles.label}>Equipment & tools</p>
        <h2>Equipment that powers site productivity and safety.</h2>
        <p className={styles.lead}>From concrete mixers to earth-moving heavyweights — curated equipment for every job.</p>
      </div>

      <div className={styles.filterRow}>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`${styles.filterButton} ${activeFilter === filter ? styles.filterButtonActive : ''}`}
            onClick={() => {
              setActiveFilter(filter);
              setVisibleCount(3);
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visibleItems.map((item) => (
          <article key={item.slug} className={styles.card}>
            <div className={styles.media}>
              <Image src={item.image} alt={item.title} className={styles.image} width={600} height={360} />
              {/* <div className={styles.logoWrap}>
                <span className={styles.category}>{item.category}</span>
              </div> */}
            </div>

            <div className={styles.body}>
              <div className={styles.cardTop}>
                <span className={styles.manufacturer}>{item.manufacturer}</span>
                <span className={styles.condition}>{item.condition}</span>
              </div>
              <h3>{item.title}</h3>
              <p className={styles.summary}>{item.summary}</p>
              <div className={styles.featureList}>
                {item.features.slice(0, 3).map((f) => (
                  <span key={f} className={styles.featureItem}>{f}</span>
                ))}
              </div>
              <div className={styles.cardFooter}>
                <a className={styles.link} href={`/equipment/${item.slug}`}>View details</a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {loadMoreVisible && (
        <div className={styles.loadMoreWrap}>
          <button className={styles.loadMore} type="button" onClick={() => setVisibleCount((c) => c + 3)}>
            Load more equipment
          </button>
        </div>
      )}
    </section>
  );
}
