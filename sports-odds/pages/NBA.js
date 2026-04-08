import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
// import { useAppContext } from "@/src/GlobalContext";
import WhistleLoader from "@/src/Loading";
import Scoreboard from "@/src/Scoreboard";
import Standings from "@/src/Standings";
import Odds from "@/src/Odds";

function NBA() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [NBANews, setNBANews] = useState([]);
  const [NBANews2, setNBANews2] = useState([]);
  const [offseason, setoffseason] = useState(false);
  // const [upcomingSportsOdds, setUpcomingSportsOdds] = useState([]);
  // const [finalSportsOdds, setFinalSportsOdds] = useState([]);
  // const [inprogressSportsOdds, setInprogressSportsOdds] = useState([]);
  const [standings, setStandings] = useState([]);
  const [seeNews, setSeeNews] = useState(true);
  const [seeOdds, setSeeOdds] = useState(false);
  const [seeStandings, setSeeStandings] = useState(false);

  // const { setBetInfo, betInfo } = useAppContext();
  const abbrev = {
    "Milwaukee Bucks": "MIL",
    "Utah Jazz": "UTAH",
    "Boston Celtics": "BOS",
    "Chicago Bulls": "CHI",
    "Detroit Pistons": "DET",
    "Indiana Pacers": "IND",
    "Los Angeles Lakers": "LAL",
    "Miami Heat": "MIA",
    "New York Knicks": "NY",
    "Oklahoma City Thunder": "OKC",
    "Orlando Magic": "ORL",
    "Toronto Raptors": "TOR",
    "Atlanta Hawks": "ATL",
    "Brooklyn Nets": "BKN",
    "Charlotte Hornets": "CHA",
    "Cleveland Cavaliers": "CLE",
    "Denver Nuggets": "DEN",
    "Golden State Warriors": "GS",
    "Minnesota Timberwolves": "MIN",
    "New Orleans Pelicans": "NO",
    "Phoenix Suns": "PHX",
    "Portland Trail Blazers": "POR",
    "Sacramento Kings": "SAC",
    "Washington Wizard": "WSH",
    "Dallas Mavericks": "DAL",
    "Houston Rockets": "HOU",
    "Memphis Grizzlies": "MEM",
    "Philadelphia 76ers": "PHI",
    "San Antonio Spurs": "SA",
    "LA Clippers": "LAC",
  };

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
          // axios.get("https://sports-odds.herokuapp.com/api/Odds/nba"),
          // axios.get("https://sports-odds.herokuapp.com/api/Sport_News/nba"),
          // axios.get(
          //   "https://sports-odds.herokuapp.com/api/Sport_Standings/nba"
          // ),
          // axios.get("http://127.0.0.1:5000/api/Odds/nba"),
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
        setNBANews(response2.data.articles);

        setNBANews2(response4.data);
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
                <h1 className={styles.upcoming}>NBA News</h1>
                {NBANews.map((news) => {
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

                {NBANews2.map((news) => {
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

          {/* {offseason ? null : (
            <div className={styles.test}>
              <Odds
                inprogressSportsOdds={inprogressSportsOdds}
                finalSportsOdds={finalSportsOdds}
                upcomingSportsOdds={upcomingSportsOdds}
                abbrev={abbrev}
                sport={"basketball"}
                league={"nba"}
              />
            </div>
          )} */}
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
              setSeeOdds(false);
              setSeeStandings(false);
            }}
          >
            News
          </button>
          {offseason ? null : (
            <>
              <button
                className={styles.mobile_tab}
                style={{ backgroundColor: seeOdds ? "181818" : "222223" }}
                onClick={() => {
                  setSeeNews(false);
                  setSeeOdds(true);
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
                  setSeeOdds(false);
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
              <h1 className={styles.upcoming}>NBA News</h1>
              {NBANews.map((news) => {
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

              {NBANews2.map((news) => {
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
        ) : null}

        {/* {seeOdds ? (
          <Odds
            inprogressSportsOdds={inprogressSportsOdds}
            finalSportsOdds={finalSportsOdds}
            upcomingSportsOdds={upcomingSportsOdds}
            abbrev={abbrev}
            sport={"basketball"}
            league={"nba"}
          />
        ) : null} */}

        {seeStandings ? <Standings standings={standings} /> : null}
      </div>
    </div>
  );
}

export default NBA;
