import type { Testimonial } from '../../types';
import styles from './Testimonials.module.css';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.header}>
        <p className={styles.label}>Client feedback</p>
        <h2>What our clients say about working with SAH Constructions.</h2>
      </div>
      <div className={styles.slider}>
        {testimonials.map((testimonial) => (
          <article key={testimonial.name} className={styles.card}>
            <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
            <div>
              <p className={styles.client}>{testimonial.name}</p>
              <p className={styles.role}>{testimonial.role}, {testimonial.company}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
