import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Link from "next/link";

function Header() {
  const [seeMore, setSeeMore] = useState(false);
  const [Login, setLogin] = useState(false);

  return (
    <div className={styles.navbar}>
      <li
        onMouseEnter={() => {
          setSeeMore(false);
        }}
        className={styles.li}
      >
        <Link className={styles.link} href="/">
          Home
        </Link>
      </li>
      <li
        onMouseEnter={() => {
          setSeeMore(false);
        }}
        className={styles.li}
      >
        <Link className={styles.link} href="/NFL">
          NFL
        </Link>
      </li>
      <li
        onMouseEnter={() => {
          setSeeMore(false);
        }}
        className={styles.li}
      >
        <Link className={styles.link} href="/NBA">
          NBA
        </Link>
      </li>
      <li
        onMouseEnter={() => {
          setSeeMore(false);
        }}
        className={styles.li}
      >
        <Link className={styles.link} href="/WNBA">
          WNBA
        </Link>
      </li>
      <li
        onMouseEnter={() => {
          setSeeMore(false);
        }}
        className={styles.li}
      >
        <Link className={styles.link} href="/MLB">
          MLB
        </Link>
      </li>
      <li
        onMouseEnter={() => {
          setSeeMore(false);
        }}
        className={styles.li}
      >
        <Link className={styles.link} href="/Soccer">
          Soccer
        </Link>
      </li>
      <li
        onMouseEnter={() => {
          setSeeMore(false);
        }}
        className={styles.li}
      >
        <Link className={styles.link} href="/NHL">
          NHL
        </Link>
      </li>
      <li className={styles.li}>
        <div
          onMouseEnter={() => {
            setSeeMore(true);
          }}
          className={styles.link}
        >
          NCAA
        </div>
        {seeMore ? (
          <>
            <div
              className={styles.seeMore}
              onMouseLeave={() => {
                setSeeMore(false);
              }}
            >
              <li className={styles.seeMoreli}>
                <Link className={styles.seeMoreLink} href="/MCBB">
                  MCBB
                </Link>
              </li>
              <li className={styles.seeMoreli}>
                <Link className={styles.seeMoreLink} href="/WCBB">
                  WCBB
                </Link>
              </li>
              <li className={styles.seeMoreli}>
                <Link className={styles.seeMoreLink} href="/CFB">
                  CFB
                </Link>
              </li>
            </div>
          </>
        ) : null}
      </li>
      {Login ? (
        <div className={styles.login_or_profile}>
          <li
            onMouseEnter={() => {
              setSeeMore(false);
            }}
            className={styles.li}
          >
            <Link className={styles.link} href="/profile">
              Profile
            </Link>
          </li>
        </div>
      ) : (
        <div className={styles.login_or_profile}>
          <li
            onMouseEnter={() => {
              setSeeMore(false);
            }}
            className={styles.li}
          >
            <Link className={styles.link} href="/login">
              Login
            </Link>
          </li>
        </div>
      )}
    </div>
  );
}

export default Header;
