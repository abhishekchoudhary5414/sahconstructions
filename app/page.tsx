import type { Metadata } from 'next';
import companyData from '../data/company.json';
import worksData from '../data/works.json';
import projectsData from '../data/projects.json';
import equipmentData from '../data/equipment.json';
import teamData from '../data/team.json';
import clientsData from '../data/clients.json';
import testimonialsData from '../data/testimonials.json';
import blogsData from '../data/blogs.json';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import HowWeWork from '../components/HowWeWork/HowWeWork';
import OurWork from '../components/OurWork/OurWork';
import Projects from '../components/Projects/Projects';
import Equipment from '../components/Equipment/Equipment';
import Clients from '../components/Clients/Clients';
import Testimonials from '../components/Testimonials/Testimonials';
import BlogSection from '../components/BlogSection/BlogSection';
import Contact from '../components/Contact/Contact';
import EnquiryPopup from '../components/EnquiryPopup/EnquiryPopup';
import Footer from '../components/Footer/Footer';

export const metadata: Metadata = {
  title: 'SAH Constructions | Premium Construction Services',
  description: companyData.description,
  openGraph: {
    title: 'SAH Constructions | Premium Construction Services',
    description: companyData.description,
    url: 'https://www.sahconstructions.com',
    siteName: companyData.name,
    type: 'website'
  },
  alternates: {
    canonical: 'https://www.sahconstructions.com'
  }
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero company={companyData} />
        <About company={companyData} />
        <HowWeWork />
        <OurWork works={worksData} />
        <Projects projects={projectsData} />
        <Equipment equipment={equipmentData} />
        <Clients clients={clientsData} />
        <Testimonials testimonials={testimonialsData} />
        <BlogSection posts={blogsData.slice(0, 3)} />
        <Contact company={companyData} />
      </main>
      <Footer />
      <EnquiryPopup />
    </>
  );
}
