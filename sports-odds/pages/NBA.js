import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import WhistleLoader from "@/src/Loading";
import Scoreboard from "@/src/Scoreboard";
import Standings from "@/src/Standings";
import NewsCard from "@/src/NewsCard";

function NBA() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [NBANews, setNBANews] = useState([]);
  const [offseason, setoffseason] = useState(false);
  const [standings, setStandings] = useState([]);
  const [seeNews, setSeeNews] = useState(true);
  const [seeStandings, setSeeStandings] = useState(false);

  useEffect(() => {
    const upcomingGameArr = [];
    const inProgressGameArr = [];
    const completedGameArr = [];

    async function loadPageData() {
      try {
        const [response1, response2, response4, response5] = await Promise.all([
          axios.get(
            "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
          ),
          axios.get(
            "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news",
          ),

          // axios.get("https://sports-odds.herokuapp.com/api/Sport_News/nba"),
          // axios.get(
          //   "https://sports-odds.herokuapp.com/api/Sport_Standings/nba"
          // ),
          axios.get("http://127.0.0.1:5000/api/Sport_News/nba"),
          axios.get("http://127.0.0.1:5000/api/Sport_Standings/nba"),
        ]);

        for (let i = 0; i < response1.data.events.length; i++) {
          let event = response1.data.events[i];
          let competition = event.competitions[0];
          let competitors = competition.competitors;
          const home = competitors[0];
          const away = competitors[1];
          let status = event.status;

          const game = {
            id: event.id,
            team_one: {
              name: home.team.name,
              logo: home.team.logo || "",
              score: home.score,
              record: home.records[0].summary || "",
              abbrev: home.team.abbreviation,
            },
            team_two: {
              name: away.team.name,
              logo: away.team.logo,
              score: away.score,
              record: away.records[0].summary || "",
              abbrev: away.team.abbreviation,
            },

            game_progress: {
              detail: status.type.detail,
              description: status.type.description,
              completed: status.type.completed,
              period: status.period,
              clock: status.displayClock,
              status: status.type.state,
            },
            shortName: event.shortName,
            odds: competition.odds ? competition.odds[0].details : null,
          };

          if (status.type.state === "pre") {
            upcomingGameArr.push(game);
          } else if (status.type.state === "in") {
            inProgressGameArr.push(game);
          } else if (status.type.state === "post") {
            completedGameArr.push(game);
          }
        }

        setUpcoming(upcomingGameArr);
        setInprogress(inProgressGameArr);
        setCompleted(completedGameArr);

        const espnNews = response2.data.articles.map((news) => ({
          headline: news.headline,
          description: news.description,
          image: news.images?.[0]?.url || "",
          links: news.links?.web?.href || "#",
        }));

        const customNews = response4.data;

        const combinedNews = [...espnNews, ...customNews];

        setNBANews(combinedNews);

        setStandings(response5.data);

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
        <div style={{ height: "100vh", important: true }}>
          <WhistleLoader />
        </div>
      ) : (
        <>
          <div>
            {offseason ? (
              <div className={styles.offseason}>
                <p>It is currently the offseason.</p>
              </div>
            ) : (
              <Scoreboard
                inprogress={inprogress}
                upcoming={upcoming}
                completed={completed}
              />
            )}
          </div>
          <div className={styles.mainContent}>
            {!offseason && (
              <div className={styles.leftColumn}>
                <Standings standings={standings} />
              </div>
            )}

            <div className={styles.rightColumn}>
              <div className={styles.news}>
                <h1 className={styles.sectionTitle}>NBA News</h1>
                {NBANews.map((news) => (
                  <NewsCard key={news.headline} news={news} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {/* Mobile display */}
      <div className={styles.mobile_sports}>
        <div className={styles.buttons_div}>
          <button
            className={styles.mobile_tab}
            style={{ backgroundColor: seeNews ? "181818" : "222223" }}
            onClick={() => {
              setSeeNews(true);
              setSeeStandings(false);
            }}
          >
            News
          </button>
          {offseason ? null : (
            <>
              <button
                className={styles.mobile_tab}
                style={{ backgroundColor: seeStandings ? "181818" : "222223" }}
                onClick={() => {
                  setSeeNews(false);
                  setSeeStandings(true);
                }}
              >
                Standings
              </button>
            </>
          )}
        </div>
        {seeNews ? (
          <div className={styles.new_div}>
            <div className={styles.news}>
              <h1 className={styles.sectionTitle}>NBA News</h1>
              {NBANews.map((news) => (
                <NewsCard key={news.headline} news={news} />
              ))}
            </div>
          </div>
        ) : null}
        {seeStandings ? <Standings standings={standings} /> : null}
      </div>
    </div>
  );
}

export default NBA;

// 2.4
