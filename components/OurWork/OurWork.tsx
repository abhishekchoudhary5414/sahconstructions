import Image from 'next/image';
import type { Work } from '../../types';
import styles from './OurWork.module.css';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CompanyData from '../../data/company.json';
import WhatsAppLink from '../Shared/WhatsAppLink';

interface OurWorkProps {
  works: Work[];
}

export default function OurWork({ works }: OurWorkProps) {
  return (
    <section className={styles.worksSection} id="works">
      <div className={styles.bgIcons} aria-hidden="true">
        <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
        <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
        <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
        <BusinessCenterIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
      </div>

      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.label}>Our work</p>
          <h2>Construction services built for lasting performance.</h2>
          <p className={styles.lead}>
            SAH Constructions delivers purpose-built solutions across warehouse, commercial, residential, renovation and project-management operations.
          </p>
        </div>

        <div className={styles.workStream}>
          {works.map((work, index) => {
            const reverse = index % 2 === 1;
            const whatsappMessage = `Hello SAH Constructions, I would like to enquire about ${work.title}.`;
            const whatsappUrl = `https://wa.me/${CompanyData.phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

            return (
              <article key={work.slug} className={`${styles.workRow} ${reverse ? styles.reverse : ''}`}> 
                <div className={styles.imageWrap}>
                  <Image src={work.image} alt={work.title} className={styles.workImage} width={900} height={540} />
                </div>

                <div className={styles.copyWrap}>
                  <div className={styles.contentCard}>
                    <span className={styles.kicker}>Construction Service</span>
                    <h3>{work.title}</h3>
                    <p className={styles.summary}>{work.summary}</p>

                    <div className={styles.metrics}>
                      {work.metrics.map((metric) => (
                        <div key={metric} className={styles.metricItem}>
                          <span className={styles.metricDot} aria-hidden="true" />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.ctaRow}>
                      <a className={styles.primaryCta} href="/enquiry">Enquiry Now</a>
                      <WhatsAppLink className={styles.whatsappCta} href={whatsappUrl} ariaLabel="WhatsApp">WhatsApp</WhatsAppLink>
                      <a className={styles.viewCta} href={`/works/${work.slug}`}>View</a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
