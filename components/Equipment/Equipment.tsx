import type { EquipmentItem } from '../../types';
import styles from './Equipment.module.css';

interface EquipmentProps {
  equipment: EquipmentItem[];
}

export default function Equipment({ equipment }: EquipmentProps) {
  return (
    <section className={styles.section} id="equipment">
      <div className={styles.header}>
        <p className={styles.label}>Heavy equipment</p>
        <h2>Tools and equipment that keep projects moving.</h2>
      </div>
      <div className={styles.grid}>
        {equipment.map((item) => (
          <div key={item.name} className={styles.card}>
            <div className={styles.icon}>{item.icon}</div>
            <h3>{item.name}</h3>
            <p>{item.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
