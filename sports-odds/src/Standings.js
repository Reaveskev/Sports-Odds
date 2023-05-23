import React from "react";
import styles from "@/styles/NBA.module.css";

const Standings = ({ standings }) => {
  return (
    <div className={styles.standing_div}>
      <div className={styles.news}>
        <h1 className={styles.upcoming}>Standings</h1>
        <div className={styles.Standings}>
          {standings ? (
            <div>
              {standings.map((conference, i) => (
                <div style={{ width: "auto" }} key={i}>
                  <h2>{conference.conference}</h2>
                  <div className={styles.standings_title}>
                    <p style={{ width: 35 }}></p>
                    <p
                      style={{
                        width: 100,
                        marginRight: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Team
                    </p>
                    <p
                      style={{ width: 80, marginRight: 10, fontWeight: "bold" }}
                    >
                      Wins/Losses
                    </p>
                  </div>
                  <ul>
                    {conference.teams.map((team, j) => (
                      <li
                        style={{ paddingBottom: 5 }}
                        className={styles.name_logo}
                        key={j}
                      >
                        <img
                          className={styles.odds_logo}
                          src={team.logo}
                          alt={team.team_name}
                        />
                        <span
                          style={{
                            marginRight: 15,
                            width: 100,
                          }}
                        >
                          {team.team_name}
                        </span>
                        <span
                          style={{
                            marginRight: 15,
                            width: 80,
                          }}
                        >
                          W: {team.wins}/ L: {team.losses}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Standings;
