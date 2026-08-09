'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Image from 'next/image';
import styles from './AdminPage.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      setError('Unable to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.bgIcons} aria-hidden="true">
        <ConstructionIcon className={`${styles.bgIcon} ${styles.bgIconOne}`} />
        <EngineeringIcon className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
        <ApartmentIcon className={`${styles.bgIcon} ${styles.bgIconThree}`} />
        <BusinessCenterIcon className={`${styles.bgIcon} ${styles.bgIconFour}`} />
      </div>

      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <div className={styles.logoWrap}>
            <Image src="/logo/logo.svg" alt="SAH Constructions" width={180} height={60} />
          </div>
          <p className={styles.label}>Admin Login</p>
          <p className={styles.lead}>Enter your username and password to manage the dashboard.</p>
        </div>

        <section className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="admin-username">Username</label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="admin-password">Password</label>
              <div className={styles.passwordField}>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
