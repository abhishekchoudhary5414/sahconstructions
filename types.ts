export interface Address {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface HeroContent {
  headline: string;
  subtitle: string;
  cta: string;
}

import type { ReactNode } from 'react';

export interface Company {
  owner: ReactNode;
  name: string;
  description: string;
  website: string;
  phone: string;
  email: string;
  address: Address;
  hours: string;
  hero: HeroContent;
  contact: {
    headline: string;
    subtitle: string;
    whatsappMessage?: string;
    mapLabel: string;
  };
}

export interface Service {
  slug: string;
  title: string;
  summary: string;
  description: string;
  features: string[];
  image: string;
}

export interface Work {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  features: string[];
  metrics: string[];
  cta: {
    readMore: string;
    quote: string;
  };
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  summary: string;
  description: string;
  image: string;
  logo: string;
  category: string;
  industry: string;
  headquarters: string;
  established: string;
  client: string;
  status: string;
  duration: string;
  scope: string;
  impact: string;
  delivery: string;
  process: string[];
  features: string[];
  externalUrl?: string;
}

export interface EquipmentItem {
  slug: string;
  title: string;
  summary: string;
  details: string;
  image: string;
  manufacturer?: string;
  condition?: string;
  category?: string;
  features: string[];
  cta: {
    readMore: string;
    quote?: string;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  photo: string;
}

export interface Client {
  name: string;
  industry: string;
  logo: string;
}

export interface Testimonial {
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
}
