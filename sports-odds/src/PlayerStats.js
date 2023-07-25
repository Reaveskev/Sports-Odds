import React from "react";
import styles from "@/styles/stats.module.css";
import * as AiIcon from "react-icons/ai";

const PlayerStats = ({ player, setShowStats }) => {
  console.log(player);
  const { name, position, stats, projections, outlook, bye, team, image_url } =
    player;

  const renderDataRow = (label) => {
    return (
      <tr key={label}>
        <td>{label}</td>
        <td>{stats[label]}</td>
        <td>{projections[label]}</td>
      </tr>
    );
  };

  const customKeys = Object.keys(stats);

  return (
    <div className={styles.overlay}>
      <div className={styles.stats_container}>
        <div className={styles.close_btn}>
          <AiIcon.AiFillCloseCircle
            style={{ margin: 10, cursor: "pointer" }}
            size={20}
            onClick={() => setShowStats(false)}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignitems: "flex-start",
          }}
        >
          <div className={styles.player_info}>
            <span className={styles.player_name}>{name}</span>
            <span className={styles.player_position}>
              {position} ({team}) - Bye {bye}
            </span>
            <img style={{ width: 115 }} src={image_url}></img>
          </div>

          {/* <table className={styles.stats_table}>
          <tbody>
            <tr>
              <th></th>
              <th>Last Year</th>
              <th>Projections</th>
            </tr>
            {customKeys.map((key) => renderDataRow(key))}
          </tbody>
        </table> */}
          <table className={styles.stats_table}>
            <tbody>
              <tr>
                <th></th>
                {customKeys.map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
              <tr>
                <td>Last Year</td>
                {customKeys.map((key, index) => (
                  <td key={index}>{stats[key]}</td>
                ))}
              </tr>
              <tr>
                <td>Projections</td>
                {customKeys.map((key, index) => (
                  <td key={index}>{projections[key]}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.outlook_text}>{outlook}</p>
      </div>
    </div>
  );
};

export default PlayerStats;
