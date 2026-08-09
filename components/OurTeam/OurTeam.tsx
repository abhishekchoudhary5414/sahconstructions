import type { TeamMember } from '../../types';
import Image from 'next/image';
import styles from './OurTeam.module.css';

interface OurTeamProps {
  team: TeamMember[];
}

export default function OurTeam({ team }: OurTeamProps) {
  return (
    <section className={styles.section} id="team">
      <div className={styles.header}>
        <p className={styles.label}>Team that delivers</p>
        <h2>Experienced leadership and site experts.</h2>
      </div>
      <div className={styles.grid}>
        {team.map((member) => (
          <article key={member.name} className={styles.card}>
            <div className={styles.visual}>
              <Image src={member.photo} alt={member.name} fill sizes="(max-width: 768px) 100vw, 30vw" />
            </div>
            <div className={styles.body}>
              <h3>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              <p>{member.expertise}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
