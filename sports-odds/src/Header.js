import { useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";

const leagueLinks = [
  { href: "/NFL", label: "NFL" },
  { href: "/NBA", label: "NBA" },
  { href: "/WNBA", label: "WNBA" },
  { href: "/MLB", label: "MLB" },
  { href: "/NHL", label: "NHL" },
];

const ncaaLinks = [
  { href: "/MCBB", label: "MCBB" },
  { href: "/WCBB", label: "WCBB" },
  { href: "/CFB", label: "CFB" },
];

function Header() {
  const [desktopNCAAOpen, setDesktopNCAAOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNCAAOpen, setMobileNCAAOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileNCAAOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.logoWrapper}>
            <Link href="/">
              <img
                alt="Sports Odds logo"
                className={styles.logo}
                src="/Sports Odds-1.png"
              />
            </Link>
          </div>

          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {leagueLinks.map((link) => (
                <li className={styles.li} key={link.href}>
                  <Link className={styles.link} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}

              <li
                className={styles.li}
                onMouseEnter={() => setDesktopNCAAOpen(true)}
                onMouseLeave={() => setDesktopNCAAOpen(false)}
              >
                <button type="button" className={styles.navButton}>
                  NCAA
                </button>

                {desktopNCAAOpen && (
                  <ul className={styles.seeMore}>
                    {ncaaLinks.map((link) => (
                      <li className={styles.seeMoreli} key={link.href}>
                        <Link className={styles.seeMoreLink} href={link.href}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
          <div className={styles.navSpacer}></div>
        </div>

        <div className={styles.mobile_navbar}>
          <div className={styles.logoWrapper}>
            <Link href="/">
              <img
                alt="Sports Odds logo"
                className={styles.logo}
                src="/Sports Odds-1.png"
              />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={styles.hamburger}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className={styles.mobileMenu} aria-label="Mobile navigation">
            <ul className={styles.mobileNavList}>
              {leagueLinks.map((link) => (
                <li className={styles.li} key={link.href}>
                  <Link
                    className={styles.link}
                    href={link.href}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className={styles.li}>
                <button
                  type="button"
                  onClick={() => setMobileNCAAOpen((prev) => !prev)}
                  className={styles.navButton}
                  aria-expanded={mobileNCAAOpen}
                >
                  NCAA
                </button>

                {mobileNCAAOpen && (
                  <ul className={styles.seeMore}>
                    {ncaaLinks.map((link) => (
                      <li className={styles.seeMoreli} key={link.href}>
                        <Link
                          className={styles.seeMoreLink}
                          href={link.href}
                          onClick={closeMobileMenu}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}

export default Header;
