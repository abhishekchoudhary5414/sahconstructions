import Link from 'next/link';
import type { BlogPost } from '../../types';
import styles from './BlogSection.module.css';

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className={styles.blogSection} id="blog">
      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.label}>Latest insights</p>
          <h2>Construction insights and practical guides from our experts.</h2>
          <p className={styles.lead}>
            Browse the latest stories on sustainability, technology, project management, and modern construction practices.
          </p>
        </div>

        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={post.image} alt={post.title} />
                <span className={styles.category}>{post.category}</span>
              </div>

              <div className={styles.cardBody}>
                <h3>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <div className={styles.metaRow}>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.id}`} className={styles.readMore}>
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.buttonRow}>
          <Link href="/blog" className={styles.ctaButton}>
            More Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
