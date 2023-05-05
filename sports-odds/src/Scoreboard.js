import React from "react";
import styles from "@/styles/NBA.module.css";

const Scoreboard = ({ inprogress, upcoming, completed }) => {
  return (
    <div className={styles.scoreboard}>
      <>
        {inprogress.games !== undefined ? (
          <>
            {inprogress.games.map((games) => {
              return (
                <div className={styles.games} key={games.id}>
                  <div className={styles.date}>
                    {games.game_progress.primary}
                  </div>
                  <div className={styles.time}>
                    {games.game_progress.header}
                  </div>
                  <div className={styles.teamContainer}>
                    <div className={styles.logoDiv}>
                      <img
                        alt=""
                        className={styles.logo}
                        src={games.team_one.logo}
                      />
                    </div>
                    <div className={styles.teamName}>
                      {games.team_one.abbrev}
                    </div>
                    <div className={styles.record}>{games.team_one.record}</div>
                    <span>{games.team_one.score}</span>
                  </div>
                  <div className={styles.teamContainer}>
                    <div className={styles.logoDiv}>
                      <img
                        alt=""
                        className={styles.logo}
                        src={games.team_two.logo}
                      />
                    </div>
                    <div className={styles.teamName}>
                      {games.team_two.abbrev}
                    </div>
                    <div className={styles.record}>{games.team_two.record}</div>
                    <span>{games.team_two.score}</span>
                  </div>
                </div>
              );
            })}
          </>
        ) : null}
        {completed.games !== undefined ? (
          <>
            {completed.games.map((games) => {
              return (
                <div className={styles.games} key={games.id}>
                  <div className={styles.date}>
                    {games.game_progress.primary}
                  </div>
                  <div className={styles.time}>
                    {games.game_progress.header}
                  </div>
                  <div className={styles.teamContainer}>
                    <div className={styles.logoDiv}>
                      <img
                        alt=""
                        className={styles.logo}
                        src={games.team_one.logo}
                      />
                    </div>
                    <div className={styles.teamName}>
                      {games.team_one.abbrev}
                    </div>
                    <div className={styles.record}>{games.team_one.record}</div>
                    <span>{games.team_one.score}</span>
                  </div>
                  <div className={styles.teamContainer}>
                    <div className={styles.logoDiv}>
                      <img
                        alt=""
                        className={styles.logo}
                        src={games.team_two.logo}
                      />
                    </div>
                    <div className={styles.teamName}>
                      {games.team_two.abbrev}
                    </div>
                    <div className={styles.record}>{games.team_two.record}</div>
                    <span>{games.team_two.score}</span>
                  </div>
                </div>
              );
            })}
          </>
        ) : null}
        {upcoming.games !== undefined ? (
          <>
            {upcoming.games.map((games) => {
              return (
                <div className={styles.games} key={games.id}>
                  <div className={styles.date}>
                    {games.game_progress.primary}
                  </div>
                  <div className={styles.time}>
                    {games.game_progress.header}
                  </div>
                  <div className={styles.teamContainer}>
                    <div className={styles.logoDiv}>
                      <img
                        alt=""
                        className={styles.logo}
                        src={games.team_one.logo}
                      />
                    </div>
                    <div className={styles.teamName}>
                      {games.team_one.abbrev}
                    </div>
                    <div className={styles.record}>{games.team_one.record}</div>
                    <span>{games.team_one.score}</span>
                  </div>
                  <div className={styles.teamContainer}>
                    <div className={styles.logoDiv}>
                      <img
                        alt=""
                        className={styles.logo}
                        src={games.team_two.logo}
                      />
                    </div>
                    <div className={styles.teamName}>
                      {games.team_two.abbrev}
                    </div>
                    <div className={styles.record}>{games.team_two.record}</div>
                    <span>{games.team_two.score}</span>
                  </div>
                </div>
              );
            })}
          </>
        ) : null}
      </>
    </div>
  );
};

export default Scoreboard;
