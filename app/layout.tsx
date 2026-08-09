import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../app/globals.css';
import PageLoader from '../components/PageLoader/PageLoader';
import companyData from '../data/company.json';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const baseUrl = 'https://www.sahconstructions.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'SAH Constructions | Premium Construction Services',
  description: 'SAH Constructions provides premium civil, residential, commercial and infrastructure construction services with a focus on quality, safety and reliability.',
  icons: {
    icon: '/favicon.svg'
  },
  openGraph: {
    title: 'SAH Constructions | Premium Construction Services',
    description: 'SAH Constructions provides premium civil, residential, commercial and infrastructure construction services with a focus on quality, safety and reliability.',
    url: baseUrl,
    siteName: 'SAH Constructions',
    type: 'website',
    images: [{ url: '/logo/circlelogo.svg', alt: 'SAH Constructions premium construction services' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAH Constructions',
    description: 'Premium construction services from SAH Constructions.',
    images: ['/logo/circlelogo.svg']
  }
};

const company = companyData;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: company.name,
        url: company.website,
        telephone: company.phone,
        email: company.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address.street,
          addressLocality: company.address.city,
          addressRegion: company.address.region,
          postalCode: company.address.postalCode,
          addressCountry: company.address.country
        }
      },
      {
        '@type': 'WebSite',
        url: company.website,
        name: company.name,
        description: company.description
      }
    ]
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
