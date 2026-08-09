'use client';

import { useEffect, useRef, useState } from 'react';
import type { Testimonial } from '../../types';
import PersonIcon from '@mui/icons-material/Person';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from './Testimonials.module.css';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loopedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrame: number;

    const tick = () => {
      if (!container) return;
      if (!isPaused) {
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
        container.scrollLeft += 0.8;
      }
      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  const scrollBy = (distance: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({ left: distance, behavior: 'smooth' });
  };

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.bgIcons} aria-hidden="true">
        <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
        <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
        <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
        <BusinessCenterIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
      </div>

      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.label}>Client feedback</p>
          <h2>What our clients say about working with SAH Constructions.</h2>
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
          aria-label="Scroll testimonials left"
          onClick={() => scrollBy(-(scrollRef.current?.clientWidth ?? 320))}
        >
          <ChevronLeftIcon />
        </button>

        <div className={styles.slider} ref={scrollRef}>
          {loopedTestimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className={styles.card}
            >
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  <PersonIcon />
                </div>
                <div className={styles.clientInfo}>
                  <p className={styles.client}>{testimonial.name}</p>
                  <p className={styles.role}>
                    {testimonial.role}
                    {testimonial.company ? `, ${testimonial.company}` : ''}
                  </p>
                </div>
              </div>
              <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
            </article>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.navButton} ${styles.rightButton}`}
          aria-label="Scroll testimonials right"
          onClick={() => scrollBy(scrollRef.current?.clientWidth ?? 320)}
        >
          <ChevronRightIcon />
        </button>
      </div>
      </div>
    </section>
  );
}
