import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import AdminNavbar from '../../../../components/Admin/AdminNavbar';
import EnquiryDashboard from '../../../../components/Admin/EnquiryDashboard';
import styles from '../DashboardPage.module.css';

export const metadata: Metadata = {
  title: 'Enquiry Dashboard | SAH Constructions',
  description: 'Manage enquiries from the admin enquiry dashboard.',
};

export default async function EnquiryPage() {
  const authCookie = cookies().get('admin_session');

  if (!authCookie?.value) {
    return (
      <html>
        <body>
          <div className={styles.blocked}>
            <h1>Access denied</h1>
            <p>You must log in to view the enquiry dashboard.</p>
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
        <div className={styles.inner}>
         
          <EnquiryDashboard />
        </div>
      </main>
    </>
  );
}
