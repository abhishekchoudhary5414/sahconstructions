'use client';

import { useEffect, useState, type FormEvent } from 'react';
import styles from './EnquiryPopup.module.css';
import companyData from '../../data/company.json';

const serviceOptions = ['Residential Construction', 'Commercial Developments', 'Infrastructure Solutions'];

export default function EnquiryPopup() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(serviceOptions[0]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: '', phone: '' });

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOpen = () => setVisible(true);
    window.addEventListener('open-enquiry', handleOpen);
    return () => window.removeEventListener('open-enquiry', handleOpen);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setVisible(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
  }, [visible]);

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

  if (!visible) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Enquiry form" onClick={() => setVisible(false)}>
      <div className={styles.panel} onClick={(event) => event.stopPropagation()}>
        <button className={styles.close} type="button" onClick={() => setVisible(false)} aria-label="Close enquiry form">
          ×
        </button>

        <div className={styles.body}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.header}>
              <h2 className={styles.heading}>
                Enquire with <span className={styles.accent}>{companyData.name}</span>
              </h2>
              <p className={styles.description}>
                Submit your details and our team will reach out quickly to discuss your construction requirements.
              </p>
            </div>
            {submitted ? (
              <div className={styles.success}>
                <p>Thanks for reaching out! Our team will contact you soon to discuss your service enquiry.</p>
              </div>
            ) : (
              <>
                <div className={styles.fieldGrid}>
                  <label className={styles.fieldLabel}>
                    Full Name
                    <input
                      className={styles.fieldInput}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                    />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                  </label>

                  <label className={styles.fieldLabel}>
                    Phone Number
                    <input
                      className={styles.fieldInput}
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone"
                    />
                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                  </label>
                </div>

                <label className={styles.fieldLabel}>
                  Service Type
                  <select
                    className={styles.fieldSelect}
                    value={service}
                    onChange={(event) => setService(event.target.value)}
                  >
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <button type="submit" className={styles.submit}>Submit Enquiry</button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

