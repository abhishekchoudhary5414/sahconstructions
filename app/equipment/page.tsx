import Equipment from '../../components/Equipment/Equipment';
import equipmentData from '../../data/equipment.json';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

export const metadata = {
  title: 'Equipment | SAH Constructions',
  description: 'Equipment catalog — mixers, scaffolding, compactors and more.'
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
