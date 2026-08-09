import type { Metadata } from 'next';
import Link from 'next/link';
import servicesData from '../../data/services.json';
import styles from './ServicesPage.module.css';

export const metadata: Metadata = {
  title: 'Construction Services | SAH Constructions',
  description: 'Explore premium residential, commercial and infrastructure construction services from SAH Constructions.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/services'
  }
};

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.label}>Services</p>
          <h1>Professional construction services for every sector.</h1>
          <p>Discover how SAH Constructions supports residential, commercial and public works with technical expertise and reliable delivery.</p>
        </div>
      </section>
      <div className={styles.grid}>
        {servicesData.map((service) => (
          <article key={service.slug} className={styles.card}>
            <h2>{service.title}</h2>
            <p>{service.summary}</p>
            <Link href={`/services/${service.slug}`} className={styles.link}>View details</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
