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
  title:
    'SAH Constructions | Warehouse Construction | Commercial Construction | Residential Construction | Renovation | Project Management | Painiting Work',

  description:
    'SAH Constructions is a professional construction company providing residential, commercial, industrial and civil construction services, project management, architectural design, structural design and infrastructure development.',

  keywords: [
    'SAH Constructions',
    'construction company',
    'construction company in India',
    'civil construction company',
    'civil construction services',
    'building construction company',
    'construction services',
    'residential construction',
    'residential construction company',
    'commercial construction',
    'commercial construction company',
    'industrial construction',
    'infrastructure construction',
    'building contractor',
    'civil contractor',
    'construction contractor',
    'general contractor',
    'turnkey construction',
    'turnkey construction services',
    'construction project management',
    'project management services',
    'EPC contractor',
    'EPCM services',
    'architectural design',
    'architectural planning',
    'structural design',
    'structural engineering',
    '3D visualization',
    '3D architectural visualization',
    'construction planning',
    'construction management',
    'renovation and remodeling',
    'building renovation',
    'painting work',
  ],

  authors: [
    {
      name: 'SAH Constructions',
    },
  ],

  creator: 'SAH Constructions',
  publisher: 'SAH Constructions',

  metadataBase: new URL('https://www.sahconstructions.com'),

  alternates: {
    canonical: 'https://www.sahconstructions.com',
  },

  openGraph: {
    title:
      'SAH Constructions | Construction Company & Civil Construction Services',

    description:
      'Professional residential, commercial, industrial and civil construction services by SAH Constructions, including project management, architectural design, structural design, infrastructure and turnkey construction.',

    url: 'https://www.sahconstructions.com',

    siteName: 'SAH Constructions',

    type: 'website',

    locale: 'en_IN',

    images: [
      {
        url: '/logo/circlelogo.png',
        width: 512,
        height: 512,
        alt: 'SAH Constructions - Construction Company',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'SAH Constructions | Construction Company & Civil Construction Services',

    description:
      'Residential, commercial, industrial and civil construction services with project management, architectural and structural design solutions.',

    images: ['/logo/circlelogo.png'],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/logo/circlelogo.png',
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
