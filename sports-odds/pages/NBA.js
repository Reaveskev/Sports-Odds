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
  const [upcomingSportsOdds, setUpcomingSportsOdds] = useState([]);
  const [finalSportsOdds, setFinalSportsOdds] = useState([]);
  const [inprogressSportsOdds, setInprogressSportsOdds] = useState([]);
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
    async function loadPageData() {
      try {
        const [response1, response2, response3, response4, response5] =
          await Promise.all([
            axios.get(
              "https://statmilk.bleacherreport.com/api/scores/carousel?league=NBA&team=none&carousel_context=league&tz=-25200&appversion=500.0"
            ),
            axios.get(
              "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news"
            ),
            axios.get("https://sports-odds.herokuapp.com/Odds/nba"),
            axios.get("https://sports-odds.herokuapp.com/Sport_News/nba"),
            axios.get("https://sports-odds.herokuapp.com/Sport_Standings/nba"),
            // axios.get("http://127.0.0.1:5000/Odds/nba"),
            // axios.get("http://127.0.0.1:5000/Sport_News/nba"),
            // axios.get("http://127.0.0.1:5000/Sport_Standings/nba"),
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

        setNBANews(response2.data.articles);

        setUpcomingSportsOdds(response3.data[0].Upcoming);
        setInprogressSportsOdds(response3.data[1].Inprogress);
        setFinalSportsOdds(response3.data[2].Final);

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
                <h1 className={styles.upcoming}>NBA News</h1>
                {NBANews.map((news) => {
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

                {NBANews2.map((news) => {
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
                sport={"basketball"}
                league={"nba"}
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
          <div className={styles.new_div}>
            <div className={styles.news}>
              <h1 className={styles.upcoming}>NBA News</h1>
              {NBANews.map((news) => {
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

              {NBANews2.map((news) => {
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
        ) : null}

        {seeOdds ? (
          <Odds
            inprogressSportsOdds={inprogressSportsOdds}
            finalSportsOdds={finalSportsOdds}
            upcomingSportsOdds={upcomingSportsOdds}
            abbrev={abbrev}
            sport={"basketball"}
            league={"nba"}
          />
        ) : null}

        {seeStandings ? <Standings standings={standings} /> : null}
      </div>
    </div>
  );
}

export default NBA;
