'use client';

import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import companyData from '../../data/company.json';
import styles from './Navbar.module.css';
import Image from 'next/image';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/how-we-work', label: 'How We Work' },
    { href: '#services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
];

const normalizeDigits = (phone: string) => phone.replace(/\D/g, '');
const phoneHref = `tel:+${normalizeDigits(companyData.phone)}`;
const whatsappHref = `https://wa.me/${normalizeDigits(companyData.phone)}?text=${encodeURIComponent(
    companyData.contact.whatsappMessage ??
    'Hello SAH Constructions, I would like to discuss a construction project.'
)}`;

export default function Navbar() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
    }, [open]);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <div>
                        <Image
                            src="/logo/logo.svg"
                            alt="SAH Constructions"
                            width={150}
                            height={50}
                        />
                    </div>

                    <nav className={`${styles.nav} ${open ? styles.open : ''}`} aria-label="Primary navigation">
                        <div className={styles.linkGroup}>
                            {navLinks.map((link) => (
                                <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                        <a className={styles.ctaLinkMobile} href={phoneHref} onClick={() => setOpen(false)}>
                            Call Now
                        </a>
                    </nav>

                    <div>
                        <div className={styles.actions}>
                            <a className={styles.ctaLink} href={phoneHref} aria-label={`Call ${companyData.name}`}>
                                Call Now
                            </a>
                            <button
                                type="button"
                                className={styles.toggle}
                                onClick={() => setOpen((current) => !current)}
                                aria-expanded={open}
                                aria-label={open ? 'Close menu' : 'Open menu'}
                            >
                                {open ? <CloseIcon fontSize="medium" /> : <MenuIcon fontSize="medium" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <div className={styles.floatingActions}>
                <a
                    className={styles.callFixed}
                    href={phoneHref}
                    aria-label={`Call ${companyData.name}`}
                >
                    <CallIcon fontSize="small" />
                    <span>Call Now</span>
                </a>
                <a
                    className={styles.whatsappFixed}
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Chat on WhatsApp"
                >
                    <WhatsAppIcon fontSize="small" />
                    <span>WhatsApp</span>
                </a>
            </div>
        </>
    );
}
