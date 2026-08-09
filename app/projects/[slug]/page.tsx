import type { Metadata } from 'next';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FlagIcon from '@mui/icons-material/Flag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import companyData from '../../../data/company.json';
import projectsData from '../../../data/projects.json';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import WhatsAppLink from '../../../components/Shared/WhatsAppLink';
import styles from './ProjectDetail.module.css';

interface PageProps {
  params: { slug: string };
}

function getProject(slug: string) {
  return projectsData.find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) {
    return {
      title: 'Project not found | SAH Constructions',
      description: 'The requested project could not be found.'
    };
  }

  return {
    title: `${project.title} | SAH Constructions`,
    description: project.summary,
    alternates: {
      canonical: `https://www.sahconstructions.com/projects/${project.slug}`
    }
  };
}

export default function ProjectDetail({ params }: PageProps) {
  const project = getProject(params.slug);

  if (!project) {
    return (
      <>
        <Navbar />
        <main className={styles.page}>
          <div className={styles.notFoundWrap}>
            <h1>Project not found</h1>
            <p>The requested project could not be found.</p>
            <a className={styles.primaryCta} href="/projects">Back to projects</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const whatsappMessage = `Hello SAH Constructions, I would like to enquire about the ${project.title} project.`;
  const whatsappUrl = `https://wa.me/${companyData.phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Navbar />
      <main className={styles.pageShell}>
        <section className={styles.projectSection}>
          <div className={styles.bgIcons} aria-hidden="true">
            <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
            <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
            <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
            <BusinessCenterIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
          </div>

          <div className={styles.inner}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <a href="/projects">Projects</a>
              <span aria-hidden="true">/</span>
              <span>{project.title}</span>
            </nav>

            <section className={styles.detailLayout}>
              <aside className={styles.imagePanel}>
                <div className={styles.mediaWrap}>
                  <img src={project.image} alt={project.title} className={styles.projectImage} />
                  <div className={styles.imageOverlay}>
                    <span>{project.category}</span>
                    <strong>{project.location}</strong>
                  </div>
                </div>
              </aside>

              <div className={styles.ctaRow}>
                <a className={styles.primaryCta} href="/enquiry">Enquiry Now</a>
                <WhatsAppLink className={styles.whatsappCta} href={whatsappUrl} ariaLabel="WhatsApp">
                  WhatsApp
                </WhatsAppLink>
              </div>

              <article className={styles.copyPanel}>
                <div className={styles.projectHeader}>
                  <span className={styles.label}>Project overview</span>
                  <div className={styles.logoRow}>
                    <img src={project.logo} alt={`${project.title} logo`} className={styles.logo} />
                    <span className={styles.status}>{project.status}</span>
                  </div>
                  <h1>{project.title}</h1>
                  <p className={styles.summary}>{project.summary}</p>
                </div>

                <div className={styles.descriptionBlock}>
                  <p>{project.description}</p>
                  <p>{project.impact}</p>
                </div>

                <div className={styles.metricsGrid}>
                  <div className={styles.metricCard}>
                    <LocationOnIcon className={styles.metricIcon} />
                    <div>
                      <span className={styles.metricLabel}>Location</span>
                      <p className={styles.metricValue}>{project.location}</p>
                    </div>
                  </div>
                  <div className={styles.metricCard}>
                    <BusinessCenterIcon className={styles.metricIcon} />
                    <div>
                      <span className={styles.metricLabel}>Category</span>
                      <p className={styles.metricValue}>{project.category}</p>
                    </div>
                  </div>
                  <div className={styles.metricCard}>
                    <FlagIcon className={styles.metricIcon} />
                    <div>
                      <span className={styles.metricLabel}>Industry</span>
                      <p className={styles.metricValue}>{project.industry}</p>
                    </div>
                  </div>
                  <div className={styles.metricCard}>
                    <ConstructionIcon className={styles.metricIcon} />
                    <div>
                      <span className={styles.metricLabel}>Delivery</span>
                      <p className={styles.metricValue}>{project.delivery}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.detailsGrid}>
                  <div>
                    <span className={styles.detailLabel}>Client</span>
                    <p>{project.client}</p>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Headquarters</span>
                    <p>{project.headquarters}</p>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Established</span>
                    <p>{project.established}</p>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>Duration</span>
                    <p>{project.duration}</p>
                  </div>
                </div>

                <div className={styles.scopePanel}>
                  <h3>Scope of work</h3>
                  <p>{project.scope}</p>
                  <div className={styles.featureList}>
                    {project.features.map((feature) => (
                      <span key={feature} className={styles.featureItem}>
                        <CheckCircleIcon className={styles.checkIcon} />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.processPanel}>
                  <h3>Project process</h3>
                  <div className={styles.processList}>
                    {project.process.map((step, index) => (
                      <div key={step} className={styles.processItem}>
                        <span className={styles.processIndex}>{index + 1}</span>
                        <p>{step}</p>
                      </div>
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
