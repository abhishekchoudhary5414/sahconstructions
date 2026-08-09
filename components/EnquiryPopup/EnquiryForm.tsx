'use client';

import type { FormEvent } from 'react';
import styles from './EnquiryPopup.module.css';
import companyData from '../../data/company.json';

const serviceOptions = ['Residential Construction', 'Commercial Developments', 'Infrastructure Solutions'];

type EnquiryFormProps = {
  name: string;
  phone: string;
  service: string;
  submitted: boolean;
  errors: { name: string; phone: string };
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
};

export default function EnquiryForm({
  name,
  phone,
  service,
  submitted,
  errors,
  onNameChange,
  onPhoneChange,
  onServiceChange,
  onSubmit,
  loading = false
}: EnquiryFormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
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
                onChange={(event) => onNameChange(event.target.value)}
                type="text"
                name="name"
                placeholder="Enter your name"
                inputMode="text"
                pattern="[A-Za-z\s]+"
                title="Only letters and spaces are allowed"
                required
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </label>

            <label className={styles.fieldLabel}>
              Phone Number
              <input
                className={styles.fieldInput}
                value={phone}
                onChange={(event) => onPhoneChange(event.target.value)}
                type="tel"
                name="phone"
                placeholder="+91 70180 09352"
                inputMode="tel"
                maxLength={14}
                pattern="\+?[0-9]{1,13}"
                title="Phone may include digits and an optional leading +, maximum 14 chars"
                required
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </label>
          </div>

          <label className={styles.fieldLabel}>
            Service Type
            <select
              className={styles.fieldSelect}
              value={service}
              onChange={(event) => onServiceChange(event.target.value)}
            >
              {serviceOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <button type="submit" className={styles.submit} disabled={loading} aria-busy={loading}>
            {loading ? 'Submitting…' : 'Submit Enquiry'}
          </button>
        </>
      )}
    </form>
  );
}
