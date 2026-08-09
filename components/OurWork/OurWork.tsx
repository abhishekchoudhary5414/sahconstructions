import type { Service } from '../../types';
import styles from './OurWork.module.css';

interface OurWorkProps {
  services: Service[];
}

export default function OurWork({ services }: OurWorkProps) {
  return (
    <section className={styles.section} id="services">
      <div className={styles.header}>
        <p className={styles.label}>Our work</p>
        <h2>Construction services built for lasting performance.</h2>
      </div>
      <div className={styles.grid}>
        {services.map((service) => (
          <article key={service.slug} className={styles.card}>
            <div className={styles.top}>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </div>
            <div className={styles.bottom}>
              <ul>
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className={styles.link} href={`/services/${service.slug}`}>
                Explore service
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
