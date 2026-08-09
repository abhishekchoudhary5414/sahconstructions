 'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { Client } from '../../types';
import styles from './Clients.module.css';

interface ClientsProps {
  clients: Client[];
}

export default function Clients({ clients }: ClientsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loop = [...clients, ...clients];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrame: number;

    const tick = () => {
      if (!container) return;
      if (!isPaused) {
        const half = container.scrollWidth / 2;
        if (container.scrollLeft >= half) container.scrollLeft -= half;
        container.scrollLeft += 0.6;
      }
      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  const scrollBy = (distance: number) => {
    const c = scrollRef.current;
    if (!c) return;
    c.scrollBy({ left: distance, behavior: 'smooth' });
  };

  return (
    <section className={styles.section} id="clients">
      <div className={styles.bgIcons} aria-hidden="true">
        <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
        <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
        <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
        <BusinessCenterIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
      </div>

      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.label}>Trusted by</p>
          <h2>Industry partners rely on our delivery and craftsmanship.</h2>
        </div>

        <div
          className={styles.viewport}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <button
            type="button"
            className={`${styles.navButton} ${styles.leftButton}`}
            aria-label="Scroll clients left"
            onClick={() => scrollBy(-(scrollRef.current?.clientWidth ?? 360))}
          >
            <ChevronLeftIcon />
          </button>

          <div className={styles.slider} ref={scrollRef}>
            {loop.map((client, i) => (
              <article key={`${client.name}-${i}`} className={styles.card}>
                <div className={styles.logoWrap}>
                  <Image src={client.logo} alt={client.name} width={160} height={80} className={styles.logoImage} />
                </div>
                <div className={styles.info}>
                  <p className={styles.client}>{client.name}</p>
                  <p className={styles.industry}>{client.industry}</p>
                  {client.description ? <p className={styles.desc}>{client.description}</p> : null}
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.navButton} ${styles.rightButton}`}
            aria-label="Scroll clients right"
            onClick={() => scrollBy(scrollRef.current?.clientWidth ?? 360)}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
