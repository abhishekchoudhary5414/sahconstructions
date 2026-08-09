import companyData from '../../data/company.json';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>SAH Constructions</p>
          <p>{companyData.address.street}, {companyData.address.city}</p>
          <p>{companyData.phone}</p>
        </div>
        <div className={styles.links}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/disclaimer">Disclaimer</a>
        </div>
      </div>
    </footer>
  );
}
