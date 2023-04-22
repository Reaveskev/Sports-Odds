import React from "react";
import styles from "@/styles/Home.module.css";

const WhistleLoader = () => {
  return (
    <div className={styles.whistle_container}>
      <img
        className={styles.whistle}
        alt="whistle"
        src="/out/Sports_Odds.png"
      />
      <p className={styles.text}>Loading...</p>
    </div>
  );
};

export default WhistleLoader;
