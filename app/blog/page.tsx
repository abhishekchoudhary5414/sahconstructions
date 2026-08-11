import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import companyData from '../../data/company.json';
import blogsData from '../../data/blogs.json';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './BlogPage.module.css';

export const metadata: Metadata = {
  title: 'Blog | SAH Constructions',
  description: 'Read construction industry insights, project guidance, and sustainable building ideas from SAH Constructions.',
  alternates: {
    canonical: 'https://www.sahconstructions.com/blog'
  }
};

export default function BlogPage() {
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
              <p className={styles.label}>Blog</p>
              <h1>Insights, strategies, and modern construction thinking.</h1>
              <p className={styles.lead}>
                Explore expert articles from SAH Constructions on sustainable architecture, project delivery, construction technology, and project management.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.infoPanel}>
          <div className={styles.inner}>
            <div className={styles.infoGrid}>
              <article className={styles.infoCard}>
                <h3>About {companyData.name}</h3>
                <p>{companyData.description}</p>
              </article>
              <article className={styles.infoCard}>
                <h3>What We Cover</h3>
                <p>
                  From sustainable materials and smart construction technology to project planning and safety, our blog brings practical insight directly from the field.
                </p>
              </article>
              <article className={styles.infoCard}>
                <h3>Contact & Location</h3>
                <p>{companyData.address.street}, {companyData.address.city}, {companyData.address.region} - {companyData.address.postalCode}</p>
                <p>{companyData.hours}</p>
                <p>{companyData.email}</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.aboutPanel}>
          <div className={styles.inner}>
            <div className={styles.aboutGrid}>
              <article className={styles.aboutCard}>
                <h3>Project Expertise</h3>
                <p>
                  Our articles are written around real projects, covering residential, commercial, and infrastructure work that reflects the SAH Constructions approach.
                </p>
              </article>
              <article className={styles.aboutCard}>
                <h3>Value-Driven Thinking</h3>
                <p>
                  We focus on solutions that improve durability, reduce risk, and help clients deliver construction on time and within budget.
                </p>
              </article>
              <article className={styles.aboutCard}>
                <h3>Company Commitment</h3>
                <p>
                  Every post reinforces our mission: quality, safety, sustainability, and strong execution for every project we deliver.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.posts}>
          <div className={styles.inner}>
            <div className={styles.grid}>
              {blogsData.map((post) => (
                <article key={post.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image src={post.image} alt={post.title} className={styles.image} width={500} height={300} />
                    <span className={styles.tag}>{post.category}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div>
                      <div className={styles.cardMeta}>
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2>{post.title}</h2>
                      <p className={styles.excerpt}>{post.excerpt}</p>
                    </div>
                    <div className={styles.cardFooter}>
                      <Link href={`/blog/${post.id}`} className={styles.readMore}>
                        Read full story
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
