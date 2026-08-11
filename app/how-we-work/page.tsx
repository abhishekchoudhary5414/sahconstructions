import type { Metadata } from 'next';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import HowWeWork from '../../components/HowWeWork/HowWeWork';

export const metadata: Metadata = {
  title: 'How We Work | SAH Constructions',
  description: 'See how SAH Constructions manages planning, design, execution, and handover for every project.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/how-we-work',
  },
};

export default function HowWeWorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <HowWeWork />
      </main>
      <Footer />
    </>
  );
}
