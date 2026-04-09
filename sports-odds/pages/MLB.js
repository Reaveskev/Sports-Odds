import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import WhistleLoader from "@/src/Loading";
import Scoreboard from "@/src/Scoreboard";
import Standings from "@/src/Standings";

function MLB() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [MLBNews, setMLBNews] = useState([]);
  const [MLBNews2, setMLBNews2] = useState([]);
  const [offseason, setoffseason] = useState(false);
  const [standings, setStandings] = useState([]);
  const [seeNews, setSeeNews] = useState(true);
  const [seeStandings, setSeeStandings] = useState(false);

  const abbrev = {
    "Arizona Diamondbacks": "ARI",
    "Atlanta Braves": "ATL",
    "Baltimore Orioles": "BAL",
    "Boston Red Sox": "BOS",
    "Chicago Cubs": "CHC",
    "Chicago White Sox": "CHW",
    "Cincinnati Reds": "CIN",
    "Cleveland Indians": "CLE",
    "Colorado Rockies": "COL",
    "Detroit Tigers": "DET",
    "Florida Marlins": "FLA",
    "Houston Astros": "HOU",
    "Kansas City Royals": "KAN",
    "Los Angeles Angels": "LAA",
    "Los Angeles Dodgers": "LAD",
    "Milwaukee Brewers": "MIL",
    "Minnesota Twins": "MIN",
    "New York Mets": "NYM",
    "New York Yankees": "NYY",
    "Oakland Athletics": "OAK",
    "Philadelphia Phillies": "PHI",
    "Pittsburgh Pirates": "PIT",
    "San Diego Padres": "SD",
    "San Francisco Giants": "SF",
    "Seattle Mariners": "SEA",
    "St. Louis Cardinals": "STL",
    "Tampa Bay Rays": "TB",
    "Texas Rangers": "TEX",
    "Toronto Blue Jays": "TOR",
    "Washington Nationals": "WAS",
  };

  useEffect(() => {
    const upcomingGameArr = [];
    const inProgressGameArr = [];
    const completedGameArr = [];

    async function loadPageData() {
      try {
        const [response1, response2, response4, response5] = await Promise.all([
          axios.get(
            "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",
          ),
          axios.get(
            "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news",
          ),
          // axios.get("https://sports-odds.herokuapp.com/api/Sport_News/mlb"),
          // axios.get(
          //   "https://sports-odds.herokuapp.com/api/Sport_Standings/mlb",
          // ),
          axios.get("http://127.0.0.1:5000/api/Sport_News/mlb"),
          axios.get("http://127.0.0.1:5000/api/Sport_Standings/mlb"),
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

        setMLBNews(response2.data.articles);
        setMLBNews2(response4.data);
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
          <div style={offseason ? { justifyContent: "center" } : null}>
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
          <div className={styles.test}>
            {offseason ? null : <Standings standings={standings} />}
          </div>
          <div className={styles.test}>
            <div
              className={styles.new_div}
              style={{
                width: offseason ? "100%" : "50%",
                float: offseason ? "none" : "left",
              }}
            >
              <div className={styles.news}>
                <h1 className={styles.upcoming}>MLB News</h1>
                {MLBNews.map((news) => {
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
                {MLBNews2.map((news) => {
                  return (
                    <div className={styles.newInfo} key={news.headline}>
                      <a href={news.links} className={styles.new_a}>
                        <img
                          className={styles.Pic}
                          height={325}
                          alt=""
                          src={news.image}
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
                style={{ backgroundColor: "222223" }}
                onClick={() => {
                  setSeeNews(false);
                  setSeeStandings(false);
                }}
              >
                Odds
              </button>
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
          <div className={styles.news}>
            <h1 className={styles.upcoming}>MLB News</h1>
            {MLBNews.map((news) => {
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
            {MLBNews2.map((news) => {
              return (
                <div className={styles.newInfo} key={news.headline}>
                  <a href={news.links} className={styles.new_a}>
                    <img
                      className={styles.Pic}
                      height={325}
                      alt=""
                      src={news.image}
                    />
                  </a>
                  <header style={{ fontSize: 22 }}>{news.headline}</header>
                  <p>{news.description}</p>
                </div>
              );
            })}
          </div>
        ) : null}

        {seeStandings ? <Standings standings={standings} /> : null}
      </div>
    </div>
  );
}

export default MLB;
