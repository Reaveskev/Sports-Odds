import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import WhistleLoader from "@/src/Loading";

const WCBB = () => {
  const [WCBBnews, setWCBBnews] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    axios
      .get(
        "https://site.api.espn.com/apis/site/v2/sports/basketball/womens-college-basketball/news"
      )
      .then((res) => {
        setWCBBnews(res.data.articles);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <>
          <WhistleLoader />
        </>
      ) : (
        <>
          <div className={styles.offseason}>
            <p>It is currently the offseason.</p>
          </div>
          <div className={styles.test}>
            <div className={styles.news}>
              <h1 className={styles.upcoming}>WCBB News</h1>
              {WCBBnews.map((news) => {
                return (
                  <div className={styles.newInfo} key={news.headline}>
                    <a href={news.links.web.href} className={styles.new_a}>
                      <img
                        className={styles.Pic}
                        height={325}
                        alt=""
                        src={news.images[0].url}
                      />
                    </a>
                    <header style={{ fontSize: 22 }}>{news.headline}</header>
                    <p>{news.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {/* Mobile display */}
      <div className={styles.mobile_sports}>
        <div className={styles.new_div}>
          <div className={styles.news}>
            <h1 className={styles.upcoming}>WCBB News</h1>
            {WCBBnews.map((news) => {
              return (
                <div className={styles.newInfo} key={news.headline}>
                  <a href={news.links.web.href} className={styles.new_a}>
                    <img
                      className={styles.Pic}
                      height={325}
                      alt=""
                      src={news.images[0].url}
                    />
                  </a>
                  <header style={{ fontSize: 22 }}>{news.headline}</header>
                  <p>{news.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WCBB;
