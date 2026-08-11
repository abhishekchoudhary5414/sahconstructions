import Equipment from '../../components/Equipment/Equipment';
import equipmentData from '../../data/equipment.json';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipment | SAH Constructions',
  description: 'Equipment catalog — mixers, scaffolding, compactors and more.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/equipment',
  },
};

export default function EquipmentPage() {
  return (
    <>
      <Navbar />
      <main>
        <Equipment equipment={equipmentData} />
      </main>
      <Footer />
    </>
  );
}
