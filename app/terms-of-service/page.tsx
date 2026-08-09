import type { Metadata } from 'next';
import styles from './TermsOfServicePage.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service | SAH Constructions',
  description: 'Terms of service for using the SAH Constructions website.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/terms-of-service'
  }
};

export default function TermsOfServicePage() {
  return (
    <main className={styles.page}>
      <h1>Terms of Service</h1>
      <p>Use of this website is subject to our terms, which are designed to keep information clear and transparent.</p>
    </main>
  );
}
