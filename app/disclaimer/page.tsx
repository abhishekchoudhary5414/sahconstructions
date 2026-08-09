import type { Metadata } from 'next';
import styles from './DisclaimerPage.module.css';

export const metadata: Metadata = {
  title: 'Disclaimer | SAH Constructions',
  description: 'Disclaimer page for SAH Constructions website.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/disclaimer'
  }
};

export default function DisclaimerPage() {
  return (
    <main className={styles.page}>
      <h1>Disclaimer</h1>
      <p>This website is for informational purposes only. SAH Constructions does not guarantee project outcomes from content displayed on this site.</p>
    </main>
  );
}
