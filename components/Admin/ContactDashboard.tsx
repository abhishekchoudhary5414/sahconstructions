'use client';

import { useEffect, useMemo, useState } from 'react';
import { IconActions, StatBadge } from './DashboardWidgets';
import styles from './ContactDashboard.module.css';

type ContactRow = {
    id: number;
    name: string;
    phone: string;
    message: string | null;
    status: string | null;
    created_at: string;
};

const statusOptions = ['New', 'Contacted', 'Not Received', 'In Progress', 'Completed', 'Not Interested'];
const cardStatuses = [
    { label: 'New', className: 'New' },
    { label: 'Contacted', className: 'contacted' },
    { label: 'Not Received', className: 'notReceived' },
    { label: 'Completed', className: 'completed' },
];
const sortOptions = [
    { value: 'created_at:desc', label: 'Received newest' },
    { value: 'created_at:asc', label: 'Received oldest' },
    { value: 'name:asc', label: 'Name A → Z' },
    { value: 'status:asc', label: 'Status A → Z' },
];

function normalizeStatus(status: string | null | undefined) {
    if (!status) return 'New';
    if (status === 'Closed') return 'Completed';
    return statusOptions.includes(status) ? status : 'New';
}

function cleanNumber(value: string | null | undefined) {
    return (value || '').replace(/[^+0-9]/g, '').replace(/^\+?0+/, '');
}

export default function ContactDashboard() {
    const [contacts, setContacts] = useState<ContactRow[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortValue, setSortValue] = useState(sortOptions[0].value);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [sortKey, sortOrder] = useMemo(() => sortValue.split(':'), [sortValue]);

    useEffect(() => {
        const controller = new AbortController();
        async function loadContacts() {
            setLoading(true);
            setError('');
            const size = pageSize === 0 ? 1000 : pageSize;
            const params = new URLSearchParams({ page: String(page), pageSize: String(size), sortKey, sortOrder, search });
            try {
                const response = await fetch(`/api/admin/contacts?${params.toString()}`, { signal: controller.signal });
                if (!response.ok) throw new Error('Unable to fetch contacts.');
                const payload = await response.json();
                setContacts((payload.data ?? []).map((row: ContactRow) => ({ ...row, status: normalizeStatus(row.status) })));
                setTotalRecords(payload.count ?? 0);
            } catch (err) {
                if (!(err instanceof DOMException && err.name === 'AbortError')) setError('Unable to load contacts. Refresh the page and try again.');
            } finally {
                setLoading(false);
            }
        }
        loadContacts();
        return () => controller.abort();
    }, [page, pageSize, sortKey, sortOrder, search]);

    const pageCount = pageSize === 0 ? 1 : Math.ceil(totalRecords / pageSize);

    const updateStatus = async (id: number, status: string) => {
        setSavingId(id);
        setError('');
        setStatusMessage('');
        try {
            const response = await fetch('/api/admin/contacts', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status }),
            });
            if (!response.ok) throw new Error('Unable to update status.');
            setContacts((current) => current.map((row) => row.id === id ? { ...row, status } : row));
            setStatusMessage('Status updated successfully.');
        } catch {
            setError('Unable to update status. Please try again.');
        } finally {
            setSavingId(null);
        }
    };

    return (
        <section className={styles.contactSection}>
            <div className={styles.dashboardHeader}>
                <div>
                    <p className={styles.label}>Contact dashboard</p>
                    <h2>Track contacts and manage messages</h2>
                    <p className={styles.subText}>Review contact messages, update progress, and connect with customers immediately.</p>
                </div>
                <div className={styles.dashboardStatsRow}>
                    {cardStatuses.map((status) => (
                        <div key={status.label} className={`${styles.statusCard} ${styles[status.className]}`}>
                            <StatBadge variant="contacts" />
                            <strong>{contacts.filter((row) => normalizeStatus(row.status) === status.label).length}</strong>
                            <span>{status.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.controlsRow}>
                <div className={styles.controlsLabel}>Showing {contacts.length} / {totalRecords} contacts{pageSize !== 0 && ` • Page ${page} of ${pageCount}`}</div>
                <div className={styles.controls}>
                    <label className={styles.controlGroup}><span>Search name or number</span><input className={styles.searchInput} value={search} placeholder="Name or phone" onChange={(event) => { setSearch(event.target.value); setPage(1); }} /></label>
                    <label className={styles.controlGroup}><span>Page size</span><select className={styles.controlSelect} value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}><option value={10}>10</option><option value={20}>20</option><option value={50}>50</option><option value={100}>100</option><option value={0}>All</option></select></label>
                    <label className={styles.controlGroup}><span>Sort by</span><select className={styles.controlSelect} value={sortValue} onChange={(event) => { setSortValue(event.target.value); setPage(1); }}>{sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                </div>
            </div>

            {error && <div className={styles.formError}>{error}</div>}
            {statusMessage && <div className={styles.formSuccess}>{statusMessage}</div>}

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>Message</th><th>Status</th><th>Received</th><th>Actions</th></tr></thead>
                    <tbody>
                        {loading ? <tr><td colSpan={7} className={styles.loadingRow}><div className={styles.skeletonRows} aria-label="Loading contacts" role="status">{Array.from({ length: 6 }).map((_, index) => <div className={styles.skeletonLine} key={index} />)}</div></td></tr> : contacts.length === 0 ? <tr><td colSpan={7} className={styles.emptyRow}>No contacts found.</td></tr> : contacts.map((row, index) => {
                            const status = normalizeStatus(row.status);
                            const digits = cleanNumber(row.phone).replace(/[^0-9]/g, '');
                            return <tr key={row.id}>
                                <td>{pageSize === 0 ? index + 1 : (page - 1) * pageSize + index + 1}</td><td>{row.name || '-'}</td><td>{row.phone || '-'}</td>
                                <td className={styles.messageCell}>{row.message || '-'}</td>
                                <td><select className={`${styles.statusSelect} ${styles[`status${status.replace(/\s/g, '')}`] || ''}`} value={status} disabled={savingId === row.id} onChange={(event) => updateStatus(row.id, event.target.value)}>{statusOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></td>
                                <td>{new Date(row.created_at).toLocaleString()}</td>
                                <td className={styles.actions}><IconActions callHref={`tel:${cleanNumber(row.phone)}`} waHref={`https://wa.me/${digits}?text=${encodeURIComponent(`Hello ${row.name || ''}, I'm contacting you regarding your message.`)}`} callAria="Call contact" waAria="WhatsApp contact" /></td>
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>
            {pageSize !== 0 && pageCount > 1 && <div className={styles.paginationRow}><button type="button" className={styles.pageButton} disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</button><span className={styles.pageLabel}>Page {page} of {pageCount}</span><button type="button" className={styles.pageButton} disabled={page >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>Next</button></div>}
        </section>
    );
}
