import React, { useState } from "react";
import DraftBoard from "@/src/draftboard";
import Header from "@/src/Header";
import styles from "@/styles/draftboard.module.css";

const FF = () => {
  const [numPlayers, setNumPlayers] = useState(10);
  const [numRounds, setNumRounds] = useState(10);

  const [tempNumPlayers, setTempNumPlayers] = useState(10);
  const [tempNumRounds, setTempNumRounds] = useState(10);

  const handleButtonClick = () => {
    setNumPlayers(tempNumPlayers);
    setNumRounds(tempNumRounds);
  };

  return (
    <div>
      <Header />
      <h1 className={styles.align}>Fantasy Football Draft</h1>
      <div className={styles.FF_formContainer}>
        <label className={styles.FF_label} htmlFor="numPlayers">
          Number of Players:
        </label>
        <input
          type="number"
          id="numPlayers"
          value={tempNumPlayers}
          className={styles.FF_input}
          onChange={(e) => setTempNumPlayers(parseInt(e.target.value))}
        />
        <br />
        <label className={styles.FF_label} htmlFor="numRounds">
          Number of Rounds:
        </label>
        <input
          type="number"
          id="numRounds"
          value={tempNumRounds}
          className={styles.FF_input}
          onChange={(e) => setTempNumRounds(parseInt(e.target.value))}
        />
        <br />
        <button
          styles={{ marginLeft: 10 }}
          className={styles.FF_button}
          onClick={handleButtonClick}
        >
          Update Draft Board
        </button>
      </div>
      <DraftBoard numPlayers={numPlayers} numRounds={numRounds} />
    </div>
  );
};

export default FF;
