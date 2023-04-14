import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";

const CFB = () => {
  const [CFBnews, setCFBnews] = useState([]);
  const [CFBnews2, setCFBnews2] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [upcomingSportsOdds, setUpcomingSportsOdds] = useState([]);
  const [finalSportsOdds, setFinalSportsOdds] = useState([]);
  const [inprogressSportsOdds, setInprogressSportsOdds] = useState([]);

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
            "https://sports-odds.herokuapp.com/Odds/college-football"

            // "http://127.0.0.1:5000/Odds/college-football"
          )
          .then((res) => {
            setUpcomingSportsOdds(res.data[0].Upcoming);
            setInprogressSportsOdds(res.data[1].Inprogress);
            setFinalSportsOdds(res.data[2].Final);
          });
      })
      .then(() => {
        axios
          .get(
            "https://sports-odds.herokuapp.com/Sport_News/ncaa-football"
            // "http://127.0.0.1:5000/Sport_News/ncaa-football"
          )
          .then((res) => {
            setCFBnews2(res.data);
          });
      });
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <>
          <p>Data is loading...</p>
        </>
      ) : (
        <>
          <div className={styles.offseason}>
            <p>It is currently the offseason.</p>
          </div>
          <div className={styles.news}>
            <header className="newsHeader">CFB News</header>
            {CFBnews.map((news) => {
              return (
                <div className={styles.newInfo} key={news.headline}>
                  <header>{news.headline}</header>
                  <a href={news.links.web.href}>
                    <img
                      className={styles.Pic}
                      height={325}
                      width={575}
                      alt=""
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
                    <img
                      className={styles.Pic}
                      height={325}
                      width={575}
                      alt=""
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
