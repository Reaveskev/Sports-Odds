import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";

const CFB = () => {
  const [CFBnews, setCFBnews] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    axios
      .get(
        "http://site.api.espn.com/apis/site/v2/sports/football/college-football/news"
      )
      .then((res) => {
        setCFBnews(res.data.articles);
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
            <header className="newsHeader">CFB News</header>
            {CFBnews.map((news) => {
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

export default CFB;
