import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import Image from "next/image";

const CFB = () => {
  const [CFBnews, setCFBnews] = useState([]);
  const [CFBnews2, setCFBnews2] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    axios
      .get(
        "https://site.api.espn.com/apis/site/v2/sports/football/college-football/news"
      )
      .then((res) => {
        setCFBnews(res.data.articles);
        setLoading(false);
      })
      .then(() => {
        axios
          .get(
            "https://sports-odds.herokuapp.com/CFB_NEWS"
            // ||
            // "http://127.0.0.1:5000/CFB_NEWS"
          )
          .then((res) => {
            setCFBnews2(res.data);
          });
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
            {CFBnews2.map((news) => {
              return (
                <div className={styles.newInfo} key={news.headline}>
                  <header>{news.headline}</header>
                  <a href={news.links}>
                    <Image
                      className={styles.Pic}
                      alt={news.links}
                      src={news.image}
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

export default CFB;
