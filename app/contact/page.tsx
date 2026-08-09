import type { Metadata } from 'next';
import companyData from '../../data/company.json';
import styles from './ContactPage.module.css';
import Contact from '../../components/Contact/Contact';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Contact | SAH Constructions',
  description: 'Contact SAH Constructions for construction project planning, estimating and site management services.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/contact'
  }
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <Contact company={companyData} />
      </main>
      <Footer />
    </>
  );
}
