import type { Metadata } from 'next';
import projectsData from '../../../data/projects.json';
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
      <main className={styles.page}>
        <h1>Project not found</h1>
        <p>The requested project could not be found.</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <a href="/projects">Projects</a>
        <span>{project.title}</span>
      </nav>
      <section className={styles.detail}>
        <div className={styles.copy}>
          <p className={styles.label}>Project overview</p>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className={styles.meta}>
            <div>
              <strong>Location</strong>
              <p>{project.location}</p>
            </div>
            <div>
              <strong>Category</strong>
              <p>{project.category}</p>
            </div>
          </div>
        </div>
        <div className={styles.imageCard}>
          <div className={styles.placeholder}>Project image coming soon</div>
        </div>
      </section>
    </main>
  );
}
