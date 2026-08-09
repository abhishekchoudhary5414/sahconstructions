import type { Metadata } from 'next';
import styles from './PrivacyPolicyPage.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | SAH Constructions',
  description: 'Privacy policy for SAH Constructions website usage and data handling.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/privacy-policy'
  }
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <h1>Privacy Policy</h1>
      <p>We collect only essential information needed to respond to enquiries and provide services.</p>
    </main>
  );
}
