 'use client';

import React from 'react';

type Props = React.PropsWithChildren<{
  href: string;
  className?: string;
  ariaLabel?: string;
  openInNewTab?: boolean;
}>;

function detectBrowser(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return 'Edge';
  if (/OPR\//.test(ua) || /Opera\//.test(ua)) return 'Opera';
  if (/Chrome\//.test(ua) && !/Chromium\//.test(ua)) return 'Chrome';
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'Safari';
  if (/Firefox\//.test(ua)) return 'Firefox';
  return 'Other';
}

export default function WhatsAppLink({ href, className, ariaLabel, openInNewTab = true, children }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const payload = {
      href,
      page_url: typeof window !== 'undefined' ? window.location.href : null,
      browser: detectBrowser(),
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null
    };

    // Best-effort background send (keepalive) and then open link
    try {
      fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      });
    } catch (err) {
      // ignore
    }

    if (openInNewTab) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = href;
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={href} onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
