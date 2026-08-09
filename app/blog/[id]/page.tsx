import type { Metadata } from 'next';
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
              <img src={post.image} alt={post.title} />
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
