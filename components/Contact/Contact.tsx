'use client';

import { useState } from 'react';
import type { Company } from '../../types';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PhoneEnabledIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from './Contact.module.css';

interface ContactProps {
  company: Company;
}

export default function Contact({ company }: ContactProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (value: string) => {
    const filtered = value.replace(/[^a-zA-Z\s]/g, '');
    setName(filtered);
  };

  const handlePhoneChange = (value: string) => {
    const filtered = value.replace(/[^0-9+]/g, '');
    setPhone(filtered.slice(0, 14));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Replace with your real submission logic.
    console.log('Contact request', { name, phone, message });
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.bgIcons} aria-hidden="true">
        <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
        <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
        <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
        <BusinessCenterIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
      </div>

      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.label}>Get in touch</p>
          <h2>{company.contact.headline}</h2>
          <p className={styles.lead}>{company.contact.subtitle}</p>
        </div>

        <div className={styles.gridRow}>
          <div className={styles.detailsColumn}>
            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>
                <PhoneEnabledIcon />
              </div>
              <div>
                <strong>Phone</strong>
                <p>{company.phone}</p>
              </div>
            </div>
            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>
                <EmailIcon />
              </div>
              <div>
                <strong>Email</strong>
                <p>{company.email}</p>
              </div>
            </div>
            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>
                <LocationOnIcon />
              </div>
              <div>
                <strong>Office</strong>
                <p>{company.address.street}, {company.address.city}, {company.address.region} - {company.address.postalCode}</p>
              </div>
            </div>
          </div>

          <form className={styles.formColumn} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                inputMode="text"
                value={name}
                onChange={(event) => handleNameChange(event.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-phone">Phone</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(event) => handlePhoneChange(event.target.value)}
                placeholder="+91 98765 43210"
                maxLength={14}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us about your project"
                rows={5}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Send message
            </button>
          </form>
        </div>

        <div className={styles.mapRow}>
          <div className={styles.mapCard}>
            <iframe
              className={styles.mapIframe}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.3188034451923!2d76.7878961!3d30.933659499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff5a6e02caae9%3A0xe4742ddc6f1fab7d!2sHaripur%20sandholi!5e0!3m2!1sen!2sin!4v1786288837824!5m2!1sen!2sin"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              title="SAH Constructions Location"
            />
          </div>
          <p className={styles.mapLink}>
            <a href="https://www.google.com/maps?cid=16461832962726407037&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed" target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
