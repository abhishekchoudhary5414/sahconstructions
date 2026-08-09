import ConstructionIcon from '@mui/icons-material/Construction';
import SearchIcon from '@mui/icons-material/Search';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EngineeringIcon from '@mui/icons-material/Engineering';
import styles from './HowWeWork.module.css';

const steps = [
  {
    title: 'Discovery & Planning',
    description:
      'We start by understanding your goals, budget, site conditions, and timeline so the roadmap is clear from the beginning.',
    icon: SearchIcon,
  },
  {
    title: 'Design & Approvals',
    description:
      'Our team shapes practical designs, aligns stakeholders, and secures approvals smoothly before execution begins.',
    icon: DesignServicesIcon,
  },
  {
    title: 'Execution & Quality Control',
    description:
      'Every phase is carefully monitored with strong supervision, safety standards, and quality checks throughout the build.',
    icon: FactCheckIcon,
  },
  {
    title: 'Handover & Support',
    description:
      'We complete the delivery with a polished handover, clear documentation, and support that lasts beyond project completion.',
    icon: HandshakeIcon,
  },
];

export default function HowWeWork() {
  return (
    <section className={styles.howWeWork} id="how-we-work">
      <div className={styles.bgIcons} aria-hidden="true">
        <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
        <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
        <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
        <FactCheckIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
      </div>

      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.label}>How We Work</p>
          <h2>A transparent and dependable process from concept to completion</h2>
          <p className={styles.lead}>
            Every project benefits from thoughtful planning, clear coordination, and disciplined execution at every stage.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article className={styles.stepCard} key={step.title} style={{ animationDelay: `${index * 0.12}s` }}>
                <div className={styles.stepIcon}>
                  <Icon fontSize="medium" />
                </div>
                <div className={styles.stepNumber}>0{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>

        <div className={styles.highlightCard}>
          <div>
            <p className={styles.highlightLabel}>What makes our approach different</p>
            <h3>Reliable communication, disciplined execution, and a commitment to craftsmanship in every stage.</h3>
          </div>
          <a href="/enquiry" className={styles.highlightLink}>Start Your Project</a>
        </div>
      </div>
    </section>
  );
}
