'use client';

import React from 'react';

type Props = React.PropsWithChildren<{
  href: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
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

export default function CallLink({ href, className, ariaLabel, children }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const payload = {
      href,
      page_url: typeof window !== 'undefined' ? window.location.href : null,
      browser: detectBrowser(),
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null
    };

    try {
      fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      });
    } catch (err) {
      // ignore tracking failures
    }

    window.location.href = href;
  };

  return (
    <a href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </a>
  );
}
