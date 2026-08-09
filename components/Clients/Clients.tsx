import type { Client } from '../../types';
import styles from './Clients.module.css';

interface ClientsProps {
  clients: Client[];
}

export default function Clients({ clients }: ClientsProps) {
  return (
    <section className={styles.section} id="clients">
      <div className={styles.header}>
        <p className={styles.label}>Trusted by</p>
        <h2>Industry partners rely on our delivery and craftsmanship.</h2>
      </div>
      <div className={styles.grid}>
        {clients.map((client) => (
          <div key={client.name} className={styles.card}>
            <div className={styles.logo}>{client.name}</div>
            <p>{client.industry}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
