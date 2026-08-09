'use client';

import { useEffect, useState, type FormEvent } from 'react';
import styles from './EnquiryPopup.module.css';
import EnquiryForm from './EnquiryForm';

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
    </div>
  );
}

