'use client';

import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import styles from '../../app/admin/dashboard/DashboardPage.module.css';

type StatVariant = 'enquiries' | 'whatsapp' | 'calls' | 'contacts';

const statIconMap: Record<StatVariant, React.ReactNode> = {
  enquiries: <ContactMailIcon fontSize="small" />,
  whatsapp: <WhatsAppIcon fontSize="small" />,
  calls: <CallIcon fontSize="small" />,
  contacts: <PhoneInTalkIcon fontSize="small" />,
};

const statClassMap: Record<StatVariant, string> = {
  enquiries: styles.enquiriesIcon,
  whatsapp: styles.whatsappIcon,
  calls: styles.callsIcon,
  contacts: styles.contactsIcon,
};

interface StatBadgeProps {
  variant: StatVariant;
}

export function StatBadge({ variant }: StatBadgeProps) {
  return (
    <div className={`${styles.statIconWrap} ${statClassMap[variant]}`}>
      {statIconMap[variant]}
    </div>
  );
}

interface IconActionsProps {
  callHref: string;
  waHref: string;
  callAria: string;
  waAria: string;
}

export function IconActions({ callHref, waHref, callAria, waAria }: IconActionsProps) {
  return (
    <>
      <a className={`${styles.iconBtn} ${styles.iconBtnCall}`} href={callHref} title={callAria} aria-label={callAria}>
        <CallIcon fontSize="small" />
      </a>
      <a className={`${styles.iconBtn} ${styles.iconBtnWhatsApp}`} href={waHref} target="_blank" rel="noreferrer" title={waAria} aria-label={waAria}>
        <WhatsAppIcon fontSize="small" />
      </a>
    </>
  );
}
