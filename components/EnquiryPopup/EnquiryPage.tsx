'use client';

import { useState, type FormEvent } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from './EnquiryPopup.module.css';
import companyData from '../../data/company.json';
import EnquiryForm from './EnquiryForm';

const serviceOptions = ['Residential Construction', 'Commercial Developments', 'Infrastructure Solutions'];

export default function EnquiryPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(serviceOptions[0]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: '', phone: '' });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = { name: '', phone: '' };
    if (!name.trim()) nextErrors.name = 'Name is required.';
    if (!phone.trim()) nextErrors.phone = 'Phone number is required.';
    setErrors(nextErrors);
    if (!nextErrors.name && !nextErrors.phone) {
      setSubmitted(true);
    }
  };

  return (
    <section className={styles.pageShell}>
      <div className={styles.pageCard}>
        <div className={styles.pageIntro}>
          <p className={styles.label}>Enquiry</p>
          <h1>Let’s discuss your next project</h1>
          <p className={styles.description}>
            Share a few details and our team will get in touch with the right guidance for your construction needs.
          </p>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}><PhoneIcon fontSize="small" /></div>
              <div>
                <strong>Call us</strong>
                <span>{companyData.phone}</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}><EmailIcon fontSize="small" /></div>
              <div>
                <strong>Email</strong>
                <span>{companyData.email}</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}><LocationOnIcon fontSize="small" /></div>
              <div>
                <strong>Visit</strong>
                <span>{companyData.address.city}, {companyData.address.region}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.pageFormPanel}>
          <EnquiryForm
            name={name}
            phone={phone}
            service={service}
            submitted={submitted}
            errors={errors}
            onNameChange={setName}
            onPhoneChange={setPhone}
            onServiceChange={setService}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}
