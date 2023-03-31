import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import Image from "next/image";

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
            <header className="newsHeader">WCBB News</header>
            {WCBBnews.map((news) => {
              return (
                <div className={styles.newInfo} key={news.headline}>
                  <header>{news.headline}</header>
                  <a href={news.links.web.href}>
                    <Image
                      className={styles.Pic}
                      alt={news.links.web.href}
                      src={news.images[0].url}
                    />
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

export default WCBB;
