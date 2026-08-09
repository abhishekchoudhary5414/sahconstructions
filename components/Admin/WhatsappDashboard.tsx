'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './WhatsappDashboard.module.css';

type WhatsappClick = {
  id: number;
  href: string | null;
  page_url: string | null;
  browser: string | null;
  user_agent: string | null;
  created_at: string;
};

const sortOptions = [
  { value: 'created_at:desc', label: 'Clicked newest' },
  { value: 'created_at:asc', label: 'Clicked oldest' },
  { value: 'page_url:asc', label: 'Page A → Z' },
  { value: 'browser:asc', label: 'Browser A → Z' },
];

const rangeOptions = [
  { value: '1', label: 'Today' },
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: 'all', label: 'All time' },
];

export default function WhatsappDashboard() {
  const [clicks, setClicks] = useState<WhatsappClick[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortValue, setSortValue] = useState(sortOptions[0].value);
  const [range, setRange] = useState('7');
  const [topPage, setTopPage] = useState('-');
  const [topPageCount, setTopPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortKey, sortOrder] = useMemo(() => sortValue.split(':'), [sortValue]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadClicks() {
      setLoading(true);
      setError('');
      const size = pageSize === 0 ? 1000 : pageSize;
      const params = new URLSearchParams({ page: String(page), pageSize: String(size), sortKey, sortOrder, range });
      try {
        const response = await fetch(`/api/admin/whatsapp?${params.toString()}`, { signal: controller.signal });
        if (!response.ok) throw new Error('Unable to fetch WhatsApp clicks.');
        const payload = await response.json();
        setClicks(payload.data ?? []);
        setTotalRecords(payload.count ?? 0);
        setTopPage(payload.topPage || '-');
        setTopPageCount(payload.topPageCount ?? 0);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === 'AbortError')) setError('Unable to load WhatsApp clicks. Refresh the page and try again.');
      } finally {
        setLoading(false);
      }
    }
    loadClicks();
    return () => controller.abort();
  }, [page, pageSize, sortKey, sortOrder, range]);

  const pageCount = pageSize === 0 ? 1 : Math.ceil(totalRecords / pageSize);
  const uniquePages = new Set(clicks.map((click) => click.page_url).filter(Boolean)).size;

  return (
    <section className={styles.whatsappSection}>
      <div className={styles.dashboardHeader}>
        <div>
          <p className={styles.label}>WhatsApp dashboard</p>
          <h2>Track WhatsApp engagement</h2>
          <p className={styles.subText}>Review recent WhatsApp clicks and understand which pages generate the most conversations.</p>
        </div>
        <div className={styles.statsRow}>
          <div className={`${styles.statCard} ${styles.totalCard}`}><strong>{totalRecords}</strong><span>Total clicks</span></div>
          <div className={`${styles.statCard} ${styles.pageCard}`}><strong>{clicks.length}</strong><span>Page results</span></div>
          <div className={`${styles.statCard} ${styles.uniqueCard}`}><strong>{uniquePages}</strong><span>Pages reached</span></div>
          <div className={`${styles.statCard} ${styles.latestCard}`}><strong>{range === 'all' ? 'All' : `${range}d`}</strong><span>Selected range</span></div>
        </div>
        <div className={styles.topPageSection}>
          <span className={styles.topPageLabel}>Top page</span>
          <strong title={topPage}>{topPage}</strong>
          <span className={styles.topPageCount}>{topPageCount} clicks</span>
          <span className={styles.topPageHint}>Most WhatsApp clicks in the selected range</span>
        </div>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.controlsLabel}>Showing {clicks.length} / {totalRecords} WhatsApp clicks{pageSize !== 0 && ` • Page ${page} of ${pageCount}`}</div>
        <div className={styles.controls}>
          <label className={styles.controlGroup}><span>Range</span><select className={styles.controlSelect} value={range} onChange={(event) => { setRange(event.target.value); setPage(1); }}>{rangeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
          <label className={styles.controlGroup}><span>Page size</span><select className={styles.controlSelect} value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}><option value={10}>10</option><option value={20}>20</option><option value={50}>50</option><option value={100}>100</option><option value={0}>All</option></select></label>
          <label className={styles.controlGroup}><span>Sort by</span><select className={styles.controlSelect} value={sortValue} onChange={(event) => { setSortValue(event.target.value); setPage(1); }}>{sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        </div>
      </div>

      {error && <div className={styles.formError}>{error}</div>}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead><tr><th>ID</th><th>Page</th><th>Browser</th><th>User agent</th><th>Clicked</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={5} className={styles.loadingRow}><div className={styles.skeletonRows} role="status" aria-label="Loading WhatsApp clicks">{Array.from({ length: 6 }).map((_, index) => <div className={styles.skeletonLine} key={index} />)}</div></td></tr> : clicks.length === 0 ? <tr><td colSpan={5} className={styles.emptyRow}>No WhatsApp clicks found.</td></tr> : clicks.map((click, index) => <tr key={click.id}><td>{pageSize === 0 ? index + 1 : (page - 1) * pageSize + index + 1}</td><td className={styles.pageCell}>{click.page_url || '-'}</td><td>{click.browser || '-'}</td><td className={styles.userAgentCell}>{click.user_agent || '-'}</td><td>{new Date(click.created_at).toLocaleString()}</td></tr>)}
          </tbody>
        </table>
      </div>
      {pageSize !== 0 && pageCount > 1 && <div className={styles.paginationRow}><button type="button" className={styles.pageButton} disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</button><span className={styles.pageLabel}>Page {page} of {pageCount}</span><button type="button" className={styles.pageButton} disabled={page >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>Next</button></div>}
    </section>
  );
}
