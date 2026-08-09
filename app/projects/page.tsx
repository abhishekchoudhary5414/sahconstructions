import type { Metadata } from 'next';
import projectsData from '../../data/projects.json';
import Projects from '../../components/Projects/Projects';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Projects | SAH Constructions',
  description: 'Browse completed projects showcasing SAH Constructions premium delivery across residential, commercial and infrastructure sectors.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/projects'
  }
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <Projects projects={projectsData} showLoadMore={false} />
      </main>
      <Footer />
    </>
  );
}
