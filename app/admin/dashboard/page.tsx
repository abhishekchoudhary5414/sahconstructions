import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import AdminNavbar from '../../../components/Admin/AdminNavbar';
import styles from './DashboardPage.module.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard | SAH Constructions',
  description: 'Admin dashboard for SAH Constructions to manage enquiries and analytics.',
};

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export default async function DashboardPage() {
  const authCookie = cookies().get('admin_session');

  if (!authCookie?.value) {
    return (
      <html>
        <body>
          <div className={styles.blocked}>
            <h1>Access denied</h1>
            <p>You must log in to view the admin dashboard.</p>
            <a href="/admin">Go to login</a>
          </div>
        </body>
      </html>
    );
  }

  const supabase = getSupabase();
  const [
    { data: enquiries = [], count: enquiriesCount = 0 },
    { data: whatsappClicks = [], count: whatsappCount = 0 },
    { data: callClicks = [], count: callsCount = 0 },
    { data: contacts = [], count: contactsCount = 0 },
  ] = await Promise.all([
    supabase.from('enquiries').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(4),
    supabase.from('whatsapp_clicks').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(4),
    supabase.from('call_clicks').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(4),
    supabase.from('contacts').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(4),
  ]);

  return (
    <>
      <AdminNavbar username="Admin" />
      <main className={styles.dashboard}>
        <div className={styles.inner}>
          <div className={styles.headerBlock}>
            <p className={styles.label}>Admin dashboard</p>
            <h2>Overview</h2>
            <p>Quickly view the latest enquiry counts and access the enquiry management panel from here.</p>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <strong>{enquiriesCount}</strong>
              <span>Enquiries</span>
            </div>
            <div className={styles.statCard}>
              <strong>{whatsappCount}</strong>
              <span>WhatsApp clicks</span>
            </div>
            <div className={styles.statCard}>
              <strong>{callsCount}</strong>
              <span>Call clicks</span>
            </div>
            <div className={styles.statCard}>
              <strong>{contactsCount}</strong>
              <span>Contacts</span>
            </div>
          </div>

          <div className={styles.latestGrid}>
            <section className={styles.latestBlock}>
              <div className={styles.latestHeader}>
                <h3>Latest enquiries</h3>
                <Link href="/admin/dashboard/enquiry" className={styles.smallButton}>
                  View all
                </Link>
              </div>
              <div className={styles.latestTableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Service</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(enquiries ?? []).map((row: any, index: number) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.name || '-'}</td>
                        <td>{row.service || '-'}</td>
                        <td>{row.phone || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className={styles.latestBlock}>
              <div className={styles.latestHeader}>
                <h3>Latest WhatsApp clicks</h3>
                <Link href="/admin/dashboard/whatsapp" className={styles.smallButton}>
                  View all
                </Link>
              </div>
              <div className={styles.latestTableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Page</th>
                      <th>Browser</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(whatsappClicks ?? []).map((row: any, index: number) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td className={styles.mono}>{row.page_url || '-'}</td>
                        <td>{row.browser || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className={styles.latestBlock}>
              <div className={styles.latestHeader}>
                <h3>Latest call clicks</h3>
                <Link href="/admin/dashboard/call" className={styles.smallButton}>
                  View all
                </Link>
              </div>
              <div className={styles.latestTableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Page</th>
                      <th>Browser</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(callClicks ?? []).map((row: any, index: number) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td className={styles.mono}>{row.page_url || '-'}</td>
                        <td>{row.browser || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className={styles.latestBlock}>
              <div className={styles.latestHeader}>
                <h3>Latest contacts</h3>
                <Link href="/admin/dashboard/contact" className={styles.smallButton}>
                  View all
                </Link>
              </div>
              <div className={styles.latestTableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(contacts ?? []).map((row: any, index: number) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.name || '-'}</td>
                        <td>{row.phone || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
