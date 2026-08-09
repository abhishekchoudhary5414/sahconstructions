import type { Metadata } from 'next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import companyData from '../../../data/company.json';
import equipmentData from '../../../data/equipment.json';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import WhatsAppLink from '../../../components/Shared/WhatsAppLink';
import styles from './EquipmentDetail.module.css';

interface PageProps {
  params: { slug: string };
}

function getEquipment(slug: string) {
  return equipmentData.find((e) => e.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = getEquipment(params.slug);
  if (!item) {
    return { title: 'Equipment not found | SAH Constructions', description: 'The requested item could not be found.' };
  }

  return {
    title: `${item.title} | SAH Constructions`,
    description: item.summary,
    alternates: { canonical: `https://www.sahconstructions.com/equipment/${item.slug}` }
  };
}

export default function EquipmentDetail({ params }: PageProps) {
  const item = getEquipment(params.slug);

  if (!item) {
    return (
      <>
        <Navbar />
        <main className={styles.page}>
          <div className={styles.notFoundWrap}>
            <h1>Equipment not found</h1>
            <p>The requested equipment could not be found.</p>
            <a className={styles.primaryCta} href="/equipment">Back to equipment</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const whatsappMessage = `Hello SAH Constructions, I would like to enquire about the ${item.title}.`;
  const whatsappUrl = `https://wa.me/${companyData.phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Navbar />
      <main className={styles.pageShell}>
        <section className={styles.itemSection}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <a href="/equipment">Equipment</a>
              <span aria-hidden="true">/</span>
              <span>{item.title}</span>
            </nav>

            <section className={styles.detailLayout}>
              <aside className={styles.imagePanel}>
                <div className={styles.mediaWrap}>
                  <img src={item.image} alt={item.title} className={styles.itemImage} />
                  <div className={styles.imageOverlay}>
                    <span>{item.category}</span>
                    <strong>{item.manufacturer}</strong>
                  </div>
                </div>
              </aside>

              <div className={styles.ctaRow}>
                <a className={styles.primaryCta} href="/enquiry">Get a Quote</a>
                <WhatsAppLink className={styles.whatsappCta} href={whatsappUrl} ariaLabel="WhatsApp">
                  WhatsApp
                </WhatsAppLink>
              </div>

              <article className={styles.copyPanel}>
                <div className={styles.headerRow}>
                  <span className={styles.label}>Equipment details</span>
                  <h1>{item.title}</h1>
                  <p className={styles.summary}>{item.summary}</p>
                </div>

                <div className={styles.descriptionBlock}>
                  <p>{item.details}</p>
                </div>

                <div className={styles.metricsGrid}>
                  <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Manufacturer</span>
                    <p className={styles.metricValue}>{item.manufacturer}</p>
                  </div>
                  <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Condition</span>
                    <p className={styles.metricValue}>{item.condition}</p>
                  </div>
                  <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Category</span>
                    <p className={styles.metricValue}>{item.category}</p>
                  </div>
                </div>

                <div className={styles.scopePanel}>
                  <h3>Key features</h3>
                  <div className={styles.featureList}>
                    {item.features.map((feature) => (
                      <span key={feature} className={styles.featureItem}>
                        <CheckCircleIcon className={styles.checkIcon} />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
