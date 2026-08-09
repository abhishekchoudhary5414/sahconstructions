import type { Metadata } from 'next';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import companyData from '../../data/company.json';
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
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.breadcrumb}>Legal • Privacy Policy</p>
            <h1>Privacy & Data Protection</h1>
            <p>
              SAH Constructions is committed to protecting your personal information when you explore our services, submit enquiries, or request project guidance.
            </p>
          </div>
        </section>

        <section className={styles.summary}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <article className={styles.card}>
                <h2>What We Collect</h2>
                <p>
                  We gather only the information necessary to respond to inquiries, estimate projects, and communicate with clients, such as name, contact details, and project requirements.
                </p>
              </article>
              <article className={styles.card}>
                <h2>How We Use It</h2>
                <p>
                  Your details help us deliver tailored service, answer questions, share relevant construction insights, and schedule consultations with our team.
                </p>
              </article>
              <article className={styles.card}>
                <h2>Sharing & Security</h2>
                <p>
                  We never sell personal data. We may share information with trusted service providers only to support communication and project delivery, and we secure data using industry best practices.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.details}>
          <div className={styles.container}>
            <div className={styles.detailGrid}>
              <div>
                <h2>Your privacy matters</h2>
                <p>
                  When you use our contact forms or reach out by phone, we process your information to provide a prompt response and to understand your construction needs. We keep communications confidential and limit access to authorized SAH Constructions staff.
                </p>
                <p>
                  We use cookies and analytics tools to improve website performance and user experience, but no personal information is sold or used for unrelated marketing without consent.
                </p>
              </div>
              <aside className={styles.asideCard}>
                <h3>Contact for Privacy</h3>
                <p>{companyData.name}</p>
                <p>{companyData.address.street}</p>
                <p>{companyData.address.city}, {companyData.address.region}</p>
                <p>{companyData.address.postalCode}</p>
                <a href={`mailto:${companyData.email}`}>{companyData.email}</a>
                <a href={`tel:${companyData.phone}`}>{companyData.phone}</a>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.bottomNote}>
          <div className={styles.container}>
            <div className={styles.noteCard}>
              <h2>Data retention & updates</h2>
              <p>
                We retain personal data only as long as necessary for the purposes listed, or as required by law. If you wish to update or remove your information, contact our office and we will respond promptly.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
