import type { Metadata } from 'next';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import companyData from '../../data/company.json';
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
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.breadcrumb}>Legal • Disclaimer</p>
            <h1>Website Disclaimer</h1>
            <p>
              The content on SAH Constructions is provided for general information only. While we strive to keep details accurate,
              this site is not a substitute for professional consultation, and we cannot guarantee outcomes based on the information shown here.
            </p>
          </div>
        </section>

        <section className={styles.summary}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <article className={styles.card}>
                <h2>Information Use</h2>
                <p>
                  All content, including project descriptions, advice, and design concepts, is intended to help you understand our services and capabilities.
                  It should not be relied on as a final specification or recommendation.
                </p>
              </article>
              <article className={styles.card}>
                <h2>No Warranty</h2>
                <p>
                  SAH Constructions makes no guarantee about the completeness, accuracy, or reliability of the website content. Your use of the site is at your own risk.
                </p>
              </article>
              <article className={styles.card}>
                <h2>Liability</h2>
                <p>
                  We are not liable for any damages or losses from using this website, including decisions made from project examples, imagery, or technical content.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.details}>
          <div className={styles.container}>
            <div className={styles.detailGrid}>
              <div>
                <h2>How to interpret this site</h2>
                <p>
                  The SAH Constructions website presents services, project highlights and corporate information. Images and case studies are illustrative and may represent project stages, finishes, or typical results rather than exact deliverables.
                </p>
                <p>
                  For precise planning, budgeting and tendering, please contact our team directly so we can review your scope, schedule and local requirements.
                </p>
              </div>
              <aside className={styles.asideCard}>
                <h3>Contact Our Team</h3>
                <p>{companyData.name}</p>
                <p>{companyData.address.street}</p>
                <p>{companyData.address.city}, {companyData.address.region}</p>
                <p>{companyData.address.postalCode}</p>
                <a href={`tel:${companyData.phone}`}>{companyData.phone}</a>
                <a href={`mailto:${companyData.email}`}>{companyData.email}</a>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
