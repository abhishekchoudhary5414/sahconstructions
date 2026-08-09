import type { Metadata } from 'next';
import worksData from '../../data/works.json';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import OurWork from '../../components/OurWork/OurWork';

export const metadata: Metadata = {
  title: 'Works | SAH Constructions',
  description: 'Explore SAH Constructions workstreams spanning warehouse, commercial, residential, project management, renovation and painting services.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/works'
  }
};

export default function WorksPage() {
  return (
    <>
      <Navbar />
      <main>
        <OurWork works={worksData} />
      </main>
      <Footer />
    </>
  );
}
