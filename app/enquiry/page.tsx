import type { Metadata } from 'next';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import EnquiryPage from '../../components/EnquiryPopup/EnquiryPage';

export const metadata: Metadata = {
  title: 'Enquiry | SAH Constructions',
  description: 'Get in touch with SAH Constructions for your next construction project.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/enquiry',
  },
};

export default function EnquiryRoutePage() {
  return (
    <>
      <Navbar />
      <main>
        <EnquiryPage />
      </main>
      <Footer />
    </>
  );
}
