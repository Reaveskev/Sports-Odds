import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
// import { useAppContext } from "@/src/GlobalContext";
import WhistleLoader from "@/src/Loading";
import Standings from "@/src/Standings";
import Scoreboard from "@/src/Scoreboard";
import Odds from "@/src/Odds";

function NHL() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [NHLNews, setNHLNews] = useState([]);
  const [NHLNews2, setNHLNews2] = useState([]);
  const [offseason, setoffseason] = useState(false);
  const [upcomingSportsOdds, setUpcomingSportsOdds] = useState([]);
  const [finalSportsOdds, setFinalSportsOdds] = useState([]);
  const [inprogressSportsOdds, setInprogressSportsOdds] = useState([]);
  // const [openBet, setOpenBet] = useState(false);
  const [standings, setStandings] = useState([]);
  const [seeNews, setSeeNews] = useState(true);
  const [seeOdds, setSeeOdds] = useState(false);
  const [seeStandings, setSeeStandings] = useState(false);
  // const { setBetInfo, betInfo } = useAppContext();

  const abbrev = {
    "Boston Bruins": "BOS",
    "Carolina Hurricanes": "CAR",
    "New Jersey Devils": "NJD",
    "Toronto Maple Leafs": "TOR",
    "New York Rangers": "NYR",
    "Tampa Bay Lightning": "TBL",
    "New York Islanders": "NYI",
    "Florida Panthers": "FLA",
    "Pittsburgh Penguins": "PIT",
    "Buffalo Sabres": "BUF",
    "Ottawa Senators": "OTT",
    "Detroit Red Wings": "DET",
    "Washington Capitals": "WSH",
    "Philadelphia Flyers": "PHI",
    "Montreal Canadiens": "MTL",
    "Columbus Blue Jackets": "CBJ",
    "Vegas Golden Knights": "VGK",
    "Edmonton Oilers": "EDM",
    "Colorado Avalanche": "COL",
    "Dallas Stars": "DAL",
    "Los Angeles Kings": "LAK",
    "Minnesota Wild": "MIN",
    "Seattle Kraken": "SEA",
    "Winnipeg Jets": "WPG",
    "Calgary Flames": "CGY",
    "Nashville Predators": "NSH",
    "Vancouver Canucks": "VAN",
    "St. Louis Blues": "STL",
    "Arizona Coyotes": "ARI",
    "San Jose Sharks": "SJS",
    "Chicago Blackhawks": "CHI",
    "Anaheim Ducks": "ANA",
  };

  useEffect(() => {
    async function loadPageData() {
      try {
        const response1 = await axios.get(
          "https://statmilk.bleacherreport.com/api/scores/carousel?league=NHL&team=none&carousel_context=league&tz=-25200&appversion=500.0"
        );
        const response2 = await axios.get(
          "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/news"
        );
        const response3 = await axios.get(
          "https://sports-odds.herokuapp.com/Odds/nhl"
        );
        const response4 = await axios.get(
          "https://sports-odds.herokuapp.com/Sport_News/nhl"
        );
        const response5 = await axios.get(
          "https://sports-odds.herokuapp.com/Sport_Standings/nhl"
        );
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
        setNHLNews(response2.data.articles);
        setUpcomingSportsOdds(response3.data[0].Upcoming);
        setInprogressSportsOdds(response3.data[1].Inprogress);
        setFinalSportsOdds(response3.data[2].Final);
        setNHLNews2(response4.data);
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
                width: offseason ? "100%" : "50%",
                float: offseason ? "none" : "left",
              }}
            >
              <div className={styles.news}>
                <h1 className={styles.upcoming}>NHL News</h1>
                {NHLNews.map((news) => {
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
                {NHLNews2.map((news) => {
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
                sport={"hockey"}
                league={"nhl"}
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
            <h1 className={styles.upcoming}>NHL News</h1>
            {NHLNews.map((news) => {
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
            {NHLNews2.map((news) => {
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
            sport={"hockey"}
            league={"nhl"}
          />
        ) : null}

        {seeStandings ? <Standings standings={standings} /> : null}
      </div>
    </div>
  );
}

export default NHL;
