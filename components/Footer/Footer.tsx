import Image from 'next/image';
import companyData from '../../data/company.json';
import styles from './Footer.module.css';

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/works' },
  { label: 'Projects', href: '/projects' },
  { label: 'Equipment', href: '/equipment' },
];

const secondaryLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Admin', href: '/admin' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.primary}>
        <div className={styles.brandBlock}>
          <div className={styles.logoWrap}>
            <Image src="/logo/logo.svg" alt="SAH Constructions" width={150} height={72} />
          </div>
          <div className={styles.brandContent}>
            <p className={styles.brand}>SAH Constructions</p>
            <p className={styles.address}>{companyData.address.street}, {companyData.address.city}, {companyData.address.region} - {companyData.address.postalCode}</p>
            <p className={styles.address}>{companyData.phone}</p>
          </div>
        </div>

        <div className={styles.linkGroups}>
          <div className={styles.linkColumn}>
            <p className={styles.groupLabel}>Explore</p>
            <div className={styles.links}>
              {primaryLinks.map((link) => (
                <a key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.linkColumn}>
            <p className={styles.groupLabel}>Resources</p>
            <div className={styles.links}>
              {secondaryLinks.map((link) => (
                <a key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.linkColumn}>
            <p className={styles.groupLabel}>Contact</p>
            <div className={styles.contactInfo}>
              <a href={`tel:${companyData.phone}`} className={styles.link}>{companyData.phone}</a>
              <a href={`mailto:${companyData.email}`} className={styles.link}>{companyData.email}</a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.secondary}>
        <p>© {currentYear} Sah Constructions. All rights reserved.</p>
        <p>
          Powered By{' '}
          <a className={styles.poweredLink} href="https://www.anksquare.com/" target="_blank" rel="noreferrer">
            Anksquare
          </a>
        </p>
      </div>
    </footer>
  );
}
