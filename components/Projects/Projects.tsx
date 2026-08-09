import Image from 'next/image';
import type { Project } from '../../types';
import styles from './Projects.module.css';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.header}>
        <p className={styles.label}>Featured works</p>
        <h2>Projects that showcase strong execution and design clarity.</h2>
      </div>
      <div className={styles.grid}>
        {projects.map((project) => (
          <article key={project.slug} className={styles.card}>
            <div className={styles.media}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className={styles.body}>
              <span className={styles.category}>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <a className={styles.link} href={`/projects/${project.slug}`}>
                View project
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
