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
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const filterNameValue = (value: string) => value.replace(/[^A-Za-z\s]/g, '');
  const filterPhoneValue = (value: string) => {
    let filtered = value.replace(/[^0-9+]/g, '');
    if (filtered.indexOf('+') > 0) filtered = filtered.replace(/\+/g, '');
    if (filtered.startsWith('+')) {
      filtered = '+' + filtered.slice(1).replace(/\+/g, '');
    } else {
      filtered = filtered.replace(/\+/g, '');
    }
    return filtered.slice(0, 14);
  };

  const isNameValid = (value: string) => /^[A-Za-z\s]+$/.test(value.trim());
  const isPhoneValid = (value: string) => /^\+?[0-9]{1,13}$/.test(value.trim());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = { name: '', phone: '' };
    if (!name.trim()) {
      nextErrors.name = 'Name is required.';
    } else if (!isNameValid(name)) {
      nextErrors.name = 'Name can only contain letters and spaces.';
    }

    if (!phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    } else if (!isPhoneValid(phone)) {
      nextErrors.phone = 'Phone may only include digits and an optional leading +, maximum 14 chars.';
    }

    setErrors(nextErrors);

    if (!nextErrors.name && !nextErrors.phone) {
      try {
        setServerError('');
        setLoading(true);
        const response = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, service })
        });

        if (response.ok) {
          setSubmitted(true);
        } else {
          const errorData = await response.json();
          setServerError(errorData.error || 'Unable to submit enquiry.');
        }
      } catch (e) {
        setServerError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
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
          {serverError && <div className={styles.serverError}>{serverError}</div>}
          <EnquiryForm
            name={name}
            phone={phone}
            service={service}
            submitted={submitted}
            errors={errors}
            loading={loading}
            onNameChange={(value) => setName(filterNameValue(value))}
            onPhoneChange={(value) => setPhone(filterPhoneValue(value))}
            onServiceChange={setService}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}
