import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import Odds from "@/src/Odds";
// import { useAppContext } from "@/src/GlobalContext";
import WhistleLoader from "@/src/Loading";
import Standings from "@/src/Standings";
import Scoreboard from "@/src/Scoreboard";

function NFL() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [NFLNews, setNFLNews] = useState([]);
  const [NFLNews2, setNFLNews2] = useState([]);
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
    "Arizona Cardinals": "ARI",
    "Atlanta Falcons": "ATL",
    "Baltimore Ravens": "BAL",
    "Buffalo Bills": "BUF",
    "Carolina Panthers": "CAR",
    "Chicago Bears": "CHI",
    "Cincinnati Bengals": "CIN",
    "Cleveland Browns": "CLE",
    "Dallas Cowboys": "DAL",
    "Denver Broncos": "DEN",
    "Detroit Lions": "DET",
    "Green Bay Packers": "GB",
    " Houston Texans": "HOU",
    "Indianapolis Colts": "IND",
    "Jacksonville Jaguars": "JAX",
    "Kansas City Chiefs": "KC",
    "Las Vegas Raiders": "LV",
    "Los Angeles Chargers": "LAC",
    "Los Angeles Rams": "LAR",
    "Miami Dolphins": "MIA",
    "Minnesota Vikings": "MIN",
    "New England Patriots": "NE",
    "New Orleans Saints": "NO",
    "New York Giants": "NYG",
    "New York Jets": "NYJ",
    "Philadelphia Eagles": "PHI",
    "Pittsburgh Steelers": "PIT",
    "San Francisco 49ers": "SF",
    "Seattle Seahawks": "SEA",
    "Tampa Bay Buccaneers": "TB",
    "Tennessee Titans": "TEN",
    "Washington Commanders": "WAS",
  };

  useEffect(() => {
    async function loadPageData() {
      try {
        const [response1, response2, response3, response4, response5] =
          await Promise.all([
            axios.get(
              "https://statmilk.bleacherreport.com/api/scores/carousel?league=NFL&team=none&carousel_context=league&tz=-25200&appversion=500.0"
            ),
            axios.get(
              "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news"
            ),
            axios.get("https://sports-odds.herokuapp.com/api/Odds/nfl"),
            axios.get("https://sports-odds.herokuapp.com/api/Sport_News/nfl"),
            axios.get(
              "https://sports-odds.herokuapp.com/api/Sport_Standings/nfl"
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

        setNFLNews(response2.data.articles);

        setUpcomingSportsOdds(response3.data[0].Upcoming);
        setInprogressSportsOdds(response3.data[1].Inprogress);
        setFinalSportsOdds(response3.data[2].Final);

        setNFLNews2(response4.data);
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
        <>
          <WhistleLoader />
        </>
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
                width: offseason ? "100%" : "60%",
                float: offseason ? "none" : "left",
              }}
            >
              <div className={styles.news}>
                <h1 className={styles.upcoming}>NFL News</h1>
                {NFLNews.map((news) => {
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

                {NFLNews2.map((news) => {
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
            </div>
          </div>
          {offseason ? null : (
            <div className={styles.test}>
              <Odds
                inprogressSportsOdds={inprogressSportsOdds}
                finalSportsOdds={finalSportsOdds}
                upcomingSportsOdds={upcomingSportsOdds}
                abbrev={abbrev}
                sport={"football"}
                league={"nfl"}
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
            <h1 className={styles.upcoming}>NFL News</h1>
            {NFLNews.map((news) => {
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

            {NFLNews2.map((news) => {
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
        ) : null}

        {seeOdds ? (
          <Odds
            inprogressSportsOdds={inprogressSportsOdds}
            finalSportsOdds={finalSportsOdds}
            upcomingSportsOdds={upcomingSportsOdds}
            abbrev={abbrev}
            sport={"football"}
            league={"nfl"}
          />
        ) : null}

        {seeStandings ? <Standings standings={standings} /> : null}
      </div>
    </div>
  );
}

export default NFL;
