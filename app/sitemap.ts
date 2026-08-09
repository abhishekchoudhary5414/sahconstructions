import companyData from '../data/company.json';

export default function sitemap() {
  const baseUrl = 'https://www.sahconstructions.com';
  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString()
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date().toISOString()
    }
  ];
}
