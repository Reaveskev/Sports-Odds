import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import Odds from "@/src/Odds";
import Standings from "@/src/Standings";
// import { useAppContext } from "@/src/GlobalContext";
import Scoreboard from "@/src/Scoreboard";
import WhistleLoader from "@/src/Loading";

function WNBA() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [WNBANews, setWNBANews] = useState([]);
  const [offseason, setoffseason] = useState(false);
  const [upcomingSportsOdds, setUpcomingSportsOdds] = useState([]);
  const [finalSportsOdds, setFinalSportsOdds] = useState([]);
  const [standings, setStandings] = useState([]);
  const [inprogressSportsOdds, setInprogressSportsOdds] = useState([]);
  // const [openBet, setOpenBet] = useState(false);
  const [seeNews, setSeeNews] = useState(true);
  const [seeOdds, setSeeOdds] = useState(false);
  const [seeStandings, setSeeStandings] = useState(false);
  // const { setBetInfo, betInfo } = useAppContext();

  useEffect(() => {
    async function loadPageData() {
      try {
        const [response1, response2, response3, response4] = await Promise.all([
          axios.get(
            "https://statmilk.bleacherreport.com/api/scores/carousel?league=WNBA&team=none&carousel_context=league&tz=-25200&appversion=500.0"
          ),
          axios.get(
            "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/news"
          ),
          axios.get("https://sports-odds.herokuapp.com/api/Odds/wnba"),
          axios.get(
            "https://sports-odds.herokuapp.com/api/Sport_Standings/wnba"
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

        setWNBANews(response2.data.articles);

        setUpcomingSportsOdds(response3.data[0].Upcoming);
        setInprogressSportsOdds(response3.data[1].Inprogress);
        setFinalSportsOdds(response3.data[2].Final);
        setStandings(response4.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadPageData();
  }, []);

  const abbrev = {
    "Atlanta Dream": "Atl",
    "Dallas Wings": "Dal",
    "Chicago Sky": "Chi",
    "Connecticut Sun": "Con",
    "Indiana Fever": "Ind",
    "New York Liberty": "NY",
    "Washington Mystics": "Wsh",
    "Las Vegas Aces": "LV",
    "Los Angeles Sparks": "LA",
    "Minnesota Lynx": "Min",
    "Phoenix Mercury": "Phx",
    "Seattle Storms": "Sea",
  };

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
              style={{
                width: offseason ? "100%" : "60%",
                float: offseason ? "none" : "left",
              }}
            >
              <div className={styles.news}>
                <h1 className={styles.upcoming}>WNBA News</h1>
                {WNBANews.map((news) => {
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
                league={"wnba"}
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
            <h1 className={styles.upcoming}>WNBA News</h1>
            {WNBANews.map((news) => {
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
          </div>
        ) : null}

        {seeOdds ? (
          <Odds
            inprogressSportsOdds={inprogressSportsOdds}
            finalSportsOdds={finalSportsOdds}
            upcomingSportsOdds={upcomingSportsOdds}
            abbrev={abbrev}
            sport={"basketball"}
            league={"wnba"}
          />
        ) : null}

        {seeStandings ? <Standings standings={standings} /> : null}
      </div>
    </div>
  );
}

export default WNBA;
