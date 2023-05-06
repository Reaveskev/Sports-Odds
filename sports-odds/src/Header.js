import { useState } from "react";
import axios from "axios";
import styles from "./Header.module.css";
import Link from "next/link";
import * as FiIcons from "react-icons/fi";
import { useAppContext } from "./GlobalContext";
function Header() {
  const [seeMore, setSeeMore] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useAppContext();

  const handleLogout = () => {
    let url = "https://sports-odds.herokuapp.com/api/logout";
    // let url = "http://127.0.0.1:5000/api/logout";
    try {
      axios.post(url).then((res) => {
        if (res.status === 200) {
          setUser(null);
        } else {
          console.log(res);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.navbar}>
        <div style={{ marginLeft: 10 }}>
          <Link href="/">
            <img alt="" className={styles.logo} src="/out/Sports Odds-1.png" />
          </Link>
        </div>

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
          <Link className={styles.link} href="/NHL">
            NHL
          </Link>
        </li>
        <li className={styles.li}>
          <div
            onMouseEnter={() => {
              setSeeMore(true);
            }}
            onMouseLeave={() => {
              setSeeMore(false);
            }}
            className={styles.link}
          >
            NCAA
            {seeMore ? (
              <div className={styles.seeMore}>
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
            ) : null}
          </div>
        </li>

        {user ? (
          <div className={styles.login_or_profile}>
            <li className={styles.li}>
              <Link className={styles.link} href="/profile">
                Profile
              </Link>
            </li>
            <li
              onClick={() => {
                handleLogout();
              }}
              className={styles.li}
            >
              <Link className={styles.link} href="/">
                Logout
              </Link>
            </li>
          </div>
        ) : (
          <div className={styles.login_or_profile}>
            <li className={styles.li}>
              <Link className={styles.link} href="/login">
                Login
              </Link>
            </li>
          </div>
        )}
      </div>

      {/* Mobile display */}
      <div className={styles.mobile_navbar}>
        <div style={{ marginLeft: 10 }}>
          <Link href="/">
            <img alt="" className={styles.logo} src="/out/Sports Odds-1.png" />
          </Link>
        </div>
        <span
          onClick={() => setMenuOpen(!menuOpen)}
          className={styles.hamburger}
        >
          ☰
        </span>
      </div>
      {menuOpen ? (
        <div className={styles.mobile_li}>
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
            <Link className={styles.link} href="/NHL">
              NHL
            </Link>
          </li>
          <li className={styles.li}>
            <div
              onClick={() => {
                setSeeMore(!seeMore);
              }}
              className={styles.link}
            >
              NCAA
              {seeMore ? (
                <div className={styles.seeMore}>
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
              ) : null}
            </div>
          </li>

          {user ? (
            <div className={styles.login_or_profile}>
              <li className={styles.li}>
                <Link className={styles.link} href="/profile">
                  Profile
                </Link>
              </li>
              <li
                onClick={() => {
                  handleLogout();
                }}
                className={styles.li}
              >
                <Link className={styles.link} href="/">
                  Logout
                </Link>
              </li>
            </div>
          ) : (
            <div className={styles.login_or_profile}>
              <li className={styles.li}>
                <Link className={styles.link} href="/login">
                  Login
                </Link>
              </li>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Header;
