import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";

const MCBB = () => {
  const [MCBBnews, setMCBBnews] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    axios
      .get(
        "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/news"
      )
      .then((res) => {
        setMCBBnews(res.data.articles);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.offseason}>
        <p>It is currently the offseason.</p>
      </div>
      {loading ? (
        <>
          <p>Data is loading...</p>
        </>
      ) : (
        <>
          <div className={styles.news}>
            <header className="newsHeader">MCBB News</header>
            {MCBBnews.map((news) => {
              return (
                <div className={styles.newInfo} key={news.headline}>
                  <header>{news.headline}</header>
                  <a href={news.links.web.href}>
                    <img
                      className={styles.Pic}
                      alt="randomnews"
                      src={news.images[0].url}
                    ></img>
                  </a>
                  <p>{news.description}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MCBB;
