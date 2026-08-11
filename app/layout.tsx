import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PageLoader from '../components/PageLoader/PageLoader';
import companyData from '../data/company.json';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const baseUrl = 'https://www.sahconstructions.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: 'SAH Constructions | Warehouse Construction | Commercial Construction | Residential Construction | Renovation | Project Management | Painiting Work',
    template: '%s | SAH Constructions',
  },

  description:
    'SAH Constructions is a trusted construction company providing residential, commercial, civil and infrastructure construction services, project management, architectural design, structural design and 3D visualization with a focus on quality, safety and reliability.',

  keywords: [
    'SAH Constructions',
    'construction company',
    'construction company in India',
    'civil construction company',
    'civil construction services',
    'building construction company',
    'residential construction',
    'commercial construction',
    'industrial construction',
    'infrastructure construction',
    'construction services',
    'building construction services',
    'general construction contractor',
    'civil engineering services',
    'construction contractor',
    'building contractor',
    'residential building contractor',
    'commercial building contractor',
    'construction project management',
    'project management services',
    'EPC construction',
    'EPC contractor',
    'EPCM services',
    'architectural design',
    'architectural planning',
    'structural design',
    'structural engineering',
    '3D architectural visualization',
    '3D visualization services',
    'construction planning',
    'construction management',
    'turnkey construction',
    'turnkey construction services',
    'quality construction services',
    'professional construction company',
    'reliable construction contractor',
    'modern construction services',
    'painting work',
    'renovation services',
    'interior renovation',
    'exterior renovation',
    'home renovation',
    'office renovation',
    'commercial renovation',
    'industrial renovation',
    'construction solutions',
    'construction expertise',
    'construction excellence',
    'construction innovation',
    'construction technology',
    'construction safety',
    'construction reliability',
    'construction efficiency',
    'construction sustainability',
    'construction quality assurance',
    'construction project delivery',
    'construction cost management',
    'construction risk management',
    'construction scheduling',
    'construction budgeting',
    'construction consulting',
    'construction feasibility studies',
    'construction site supervision',
    'construction quality control',
    'construction inspection services',
    'construction compliance',
    'construction permits',
    'construction regulations',
    'construction standards',
    'construction certifications',
    'construction documentation',
  ],

  authors: [
    {
      name: 'SAH Constructions',
    },
  ],

  creator: 'SAH Constructions',
  publisher: 'SAH Constructions',

  applicationName: 'SAH Constructions',

  category: 'Construction',

  alternates: {
    canonical: baseUrl,
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo/circlelogo.png',
  },

  openGraph: {
    title:
      'SAH Constructions | Construction Company & Civil Construction Services',
    description:
      'Professional residential, commercial, civil and infrastructure construction services by SAH Constructions. We deliver quality construction, project management, architectural and structural design solutions.',
    url: baseUrl,
    siteName: 'SAH Constructions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo/circlelogo.png',
        width: 512,
        height: 512,
        alt: 'SAH Constructions Logo',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'SAH Constructions | Construction Company & Civil Construction Services',
    description:
      'Premium residential, commercial, civil and infrastructure construction services by SAH Constructions.',
    images: ['/logo/circlelogo.png'],
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

  verification: {
    google: 't6VunOvlpIxQfvYGA51JdIAYLClSJjZhPsbimUhCtd0',
  },
};

const company = companyData;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${company.website}#organization`,
        name: company.name,
        url: company.website,
        logo: `${company.website}/logo/circlelogo.png`,
        telephone: company.phone,
        email: company.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address.street,
          addressLocality: company.address.city,
          addressRegion: company.address.region,
          postalCode: company.address.postalCode,
          addressCountry: company.address.country,
        },
        sameAs: [company.website],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${company.website}#localbusiness`,
        name: company.name,
        description: company.description,
        url: company.website,
        telephone: company.phone,
        email: company.email,
        image: `${company.website}/logo/circlelogo.png`,
        logo: `${company.website}/logo/circlelogo.png`,
        priceRange: 'Varies',
        areaServed: 'India',
        openingHours: company.hours,
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address.street,
          addressLocality: company.address.city,
          addressRegion: company.address.region,
          postalCode: company.address.postalCode,
          addressCountry: company.address.country,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: company.phone,
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['English'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${company.website}#website`,
        url: company.website,
        name: company.name,
        description: company.description,
        publisher: {
          '@id': `${company.website}#organization`,
        },
      },
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
