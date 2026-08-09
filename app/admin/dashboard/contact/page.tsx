import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import AdminNavbar from '../../../../components/Admin/AdminNavbar';
import ContactDashboard from '../../../../components/Admin/ContactDashboard';
import styles from '../DashboardPage.module.css';

export const metadata: Metadata = {
  title: 'Contact Dashboard | SAH Constructions',
  description: 'View latest contact submissions in the admin dashboard.',
};

export default async function ContactDashboardPage() {
  const authCookie = cookies().get('admin_session');

  if (!authCookie?.value) {
    return (
      <html>
        <body>
          <div className={styles.blocked}>
            <h1>Access denied</h1>
            <p>You must log in to view the contact dashboard.</p>
            <a href="/admin">Go to login</a>
          </div>
        </body>
      </html>
    );
  }

  return (
    <>
      <AdminNavbar username="Admin" />
      <main className={styles.dashboard}>
        <ContactDashboard />
      </main>
    </>
  );
}
