import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import WhistleLoader from "@/src/Loading";
// import { useAppContext } from "@/src/GlobalContext";
import Scoreboard from "@/src/Scoreboard";
import Standings from "@/src/Standings";
import Odds from "@/src/Odds";

function MLB() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [MLBNews, setMLBNews] = useState([]);
  const [MLBNews2, setMLBNews2] = useState([]);
  const [offseason, setoffseason] = useState(false);
  const [upcomingSportsOdds, setUpcomingSportsOdds] = useState([]);
  const [finalSportsOdds, setFinalSportsOdds] = useState([]);
  const [inprogressSportsOdds, setInprogressSportsOdds] = useState([]);
  const [standings, setStandings] = useState([]);
  const [seeNews, setSeeNews] = useState(true);
  const [seeOdds, setSeeOdds] = useState(false);
  const [seeStandings, setSeeStandings] = useState(false);
  // const [openBet, setOpenBet] = useState(false);
  // const { setBetInfo, betInfo } = useAppContext();

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
    async function loadPageData() {
      try {
        const [response1, response2, response3, response4, response5] =
          await Promise.all([
            axios.get(
              "https://statmilk.bleacherreport.com/api/scores/carousel?league=MLB&team=none&carousel_context=league&tz=-25200&appversion=500.0"
            ),
            axios.get(
              "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news"
            ),
            axios.get("https://sports-odds.herokuapp.com/api/Odds/mlb"),
            axios.get("https://sports-odds.herokuapp.com/api/Sport_News/mlb"),
            axios.get(
              "https://sports-odds.herokuapp.com/api/Sport_Standings/mlb"
            ),
          ]);

        if (response1.data.game_groups[0] === undefined) {
          setoffseason(true);
        } else if (
          response1.data.game_groups[0].name === "In Progress" &&
          response1.data.game_groups[1].name === "Completed"
        ) {
          setInprogress(response1.data.game_groups[0]);
          setCompleted(response1.data.game_groups[1]);
          setUpcoming(response1.data.game_groups[2]);
        } else if (response1.data.game_groups[0].name === "Completed") {
          setCompleted(response1.data.game_groups[0]);
          setUpcoming(response1.data.game_groups[1]);
        } else if (
          response1.data.game_groups[0].name === "In Progress" &&
          response1.data.game_groups[1].name === "Upcoming"
        ) {
          setInprogress(response1.data.game_groups[0]);
          setUpcoming(response1.data.game_groups[1]);
        } else {
          setUpcoming(response1.data.game_groups[0]);
        }

        setMLBNews(response2.data.articles);

        setUpcomingSportsOdds(response3.data[0].Upcoming);
        setInprogressSportsOdds(response3.data[1].Inprogress);
        setFinalSportsOdds(response3.data[2].Final);

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
          {offseason ? null : (
            <div className={styles.test}>
              <Odds
                inprogressSportsOdds={inprogressSportsOdds}
                finalSportsOdds={finalSportsOdds}
                upcomingSportsOdds={upcomingSportsOdds}
                abbrev={abbrev}
                sport={"baseball"}
                league={"mlb"}
              />
            </div>
          )}
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

        {seeOdds ? (
          <Odds
            inprogressSportsOdds={inprogressSportsOdds}
            finalSportsOdds={finalSportsOdds}
            upcomingSportsOdds={upcomingSportsOdds}
            abbrev={abbrev}
            sport={"baseball"}
            league={"mlb"}
          />
        ) : null}

        {seeStandings ? <Standings standings={standings} /> : null}
      </div>
    </div>
  );
}

export default MLB;
