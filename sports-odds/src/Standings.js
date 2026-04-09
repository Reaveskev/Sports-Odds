import React from "react";
import styles from "@/styles/Standings.module.css";

const Standings = ({ standings }) => {
  return (
    <div className={styles.standing_div}>
      <div className={styles.news}>
        <h1 className={styles.sectionTitle}>Standings</h1>

        <div className={styles.standingsContainer}>
          {standings?.map((conference, i) => (
            <div className={styles.conferenceCard} key={i}>
              <h2 className={styles.conferenceTitle}>
                {conference.conference}
              </h2>

              <div className={styles.standingsHeader}>
                <span className={styles.headerSpacer}></span>
                <span className={styles.headerTeam}>Team</span>
                <span className={styles.headerRecord}>W / L</span>
              </div>

              <div className={styles.teamList}>
                {conference.teams.map((team, j) => (
                  <div className={styles.teamRow} key={j}>
                    <img
                      className={styles.standingsLogo}
                      src={team.logo}
                      alt={team.team_name}
                    />
                    <span className={styles.standingsTeamName}>
                      {team.team_name}
                    </span>
                    <span className={styles.standingsRecord}>
                      {team.wins}-{team.losses}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Standings;
