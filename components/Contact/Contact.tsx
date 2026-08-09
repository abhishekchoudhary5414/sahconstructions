import type { Company } from '../../types';
import styles from './Contact.module.css';

interface ContactProps {
  company: Company;
}

export default function Contact({ company }: ContactProps) {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.label}>Get in touch</p>
          <h2>{company.contact.headline}</h2>
          <p>{company.contact.subtitle}</p>
          <div className={styles.details}>
            <div>
              <strong>Phone</strong>
              <p>{company.phone}</p>
            </div>
            <div>
              <strong>Email</strong>
              <p>{company.email}</p>
            </div>
            <div>
              <strong>Office</strong>
              <p>{company.address.street}, {company.address.city}</p>
            </div>
          </div>
        </div>
        <div className={styles.mapCard}>
          <div className={styles.mapPlaceholder} aria-label={company.contact.mapLabel}>
            <p>Map placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
