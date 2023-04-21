import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import * as AiIcon from "react-icons/Ai";
import { useAppContext } from "@/src/GlobalContext";
import Bet from "../src/Bet";

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
  const [openBet, setOpenBet] = useState(false);
  const { setBetInfo, betInfo } = useAppContext();

  useEffect(() => {
    async function loadPageData() {
      try {
        const [response1, response2, response3, response4] = await Promise.all([
          axios.get(
            "https://statmilk.bleacherreport.com/api/scores/carousel?league=NBA&team=none&carousel_context=league&tz=-25200&appversion=500.0"
          ),
          axios.get(
            "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news"
          ),
          axios.get("https://sports-odds.herokuapp.com/Odds/nba"),
          axios.get("https://sports-odds.herokuapp.com/Sport_News/nba"),
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
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadPageData();

    // axios
    //   .get(
    //     "https://statmilk.bleacherreport.com/api/scores/carousel?league=NBA&team=none&carousel_context=league&tz=-25200&appversion=500.0"
    //   )
    //   .then((res) => {
    //     if (res.data.game_groups[0] === undefined) {
    //       setoffseason(true);
    //     } else if (
    //       res.data.game_groups[0].name === "In Progress" &&
    //       res.data.game_groups[1].name === "Completed"
    //     ) {
    //       setInprogress(res.data.game_groups[0]);
    //       setCompleted(res.data.game_groups[1]);
    //       setUpcoming(res.data.game_groups[2]);
    //     } else if (res.data.game_groups[0].name === "Completed") {
    //       setCompleted(res.data.game_groups[0]);
    //       setUpcoming(res.data.game_groups[1]);
    //     } else if (
    //       res.data.game_groups[0].name === "In Progress" &&
    //       res.data.game_groups[1].name === "Upcoming"
    //     ) {
    //       setInprogress(res.data.game_groups[0]);
    //       setUpcoming(res.data.game_groups[1]);
    //     } else {
    //       setUpcoming(res.data.game_groups[0]);
    //     }
    //   })
    // .then(() => {
    //   axios
    //     .get(
    //       "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news"
    //     )
    //     .then((res) => {
    //       setNBANews(res.data.articles);
    //     });
    // })

    // .then(() => {
    //   axios
    //     .get(
    //       "https://sports-odds.herokuapp.com/Odds/nba"

    //       // "http://127.0.0.1:5000/Odds/nba"
    //     )
    //     .then((res) => {
    //       console.log(res.data);
    //       setUpcomingSportsOdds(res.data[0].Upcoming);
    //       setInprogressSportsOdds(res.data[1].Inprogress);
    //       setFinalSportsOdds(res.data[2].Final);
    //     });
    // })
    // .then(() => {
    //   axios
    //     .get(
    //       "https://sports-odds.herokuapp.com/Sport_News/nba"

    //       // "http://127.0.0.1:5000/Sport_News/nba"
    //     )
    //     .then((res) => {
    //       setNBANews2(res.data);
    //       setLoading(false);
    //     });
    // });
  }, []);

  let game_ids = {};
  let game_over_ids = {};

  return (
    <div>
      <Header />
      {loading ? (
        <>
          <p>Data is loading...</p>
        </>
      ) : (
        <>
          <div
            className={styles.scoreboard}
            style={offseason ? { justifyContent: "center" } : null}
          >
            {offseason ? (
              <div className={styles.offseason}>
                <p>It is currently the offseason.</p>
              </div>
            ) : (
              <>
                {inprogress.games !== undefined ? (
                  <>
                    {inprogress.games.map((games) => {
                      return (
                        <div className={styles.games} key={games.id}>
                          <div className={styles.date}>
                            {games.game_progress.primary}
                          </div>
                          <div className={styles.time}>
                            {games.game_progress.header}
                          </div>
                          <div className={styles.teamContainer}>
                            <div className={styles.logoDiv}>
                              <img
                                alt=""
                                className={styles.logo}
                                src={games.team_one.logo}
                              />
                            </div>
                            <div className={styles.teamName}>
                              {games.team_one.abbrev}
                            </div>
                            <div className={styles.record}>
                              {games.team_one.record}
                            </div>
                            <span>{games.team_one.score}</span>
                          </div>
                          <div className={styles.teamContainer}>
                            <div className={styles.logoDiv}>
                              <img
                                alt=""
                                className={styles.logo}
                                src={games.team_two.logo}
                              />
                            </div>
                            <div className={styles.teamName}>
                              {games.team_two.abbrev}
                            </div>
                            <div className={styles.record}>
                              {games.team_two.record}
                            </div>
                            <span>{games.team_two.score}</span>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : null}
                {completed.games !== undefined ? (
                  <>
                    {completed.games.map((games) => {
                      let teams = [games.team_one.name, games.team_two.name];
                      let id = games.id;
                      game_over_ids[id] = teams;
                      return (
                        <div className={styles.games} key={games.id}>
                          <div className={styles.date}>
                            {games.game_progress.primary}
                          </div>
                          <div className={styles.time}>
                            {games.game_progress.header}
                          </div>
                          <div className={styles.teamContainer}>
                            <div className={styles.logoDiv}>
                              <img
                                alt=""
                                className={styles.logo}
                                src={games.team_one.logo}
                              />
                            </div>
                            <div className={styles.teamName}>
                              {games.team_one.abbrev}
                            </div>
                            <div className={styles.record}>
                              {games.team_one.record}
                            </div>
                            <span>{games.team_one.score}</span>
                          </div>
                          <div className={styles.teamContainer}>
                            <div className={styles.logoDiv}>
                              <img
                                alt=""
                                className={styles.logo}
                                src={games.team_two.logo}
                              />
                            </div>
                            <div className={styles.teamName}>
                              {games.team_two.abbrev}
                            </div>
                            <div className={styles.record}>
                              {games.team_two.record}
                            </div>
                            <span>{games.team_two.score}</span>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : null}
                {upcoming.games !== undefined ? (
                  <>
                    {upcoming.games.map((games) => {
                      let teams = [games.team_one.name, games.team_two.name];
                      let id = games.id;
                      game_ids[id] = teams;
                      return (
                        <div className={styles.games} key={games.id}>
                          <div className={styles.date}>
                            {games.game_progress.primary}
                          </div>
                          <div className={styles.time}>
                            {games.game_progress.header}
                          </div>
                          <div className={styles.teamContainer}>
                            <div className={styles.logoDiv}>
                              <img
                                alt=""
                                className={styles.logo}
                                src={games.team_one.logo}
                              />
                            </div>
                            <div className={styles.teamName}>
                              {games.team_one.abbrev}
                            </div>
                            <div className={styles.record}>
                              {games.team_one.record}
                            </div>
                            <span>{games.team_one.score}</span>
                          </div>
                          <div className={styles.teamContainer}>
                            <div className={styles.logoDiv}>
                              <img
                                alt=""
                                className={styles.logo}
                                src={games.team_two.logo}
                              />
                            </div>
                            <div className={styles.teamName}>
                              {games.team_two.abbrev}
                            </div>
                            <div className={styles.record}>
                              {games.team_two.record}
                            </div>
                            <span>{games.team_two.score}</span>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : null}
              </>
            )}
          </div>
          <div
            style={{
              width: offseason ? "100%" : "60%",
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
          {offseason ? null : (
            <>
              <div style={{ width: "40%", float: "right" }}>
                <div style={{ marginRight: "20%" }} className={styles.odds_div}>
                  <div className={styles.odds}>
                    {inprogressSportsOdds.length > 0 ? (
                      <>
                        <h1 className={styles.upcoming}>Live Game Odds</h1>
                        {inprogressSportsOdds.map((game) => {
                          return (
                            <>
                              <div className={styles.team_info}>
                                <div className={styles.team_header}>
                                  <div
                                    style={{ minWidth: 40, cursor: "pointer" }}
                                  >
                                    <AiIcon.AiFillPlusCircle
                                      onClick={() => {
                                        setBetInfo([
                                          game.away.logo,
                                          game.away.team,
                                          game.away.score,
                                          game.away.moneyline,
                                          game.away.point_spread,
                                          game.away.total_points,
                                          game.home.logo,
                                          game.home.team,
                                          game.home.score,
                                          game.home.moneyline,
                                          game.home.point_spread,
                                          game.home.total_points,
                                          "nba",
                                          "basketball",
                                        ]);
                                        setOpenBet(!openBet);
                                      }}
                                      color="green"
                                    />
                                  </div>
                                  <p style={{ minWidth: 120 }}>
                                    {game.away.time_left}
                                  </p>
                                  <p style={{ minWidth: 72 }}>Money Line</p>
                                  <p style={{ minWidth: 120 }}>Point Spread</p>
                                  <p style={{ minWidth: 120 }}>Total Points</p>
                                </div>
                                <div className={styles.team_format}>
                                  <div className={styles.name_logo}>
                                    <img
                                      alt=""
                                      className={styles.odds_logo}
                                      src={game.away.logo}
                                    />
                                    <div className={styles.name_record}>
                                      <h4>{game.away.team}</h4>
                                      <span>
                                        Current Score: {game.away.score}
                                      </span>
                                      <span style={{ paddingTop: 5 }}>@</span>
                                    </div>
                                  </div>
                                  <p>{game.away.moneyline}</p>
                                  <p>{game.away.point_spread}</p>
                                  <p>{game.away.total_points}</p>
                                </div>

                                <div className={styles.team_format}>
                                  <div className={styles.name_logo}>
                                    <img
                                      alt=""
                                      className={styles.odds_logo}
                                      src={game.home.logo}
                                    />
                                    <div className={styles.name_record}>
                                      <h4>{game.home.team}</h4>
                                      <span>
                                        Current Score: {game.home.score}
                                      </span>
                                    </div>
                                  </div>
                                  <p>{game.home.moneyline}</p>
                                  <p>{game.home.point_spread}</p>
                                  <p>{game.home.total_points}</p>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    ) : null}
                    {upcomingSportsOdds.length > 0 ? (
                      <>
                        <h1 className={styles.upcoming}>Upcoming Game Odds</h1>
                        {upcomingSportsOdds.map((game) => {
                          return (
                            <>
                              <div className={styles.team_info}>
                                <div className={styles.team_header}>
                                  <div
                                    style={{ minWidth: 40, cursor: "pointer" }}
                                  >
                                    <AiIcon.AiFillPlusCircle
                                      onClick={() => {
                                        setBetInfo([
                                          game.away.logo,
                                          game.away.team,
                                          game.away.record,
                                          game.away.moneyline,
                                          game.away.point_spread,
                                          game.away.total_points,
                                          game.home.logo,
                                          game.home.team,
                                          game.home.record,
                                          game.home.moneyline,
                                          game.home.point_spread,
                                          game.home.start_time,
                                          "nba",
                                          "basketball",
                                        ]);
                                        setOpenBet(!openBet);
                                      }}
                                      color="green"
                                    />
                                  </div>
                                  <p style={{ minWidth: 120 }}>
                                    {game.away.start_time}
                                  </p>
                                  <p style={{ minWidth: 72 }}>Money Line</p>
                                  <p style={{ minWidth: 120 }}>Point Spread</p>
                                  <p style={{ minWidth: 120 }}>Total Points</p>
                                </div>
                                <div className={styles.team_format}>
                                  <div className={styles.name_logo}>
                                    <img
                                      alt=""
                                      className={styles.odds_logo}
                                      src={game.away.logo}
                                    />
                                    <div className={styles.name_record}>
                                      <h4>{game.away.team}</h4>
                                      <span>{game.away.record}</span>
                                      <span style={{ paddingTop: 5 }}>@</span>
                                    </div>
                                  </div>
                                  <p>{game.away.moneyline}</p>
                                  <p>{game.away.point_spread}</p>
                                  <p>{game.away.total_points}</p>
                                </div>

                                <div className={styles.team_format}>
                                  <div className={styles.name_logo}>
                                    <img
                                      alt=""
                                      className={styles.odds_logo}
                                      src={game.home.logo}
                                    />
                                    <div className={styles.name_record}>
                                      <h4>{game.home.team}</h4>
                                      <span>{game.home.record}</span>
                                    </div>
                                  </div>
                                  <p>{game.home.moneyline}</p>
                                  <p>{game.home.point_spread}</p>
                                  <p>{game.home.total_points}</p>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    ) : null}
                    {finalSportsOdds.length > 0 ? (
                      <h1 className={styles.upcoming}>Game Final Odds</h1>
                    ) : null}
                    {finalSportsOdds.map((game) => {
                      return (
                        <>
                          <div className={styles.team_info}>
                            <div className={styles.team_header}>
                              <p style={{ minWidth: 40 }}></p>
                              <p style={{ minWidth: 120 }}>Final</p>
                              <p style={{ minWidth: 72 }}>Money Line</p>
                              <p style={{ minWidth: 120 }}>Point Spread</p>
                              <p style={{ minWidth: 120 }}>Total Points</p>
                            </div>
                            <div className={styles.team_format}>
                              <div className={styles.name_logo}>
                                <img
                                  alt=""
                                  className={styles.odds_logo}
                                  src={game.away.logo}
                                />
                                <div className={styles.name_record}>
                                  <h4>{game.away.team}</h4>
                                  <span>Final Score: {game.away.score}</span>
                                  <span style={{ paddingTop: 5 }}>@</span>
                                </div>
                              </div>
                              {game.away.moneyline.length > 5 ? (
                                <p>
                                  <AiIcon.AiFillCheckCircle
                                    style={{ marginRight: 10 }}
                                    color="green"
                                  />
                                  {game.away.moneyline.slice(5)}
                                </p>
                              ) : (
                                <p>{game.away.moneyline}</p>
                              )}
                              {game.away.point_spread.length > 5 ? (
                                <p>
                                  <AiIcon.AiFillCheckCircle
                                    style={{ marginRight: 10 }}
                                    color="green"
                                  />
                                  {game.away.point_spread.slice(5)}
                                </p>
                              ) : (
                                <p>{game.away.point_spread}</p>
                              )}
                              {game.away.total_points.length > 5 ? (
                                <p>
                                  <AiIcon.AiFillCheckCircle
                                    style={{ marginRight: 10 }}
                                    color="green"
                                  />
                                  {game.away.total_points.slice(5)}
                                </p>
                              ) : (
                                <p>{game.away.total_points}</p>
                              )}
                            </div>

                            <div className={styles.team_format}>
                              <div className={styles.name_logo}>
                                <img
                                  alt=""
                                  className={styles.odds_logo}
                                  src={game.home.logo}
                                />
                                <div className={styles.name_record}>
                                  <h4>{game.home.team}</h4>
                                  <span>Final Score: {game.home.score}</span>
                                </div>
                              </div>
                              {game.home.moneyline.length > 5 ? (
                                <p>
                                  <AiIcon.AiFillCheckCircle
                                    style={{ marginRight: 10 }}
                                    color="green"
                                  />
                                  {game.home.moneyline.slice(5)}
                                </p>
                              ) : (
                                <p>{game.home.moneyline}</p>
                              )}
                              {game.home.point_spread.length > 5 ? (
                                <p>
                                  <AiIcon.AiFillCheckCircle
                                    style={{ marginRight: 10 }}
                                    color="green"
                                  />
                                  {game.home.point_spread.slice(5)}
                                </p>
                              ) : (
                                <p>{game.home.point_spread}</p>
                              )}
                              {game.home.total_points.length > 5 ? (
                                <p>
                                  <AiIcon.AiFillCheckCircle
                                    style={{ marginRight: 10 }}
                                    color="green"
                                  />
                                  {game.home.total_points.slice(5)}
                                </p>
                              ) : (
                                <p>{game.home.total_points}</p>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                    {openBet ? (
                      <Bet
                        openBet={openBet}
                        setOpenBet={setOpenBet}
                        game_ids={game_ids}
                        game_over_ids={game_over_ids}
                        completed={completed}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default NBA;
