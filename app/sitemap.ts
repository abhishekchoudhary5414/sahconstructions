import type { MetadataRoute } from 'next';
import projects from '../data/projects.json';
import equipment from '../data/equipment.json';
import blogs from '../data/blogs.json';
import works from '../data/works.json';
import { cities } from '../data/cities';

function citySlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sahconstructions.com';
  const lastModified = new Date();
  const staticRoutes = ['/', '/about', '/how-we-work', '/works', '/projects', '/equipment', '/blog', '/enquiry', '/contact', '/privacy-policy', '/terms-of-service', '/disclaimer'];
  const dynamicRoutes = [
    ...projects.map((item) => `/projects/${item.slug}`),
    ...equipment.map((item) => `/equipment/${item.slug}`),
    ...blogs.map((item) => `/blog/${item.id}`),
    ...works.map((item) => `/works/${item.slug}`),
    ...works.flatMap((work) => cities.map((city) => `/works/${work.slug}/${citySlug(city.city)}`)),
  ];

  const routes = [...new Set([...staticRoutes, ...dynamicRoutes])];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
