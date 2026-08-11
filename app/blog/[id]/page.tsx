import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import companyData from '../../../data/company.json';
import blogsData from '../../../data/blogs.json';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import styles from './BlogDetailPage.module.css';

interface PageProps {
  params: { id: string };
}

function getBlogPost(id: number) {
  return blogsData.find((post) => post.id === id);
}

export function generateStaticParams() {
  return blogsData.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPost(Number(params.id));

  if (!post) {
    return {
      title: 'Blog not found | SAH Constructions',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: `${post.title} | SAH Constructions`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.sahconstructions.com/blog/${post.id}`
    }
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  const post = getBlogPost(Number(params.id));

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `https://www.sahconstructions.com/blog/${post.id}#blogposting`,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://www.sahconstructions.com/blog/${post.id}`,
        },
        headline: post.title,
        description: post.excerpt,
        image: [post.image],
        author: {
          '@type': 'Organization',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: companyData.name,
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.sahconstructions.com/logo/circlelogo.png',
          },
        },
        datePublished: post.date,
        dateModified: post.date,
        articleSection: post.category,
        keywords: post.keywords,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.sahconstructions.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://www.sahconstructions.com/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://www.sahconstructions.com/blog/${post.id}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.bgIcons} aria-hidden="true">
            <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
            <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
            <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
            <BusinessCenterIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
          </div>
          <div className={styles.inner}>
            <div className={styles.headerBlock}>
              <p className={styles.label}>{post.category}</p>
              <h1>{post.title}</h1>
              <div className={styles.metaRow}>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
                <span>By {post.author}</span>
              </div>
            </div>
          </div>
        </section>

        <article className={styles.contentShell}>
          <div className={styles.inner}>
            <div className={styles.topImage}>
              <Image src={post.image} alt={post.title} className={styles.topImageImage} width={1200} height={700} />
            </div>
            <div className={styles.textBlock}>
              {post.content.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className={styles.tagRow}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
            <div className={styles.footerBar}>
              <Link href="/blog" className={styles.ctaButton}>
                Back to Blog
              </Link>
              <p className={styles.keywords}>
                Keywords: <span>{post.keywords}</span>
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
