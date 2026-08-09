'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import UniversalLoader from '../UniversalLoader/UniversalLoader';
import styles from './PageLoader.module.css';

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setVisible(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const targetAttr = anchor.getAttribute('target');
      if (!href) return;

      try {
        const url = new URL(href, window.location.href);
        const isInternal = url.origin === window.location.origin && (!targetAttr || targetAttr === '_self');
        const isDifferentPage = url.pathname !== window.location.pathname;

        if (isInternal && isDifferentPage) {
          setVisible(true);
        }
      } catch {
        // ignore malformed hrefs
      }
    };

    const onPopState = () => setVisible(false);
    const onPageShow = () => setVisible(false);

    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPopState);
    window.addEventListener('pageshow', onPageShow);

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.overlay} aria-hidden>
      <div className={styles.loaderFrame}>
        <UniversalLoader compact />
      </div>
    </div>
  );
}
