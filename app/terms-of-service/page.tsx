import type { Metadata } from 'next';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import companyData from '../../data/company.json';
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
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.breadcrumb}>Legal • Terms of Service</p>
            <h1>Terms of Service</h1>
            <p>
              These Terms govern your use of the SAH Constructions website and describe how we provide information, protect our content, and support your online experience.
            </p>
          </div>
        </section>

        <section className={styles.summary}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <article className={styles.card}>
                <h2>Acceptance</h2>
                <p>
                  By visiting or using this site, you accept these terms. If you disagree with any part of the terms, please do not use our website.
                </p>
              </article>
              <article className={styles.card}>
                <h2>Permitted Use</h2>
                <p>
                  Our content is for personal and informational use only. You may not copy, republish, or use materials from this site for commercial or unlawful purposes.
                </p>
              </article>
              <article className={styles.card}>
                <h2>Content Ownership</h2>
                <p>
                  All website content, including text, images, and branding, is owned or licensed by SAH Constructions. Unauthorized reproduction is prohibited.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.details}>
          <div className={styles.container}>
            <div className={styles.detailGrid}>
              <div>
                <h2>Site access and support</h2>
                <p>
                  We strive to keep the website available at all times, but we cannot guarantee uninterrupted access or error-free operation. You agree that SAH Constructions is not responsible for temporary downtime or technical interruptions.
                </p>
                <p>
                  We may modify these terms or website content without notice. Continued use after updates means you accept the revised terms.
                </p>
              </div>
              <aside className={styles.asideCard}>
                <h3>Legal contact</h3>
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
              <h2>User responsibilities</h2>
              <p>
                You agree to use the website lawfully and not to misuse the information provided. SAH Constructions is not responsible for actions taken based on site content without prior professional review.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
