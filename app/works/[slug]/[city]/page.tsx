import type { Metadata } from 'next';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import companyData from '../../../../data/company.json';
import worksData from '../../../../data/works.json';
import { cities } from '../../../../data/cities';
import Navbar from '../../../../components/Navbar/Navbar';
import Footer from '../../../../components/Footer/Footer';
import WhatsAppLink from '../../../../components/Shared/WhatsAppLink';
import styles from '../WorkDetail.module.css';

interface PageProps {
  params: { slug: string; city: string };
}

function normalizeCitySlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function getCityBySlug(citySlug: string) {
  const requestedSlug = normalizeCitySlug(citySlug);
  return cities.find((entry) => normalizeCitySlug(entry.city) === requestedSlug) ?? null;
}

function getWork(slug: string) {
  return worksData.find((work) => work.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const work = getWork(params.slug);

  if (!work) {
    return {
      title: 'Work not found | SAH Constructions',
      description: 'The requested construction work could not be found.'
    };
  }

  const city = getCityBySlug(params.city);
  const cityTitle = city ? `${city.city}, ${city.state}, ${city.country}` : 'India';

  return {
    title: `${work.title} in ${cityTitle} | SAH Constructions`,
    description: `${work.summary} SAH Constructions is delivering ${work.title.toLowerCase()} across ${cityTitle}.`,
    alternates: {
      canonical: `https://www.sahconstructions.com/works/${work.slug}/${normalizeCitySlug(city ? city.city : params.city)}`
    }
  };
}

export default function WorkCityDetail({ params }: PageProps) {
  const work = getWork(params.slug);

  if (!work) {
    return (
      <>
        <Navbar />
        <main className={styles.page}>
          <div className={styles.notFoundWrap}>
            <h1>Work not found</h1>
            <p>The requested work could not be found.</p>
            <a className={styles.primaryCta} href="/works">Back to works</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const city = getCityBySlug(params.city);
  const cityTitle = city ? `${city.city}, ${city.state}, ${city.country}` : 'India';

  const whatsappMessage = `Hello SAH Constructions, I would like to enquire about ${work.title} in ${cityTitle}.`;
  const whatsappUrl = `https://wa.me/${companyData.phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Navbar />
      <main className={styles.pageShell}>
        <section className={styles.workSection}>
          <div className={styles.bgIcons} aria-hidden="true">
            <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
            <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
            <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
            <BusinessCenterIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
          </div>

          <div className={styles.inner}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <a href="/works">Works</a>
              <span aria-hidden="true">/</span>
              <span>{work.title}</span>
              <span aria-hidden="true">/</span>
              <span>{cityTitle}</span>
            </nav>

            <section className={styles.detailLayout}>
              <aside className={styles.imagePanel}>
                <div className={styles.mediaWrap}>
                  <img src={work.image} alt={work.title} className={styles.workImage} />
                  <div className={styles.imageOverlay}>
                    <span>{work.title}</span>
                    <strong>{cityTitle}</strong>
                  </div>
                </div>
              </aside>

              <div className={styles.ctaRow}>
                <a className={styles.primaryCta} href="/enquiry">Enquiry Now</a>
                <WhatsAppLink className={styles.whatsappCta} href={whatsappUrl} ariaLabel="WhatsApp">
                  WhatsApp
                </WhatsAppLink>
                <a className={styles.secondaryCta} href={work.cta.readMore}>View</a>
              </div>

              <article className={styles.copyPanel}>
                <div className={styles.projectHeader}>
                  <span className={styles.label}>Work overview</span>
                  <h1>{work.title} in {cityTitle}</h1>
                  <p className={styles.summary}>{work.summary}</p>
                </div>

                <div className={styles.descriptionBlock}>
                  <p>{work.description}</p>
                </div>

                <div className={styles.metricsGrid}>
                  {work.metrics.map((metric) => (
                    <div className={styles.metricCard} key={metric}>
                      <span className={styles.metricValue}>{metric}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.scopePanel}>
                  <h3>Service capabilities</h3>
                  <div className={styles.featureList}>
                    {work.features.map((feature) => (
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
