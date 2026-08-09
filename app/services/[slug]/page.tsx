import type { Metadata, ResolvingMetadata } from 'next';
import servicesData from '../../../data/services.json';
import type { Service } from '../../../types';
import styles from './ServiceDetail.module.css';

interface PageProps {
  params: { slug: string };
}

function getService(slug: string) {
  return servicesData.find((service) => service.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = getService(params.slug);

  if (!service) {
    return {
      title: 'Service not found | SAH Constructions',
      description: 'The requested service could not be found.'
    };
  }

  return {
    title: `${service.title} | SAH Constructions`,
    description: service.summary,
    alternates: {
      canonical: `https://www.sahconstructions.com/services/${service.slug}`
    }
  };
}

export default function ServiceDetail({ params }: PageProps) {
  const service = getService(params.slug);

  if (!service) {
    return (
      <main className={styles.page}>
        <h1>Service not found</h1>
        <p>The requested service was not found.</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <a href="/services">Services</a>
        <span>{service.title}</span>
      </nav>
      <section className={styles.detail}>
        <div className={styles.copy}>
          <p className={styles.label}>Service details</p>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <ul>
            {service.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className={styles.imageCard}>
          <div className={styles.placeholder}>Image coming soon</div>
        </div>
      </section>
    </main>
  );
}
