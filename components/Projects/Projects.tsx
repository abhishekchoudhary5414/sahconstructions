'use client';

import { useMemo, useState } from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import type { Project } from '../../types';
import companyData from '../../data/company.json';
import styles from './Projects.module.css';
import WhatsAppLink from '../Shared/WhatsAppLink';

interface ProjectsProps {
  projects: Project[];
  showLoadMore?: boolean;
}

export default function Projects({ projects, showLoadMore = true }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(3);

  const filters = useMemo(() => {
    return ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  }, [projects]);

  const activeProjects = projects.filter((project) => {
    return activeFilter === 'All' || project.category === activeFilter;
  });

  const visibleProjects = useMemo(() => {
    if (!showLoadMore) {
      return activeProjects;
    }

    return activeProjects.slice(0, visibleCount);
  }, [activeFilter, activeProjects, projects, showLoadMore, visibleCount]);

  const loadMoreVisible = showLoadMore && activeProjects.length > visibleCount;

  return (
    <section className={styles.section} id="projects">
      <div className={styles.bgIcons} aria-hidden="true">
        <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
        <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
        <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
        <BusinessCenterIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
      </div>

      <div className={styles.headerBlock}>
        <p className={styles.label}>Featured works</p>
        <h2>Projects that showcase strong execution and design clarity.</h2>
        <p className={styles.lead}>
          From industrial environments to research campuses, our delivery teams create durable, compliant, and future-ready spaces.
        </p>
      </div>

      <div className={styles.filterRow}>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`${styles.filterButton} ${activeFilter === filter ? styles.filterButtonActive : ''}`}
            onClick={() => {
              setActiveFilter(filter);
              setVisibleCount(3);
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visibleProjects.map((project) => (
          <article key={project.slug} className={styles.card}>
            <div className={styles.media}>
              <img src={project.image} alt={project.title} className={styles.image} />
              <div className={styles.logoWrap}>
                <img src={project.logo} alt={`${project.title} logo`} className={styles.logo} />
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.cardTop}>
                <span className={styles.category}>{project.category}</span>
                <span className={styles.location}>{project.location}</span>
              </div>
              <h3>{project.title}</h3>
              <p className={styles.summary}>{project.summary}</p>
              <div className={styles.featureList}>
                {project.features.slice(0, 2).map((feature) => (
                  <span key={feature} className={styles.featureItem}>{feature}</span>
                ))}
              </div>
              <div className={styles.cardFooter}>
                <a className={styles.link} href={`/projects/${project.slug}`}>View project</a>
                <WhatsAppLink
                  className={styles.whatsappLink}
                  href={`https://wa.me/${companyData.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `Hello SAH Constructions, I am interested in the ${project.title}. Please share pricing and availability details.`
                  )}`}
                  ariaLabel="WhatsApp enquiry"
                >
                  WhatsApp enquiry
                </WhatsAppLink>
                <a className={styles.secondaryLink} href={`/enquiry?project=${encodeURIComponent(project.title)}`}>
                  Enquiry now
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {loadMoreVisible && (
        <div className={styles.loadMoreWrap}>
          <button className={styles.loadMore} type="button" onClick={() => setVisibleCount((current) => current + 3)}>
            Load more projects
          </button>
        </div>
      )}
    </section>
  );
}
