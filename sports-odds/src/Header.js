import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Link from "next/link";

function Header() {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <div className={styles.navbar}>
      <li className={styles.li}>
        <Link className={styles.link} href="/Homescreen">
          Home
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.link} href="/NFL">
          NFL
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.link} href="/NBA">
          NBA
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.link} href="/WNBA">
          WNBA
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.link} href="/MLB">
          MLB
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.link} href="/Soccer">
          Soccer
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.link} href="/NHL">
          NHL
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.link} href="/NCAA">
          NCAA
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.link} href="/test">
          Test
        </Link>
      </li>
    </div>
  );
}

export default Header;
