import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import WhistleLoader from "@/src/Loading";

const CFB = () => {
  const [CFBnews, setCFBnews] = useState([]);
  const [CFBnews2, setCFBnews2] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [upcomingSportsOdds, setUpcomingSportsOdds] = useState([]);
  const [finalSportsOdds, setFinalSportsOdds] = useState([]);
  const [inprogressSportsOdds, setInprogressSportsOdds] = useState([]);

  useEffect(() => {
    async function loadPageData() {
      try {
        const response1 = await axios.get(
          "https://site.api.espn.com/apis/site/v2/sports/football/college-football/news"
        );
        const response2 = await axios.get(
          "https://sports-odds.herokuapp.com/Odds/college-football"
        );
        const response3 = await axios.get(
          "https://sports-odds.herokuapp.com/Sport_News/ncaa-football"
        );

        setCFBnews(response1.data.articles);

        setUpcomingSportsOdds(response2.data[0].Upcoming);
        setInprogressSportsOdds(response2.data[1].Inprogress);
        setFinalSportsOdds(response2.data[2].Final);
        setCFBnews2(response3.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadPageData();
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
          <div className={styles.news}>
            <h1 className={styles.upcoming}>CFB News</h1>
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
