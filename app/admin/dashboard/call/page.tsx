import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import AdminNavbar from '../../../../components/Admin/AdminNavbar';
import CallDashboard from '../../../../components/Admin/CallDashboard';
import styles from '../DashboardPage.module.css';

export const metadata: Metadata = {
  title: 'Call Dashboard | SAH Constructions',
  description: 'View latest call clicks in the admin dashboard.',
};

export default async function CallDashboardPage() {
  const authCookie = cookies().get('admin_session');

  if (!authCookie?.value) {
    return (
      <html>
        <body>
          <div className={styles.blocked}>
            <h1>Access denied</h1>
            <p>You must log in to view the call dashboard.</p>
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
        <CallDashboard />
      </main>
    </>
  );
}
