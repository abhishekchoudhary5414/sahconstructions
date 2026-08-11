import type { Metadata } from 'next';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import About from '../../components/About/About';
import companyData from '../../data/company.json';

export const metadata: Metadata = {
  title: 'About | SAH Constructions',
  description: 'Learn more about SAH Constructions, our story, mission, vision, and commitment to quality.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <About company={companyData} />
      </main>
      <Footer />
    </>
  );
}
