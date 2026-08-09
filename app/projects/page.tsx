import type { Metadata } from 'next';
import Link from 'next/link';
import projectsData from '../../data/projects.json';
import styles from './ProjectsPage.module.css';

export const metadata: Metadata = {
  title: 'Projects | SAH Constructions',
  description: 'Browse completed projects showcasing SAH Constructions premium delivery across residential, commercial and infrastructure sectors.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/projects'
  }
};

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.label}>Projects</p>
          <h1>Our completed construction projects.</h1>
          <p>Explore projects across sectors that reflect our disciplined execution and engineering expertise.</p>
        </div>
      </section>
      <div className={styles.grid}>
        {projectsData.map((project) => (
          <article key={project.slug} className={styles.card}>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <Link href={`/projects/${project.slug}`} className={styles.link}>Read case study</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
