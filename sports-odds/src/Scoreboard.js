import React from "react";
import styles from "@/styles/Scoreboard.module.css";

const Scoreboard = ({ inprogress, upcoming, completed }) => {
  const renderGames = (games, title, showScore = true) => {
    if (!games || games.length === 0) {
      return null;
    }

    return (
      <>
        <div className={styles.inlineSectionHeader}>{title}</div>

        {games.map((game) => {
          return (
            <div className={styles.games} key={game.id}>
              {game.game_progress.status !== "post" && (
                <>
                  <div className={styles.date}>
                    {game.game_progress.description}
                  </div>
                  <div className={styles.time}>{game.game_progress.detail}</div>
                </>
              )}

              <div className={styles.teamContainer}>
                <div className={styles.logoDiv}>
                  <img
                    alt=""
                    className={styles.logo}
                    src={game.team_one.logo}
                  />
                </div>
                <div className={styles.teamName}>{game.team_one.abbrev}</div>
                <div className={styles.record}>({game.team_one.record})</div>
                {showScore && (
                  <span className={styles.score}>{game.team_one.score}</span>
                )}
              </div>

              <div className={styles.teamContainer}>
                <div className={styles.logoDiv}>
                  <img
                    alt=""
                    className={styles.logo}
                    src={game.team_two.logo}
                  />
                </div>
                <div className={styles.teamName}>{game.team_two.abbrev}</div>
                <div className={styles.record}>({game.team_two.record})</div>
                {showScore && (
                  <span className={styles.score}>{game.team_two.score}</span>
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className={styles.scoreboard}>
      <div className={styles.scoreboardRow}>
        {renderGames(inprogress, "Live", true)}
        {renderGames(upcoming, "Upcoming", false)}
        {renderGames(completed, "Final", true)}
      </div>
    </div>
  );
};

export default Scoreboard;

// removed duplicated JSX
// used a reusable rendering function
// switched to clean array mapping
