'use client';

import { useEffect, useMemo, useState } from 'react';
import { IconActions, StatBadge } from './DashboardWidgets';
import styles from './EnquiryDashboard.module.css';

type EnquiryRow = {
  id: number;
  name: string;
  phone: string;
  service: string | null;
  status: string | null;
  created_at: string;
};

const sortOptions = [
  { value: 'created_at:desc', label: 'Received newest' },
  { value: 'created_at:asc', label: 'Received oldest' },
  { value: 'name:asc', label: 'Name A → Z' },
  { value: 'status:asc', label: 'Status A → Z' },
];

const statusOptions = ['New', 'Contacted', 'Not Received', 'In Progress', 'Completed', 'Not Interested'];

const statusCardOptions = [
    { label: 'New', className: 'new' },
  { label: 'Contacted', className: 'contacted' },
  { label: 'In Progress', className: 'inProgress' },
  { label: 'Completed', className: 'completed' },
];

function normalizeStatus(status: string | null | undefined) {
  if (!status) return 'New';
  if (status === 'Closed') return 'Completed';
  return statusOptions.includes(status) ? status : 'New';
}

function cleanNumber(value: string | null | undefined) {
  if (!value) return '917018009352';
  return value.replace(/[^+0-9]/g, '').replace(/^\+?0+/, '');
}

function whatsappHref(number: string | null | undefined, text: string) {
  const clean = cleanNumber(number);
  const digits = clean.replace(/[^0-9]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

function telHref(number: string | null | undefined) {
  const clean = cleanNumber(number);
  return `tel:+${clean}`;
}

export default function EnquiryDashboard() {
  const [enquiries, setEnquiries] = useState<EnquiryRow[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortValue, setSortValue] = useState(sortOptions[0].value);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const [statusMessage, setStatusMessage] = useState('');

  const [sortKey, sortOrder] = useMemo(() => {
    const [key, order] = sortValue.split(':');
    return [key, order] as const;
  }, [sortValue]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadEnquiries() {
      setLoading(true);
      setError('');

      const sizeParam = pageSize === 0 ? 1000 : pageSize;
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(sizeParam),
        sortKey,
        sortOrder,
        search,
      });

      try {
        const response = await fetch(`/api/admin/enquiries?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Unable to fetch enquiries.');
        }

        const payload = await response.json();
        setEnquiries((payload.data ?? []).map((row: EnquiryRow) => ({
          ...row,
          status: normalizeStatus(row.status),
        })));
        setTotalRecords(payload.count ?? 0);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          setError('Unable to load enquiries. Refresh the page and try again.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadEnquiries();

    return () => controller.abort();
  }, [page, pageSize, sortKey, sortOrder, search]);

  const pageCount = pageSize === 0 ? 1 : Math.ceil(totalRecords / pageSize);

  const handleStatusChange = async (id: number, nextStatus: string) => {
    setSavingId(id);
    setError('');
    setStatusMessage('');

    try {
      const response = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: nextStatus }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || 'Unable to update status.');
      }

      setEnquiries((current) =>
        current.map((row) => (row.id === id ? { ...row, status: nextStatus } : row))
      );
      setStatusMessage('Status updated successfully.');
    } catch (err) {
      setError('Unable to update status. Please try again.');
    } finally {
      setSavingId(null);
    }
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  return (
    <section className={styles.enquirySection}>
      <div className={styles.dashboardHeader}>
        <div>
          <p className={styles.label}>Enquiry dashboard</p>
          <h2>Track enquiries and manage leads</h2>
          <p className={styles.subText}>Review enquiry details, update progress, and connect with customers immediately.</p>
        </div>
        <div className={styles.dashboardStatsRow}>
          {statusCardOptions.map((status) => (
            <div key={status.label} className={`${styles.statusCard} ${styles[status.className]}`}>
              <StatBadge variant="enquiries" />
              <strong>{enquiries.filter((row) => normalizeStatus(row.status) === status.label).length}</strong>
              <span>{status.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.controlsLabel}>
          <span>Showing {enquiries.length} / {totalRecords} enquiries</span>
          {pageSize !== 0 && <span> • Page {page} of {pageCount}</span>}
        </div>

        <div className={styles.controls}>           
          <label className={styles.controlGroup}><span>Search name or number</span><input className={styles.searchInput} value={search} placeholder="Name or phone" onChange={(event) => { setSearch(event.target.value); setPage(1); }} /></label>
          <label className={styles.controlGroup}>
            <span>Page size</span>
            <select
              value={pageSize}
              onChange={(event) => handlePageSizeChange(Number(event.target.value))}
              className={styles.controlSelect}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={0}>All</option>
            </select>
          </label>
          <label className={styles.controlGroup}>
            <span>Sort by</span>
            <select
              value={sortValue}
              onChange={(event) => setSortValue(event.target.value)}
              className={styles.controlSelect}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {error && <div className={styles.formError}>{error}</div>}
      {statusMessage && <div className={styles.formSuccess}>{statusMessage}</div>}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Status</th>
              <th>Received</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className={styles.loadingRow}>
                  <div className={styles.skeletonRows} aria-label="Loading enquiries" role="status">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div className={styles.skeletonLine} key={index} />
                    ))}
                  </div>
                </td>
              </tr>
            ) : enquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.emptyRow}>
                  No enquiries found.
                </td>
              </tr>
            ) : (
              enquiries.map((row, index) => (
                <tr key={row.id}>
                  <td>{pageSize === 0 ? index + 1 : (page - 1) * pageSize + index + 1}</td>
                  <td>{row.name || '-'}</td>
                  <td>{row.phone || '-'}</td>
                  <td>{row.service || '-'}</td>
                  <td>
                    <select
                      className={`${styles.statusSelect} ${styles[`status${normalizeStatus(row.status).replace(/\s/g, '')}`] || ''}`}
                      value={normalizeStatus(row.status)}
                      disabled={savingId === row.id}
                      onChange={(event) => handleStatusChange(row.id, event.target.value)}
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{new Date(row.created_at).toLocaleString()}</td>
                  <td className={styles.actions}>
                    <IconActions
                      callHref={telHref(row.phone)}
                      waHref={whatsappHref(row.phone, `Hello ${row.name || ''}, I'm contacting you regarding your enquiry.`)}
                      callAria="Call enquiry"
                      waAria="WhatsApp enquiry"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pageSize !== 0 && pageCount > 1 && (
        <div className={styles.paginationRow}>
          <button
            type="button"
            className={styles.pageButton}
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            Previous
          </button>
          <span className={styles.pageLabel}>Page {page} of {pageCount}</span>
          <button
            type="button"
            className={styles.pageButton}
            disabled={page >= pageCount}
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
