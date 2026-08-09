import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HandymanIcon from '@mui/icons-material/Handyman';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupsIcon from '@mui/icons-material/Groups';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import type { Company } from '../../types';
import styles from './About.module.css';
import Image from 'next/image';

interface AboutProps {
  company: Company;
}

export default function About({ company }: AboutProps) {
  return (
    <section className={styles.about} id="about">
      <div className={styles.bgIcons} aria-hidden="true">
        <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
        <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
        <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
        <BusinessCenterIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
      </div>

      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.label}>About SAH Constructions</p>
          <h2>Building Excellence Since 2012</h2>
          <p className={styles.lead}>
            Founded in 2012, Sah Constructions has grown into a trusted name in construction with over 13+ years of
            experience delivering quality residential, commercial, and infrastructure projects.
          </p>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.mediaCard}>
            <div className={styles.imagePlaceholder}>
              <Image src="/images/sah.png" alt="Owner" className={styles.image} height={1000} width={500}/>
            </div>
            <div className={styles.profileCard}>
              <div className={styles.profileIcon}>
                <BusinessCenterIcon />
              </div>
              <div>
                <h3>{company.owner}</h3>
                <p>Trusted Construction Partner</p>
                <p>{company.description}</p>
              </div>
            </div>
          </div>

          <div className={styles.sideColumn}>
            <div className={styles.storyCard}>
              <h3>Our Story</h3>
              <p>
                From planning to handover, we combine technical expertise, transparent communication, and a strong work
                ethic to deliver spaces built to last.
              </p>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statIcon}><VerifiedUserIcon /></div>
                <strong>13+</strong>
                <span>Years of Excellence</span>
              </div>
              <div className={styles.stat}>
                <div className={styles.statIcon}><BusinessCenterIcon /></div>
                <strong>150+</strong>
                <span>Projects Completed</span>
              </div>
              <div className={styles.stat}>
                <div className={styles.statIcon}><GroupsIcon /></div>
                <strong>100+</strong>
                <span>Expert Team</span>
              </div>
              <div className={styles.stat}>
                <div className={styles.statIcon}><HandymanIcon /></div>
                <strong>100%</strong>
                <span>Client Satisfaction</span>
              </div>
            </div>

            <div className={styles.links}>
              <a href={`mailto:${company.email}`}>Email</a>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.infoCard}>
            <h3>Our Mission</h3>
            <p>
              To deliver exceptional construction services that exceed client expectations through innovation, quality
              craftsmanship, and unwavering commitment to excellence.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Our Vision</h3>
            <p>
              To be the most trusted and respected construction company, known for our integrity, innovation, and
              dedication to building sustainable futures.
            </p>
          </div>

          <div className={styles.valuesCard}>
            <h3>Our Core Values</h3>
            <div className={styles.valuesGrid}>
              <div>
                <strong>Quality</strong>
                <p>Delivering excellence in every project, no matter the size</p>
              </div>
              <div>
                <strong>Safety</strong>
                <p>Maintaining the highest standards of workplace safety</p>
              </div>
              <div>
                <strong>Innovation</strong>
                <p>Embracing new technologies and construction methods</p>
              </div>
              <div>
                <strong>Integrity</strong>
                <p>Operating with honesty and transparency in all dealings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
