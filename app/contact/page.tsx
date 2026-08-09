import type { Metadata } from 'next';
import companyData from '../../data/company.json';
import styles from './ContactPage.module.css';

export const metadata: Metadata = {
  title: 'Contact | SAH Constructions',
  description: 'Contact SAH Constructions for construction project planning, estimating and site management services.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/contact'
  }
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.label}>Contact</p>
          <h1>Speak with our construction team.</h1>
          <p>Reach SAH Constructions for planning your next residential, commercial or infrastructure project.</p>
        </div>
      </section>
      <section className={styles.contactCards}>
        <article className={styles.card}>
          <h2>Office</h2>
          <p>{companyData.address.street}, {companyData.address.city}, {companyData.address.region}</p>
        </article>
        <article className={styles.card}>
          <h2>Phone</h2>
          <p>{companyData.phone}</p>
        </article>
        <article className={styles.card}>
          <h2>Email</h2>
          <p>{companyData.email}</p>
        </article>
      </section>
    </main>
  );
}
