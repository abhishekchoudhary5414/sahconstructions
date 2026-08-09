'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AdminNavbar.module.css';
import Image from 'next/image';

interface AdminNavbarProps {
    username: string;
}

export default function AdminNavbar({ username }: AdminNavbarProps) {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setMenuOpen(false);
        };

        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin');
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.adminBar}>
            <div className={styles.inner}>
                <Link href="/admin" className={styles.brandLink}>
                    <Image
                        src="/logo/logo.svg"
                        alt="SAH Constructions"
                        width={150}
                        height={50}
                    />
                </Link>

                <nav className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ''}`} aria-label="Admin navigation">
                    <div className={styles.linkGroup}>
                        <Link href="/admin/dashboard" className={styles.navLink} onClick={closeMenu}>
                            Dashboard
                        </Link>
                        <Link href="/admin/dashboard/enquiry" className={styles.navLink} onClick={closeMenu}>
                            Enquiry Dashboard
                        </Link>
                        <Link href="/admin/dashboard/contact" className={styles.navLink} onClick={closeMenu}>
                            Contact Dashboard
                        </Link>
                        <Link href="/admin/dashboard/whatsapp" className={styles.navLink} onClick={closeMenu}>
                            Whatsapp Dashboard
                        </Link>
                        <Link href="/admin/dashboard/call" className={styles.navLink} onClick={closeMenu}>
                            Call Dashboard
                        </Link>
                    </div>
                    <button
                        type="button"
                        className={styles.mobileLogout}
                        onClick={() => { closeMenu(); handleLogout(); }}
                    >
                        <LogoutIcon fontSize="small" />
                        Logout
                    </button>
                </nav>

                <div className={styles.actions}>
                    <button type="button" className={styles.desktopLogout} onClick={handleLogout}>
                        <LogoutIcon fontSize="small" />
                        Logout
                    </button>
                    <button
                        type="button"
                        className={styles.toggleButton}
                        onClick={() => setMenuOpen((current) => !current)}
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {menuOpen ? <CloseIcon fontSize="medium" /> : <MenuIcon fontSize="medium" />}
                    </button>
                </div>
            </div>
        </header>
    );
}
