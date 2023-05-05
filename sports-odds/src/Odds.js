import React, { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import * as AiIcon from "react-icons/Ai";
import { useAppContext } from "./GlobalContext";
import Bet from "./Bet";

const Odds = ({
  inprogressSportsOdds,
  finalSportsOdds,
  upcomingSportsOdds,
  featuredSportsOdds,
  abbrev,
  sport,
  league,
}) => {
  const [openBet, setOpenBet] = useState(false);
  const { setBetInfo } = useAppContext();

  const findAbbrv = (abbrev, away_team, home_team) => {
    let away_abbrv = "";
    let home_abbrv = "";
    for (const [team, abbrv] of Object.entries(abbrev)) {
      if (away_team === team) {
        away_abbrv = abbrv;
      }
      if (home_team === team) {
        home_abbrv = abbrv;
      }
      if (away_abbrv && home_abbrv) {
        break;
      }
    }

    return [away_abbrv, home_abbrv];
  };

  return (
    <div
      className={styles.odds_container}
      style={{
        width: featuredSportsOdds ? "auto" : "25%",
        paddingRight: featuredSportsOdds ? 0 : "5%",
      }}
    >
      <div className={styles.odds_div}>
        <div className={styles.odds}>
          {featuredSportsOdds ? (
            <>
              <h1 className={styles.upcoming}>Featured Game Odds</h1>
              <div className={styles.featured_odds}>
                {featuredSportsOdds.map((game) => {
                  return (
                    <>
                      <div className={styles.featured_info}>
                        <span>{game.home.title}</span>
                        <div className={styles.team_header}>
                          <p
                            style={{
                              minWidth: 35,
                            }}
                          ></p>
                          <p
                            style={{
                              minWidth: 90,
                              fontSize: 10,
                              paddingRight: 15,
                              paddingLeft: 10,
                            }}
                          >
                            {game.away.time_left}
                          </p>
                          <p style={{ minWidth: 45 }}>Money</p>
                          <p style={{ minWidth: 75 }}>Spread</p>
                          <p style={{ minWidth: 90 }}>Total</p>
                        </div>
                        <div className={styles.team_format}>
                          <div className={styles.name_logo}>
                            <img
                              alt=""
                              className={styles.odds_logo}
                              src={game.away.logo}
                            />
                            <h4>{game.away.team}</h4>
                            <div className={styles.name_record}>
                              <span
                                style={{
                                  paddingLeft: 5,
                                }}
                              >
                                {game.away.score}
                              </span>
                            </div>
                          </div>
                          <p style={{ minWidth: 45 }}>{game.away.moneyline}</p>
                          <p
                            style={{
                              minWidth: 70,
                              paddingRight: 15,
                              paddingLeft: 10,
                            }}
                          >
                            {game.away.point_spread}
                          </p>
                          <p style={{ minWidth: 93 }}>
                            {game.away.total_points}
                          </p>
                        </div>

                        <div className={styles.team_format}>
                          <div className={styles.name_logo}>
                            <img
                              alt=""
                              className={styles.odds_logo}
                              src={game.home.logo}
                            />
                            <h4>{game.home.team}</h4>
                            <div className={styles.name_record}>
                              <span
                                style={{
                                  paddingLeft: 5,
                                }}
                              >
                                {game.home.score}
                              </span>
                            </div>
                          </div>
                          <p style={{ minWidth: 45 }}>{game.home.moneyline}</p>
                          <p
                            style={{
                              minWidth: 70,
                              paddingRight: 15,
                              paddingLeft: 10,
                            }}
                          >
                            {game.home.point_spread}
                          </p>
                          <p style={{ minWidth: 93 }}>
                            {game.home.total_points}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : null}

          {inprogressSportsOdds ? (
            <>
              <h1 className={styles.upcoming}>Live Game Odds</h1>
              {inprogressSportsOdds.map((game) => {
                let home_team = game.home.team;
                let away_team = game.away.team;
                [away_team, home_team] = findAbbrv(
                  abbrev,
                  away_team,
                  home_team
                );
                return (
                  <>
                    <div className={styles.team_info}>
                      <div className={styles.team_header}>
                        <div style={{ minWidth: 30, cursor: "pointer" }}>
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
                                league,
                                sport,
                              ]);
                              setOpenBet(!openBet);
                            }}
                            color="green"
                          />
                        </div>
                        <p
                          style={{
                            minWidth: "auto",
                            fontSize: 10,
                            paddingRight: 15,
                            paddingLeft: 10,
                          }}
                        >
                          {game.away.time_left}
                        </p>
                        <p style={{ minWidth: 45 }}>Money</p>
                        <p style={{ minWidth: 75 }}>Spread</p>
                        <p style={{ minWidth: 90 }}>Total</p>
                      </div>
                      <div className={styles.team_format}>
                        <div className={styles.name_logo}>
                          <img
                            alt=""
                            className={styles.odds_logo}
                            src={game.away.logo}
                          />
                          <h4>{away_team}</h4>
                          <div className={styles.name_record}>
                            <span
                              style={{
                                paddingLeft: 5,
                              }}
                            >
                              {game.away.score}
                            </span>
                          </div>
                        </div>
                        <p style={{ minWidth: 45 }}>{game.away.moneyline}</p>
                        <p
                          style={{
                            minWidth: 70,
                            paddingRight: 15,
                            paddingLeft: 10,
                          }}
                        >
                          {game.away.point_spread}
                        </p>
                        <p style={{ minWidth: 93 }}>{game.away.total_points}</p>
                      </div>

                      <div className={styles.team_format}>
                        <div className={styles.name_logo}>
                          <img
                            alt=""
                            className={styles.odds_logo}
                            src={game.home.logo}
                          />
                          <h4>{home_team}</h4>
                          <div className={styles.name_record}>
                            <span
                              style={{
                                paddingLeft: 5,
                              }}
                            >
                              {game.home.score}
                            </span>
                          </div>
                        </div>
                        <p style={{ minWidth: 45 }}>{game.home.moneyline}</p>
                        <p
                          style={{
                            minWidth: 70,
                            paddingRight: 15,
                            paddingLeft: 10,
                          }}
                        >
                          {game.home.point_spread}
                        </p>
                        <p style={{ minWidth: 93 }}>{game.home.total_points}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : null}
          {upcomingSportsOdds ? (
            <>
              <h1 className={styles.upcoming}>Upcoming Game Odds</h1>
              {upcomingSportsOdds.map((game) => {
                let home_team = game.home.team;
                let away_team = game.away.team;
                [away_team, home_team] = findAbbrv(
                  abbrev,
                  away_team,
                  home_team
                );
                return (
                  <>
                    <div className={styles.team_info}>
                      <div className={styles.team_header}>
                        <div
                          style={{
                            minWidth: "auto",
                            cursor: "pointer",
                            paddingLeft: 10,
                          }}
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
                                game.home.point_spread,
                                game.home.start_time,
                                league,
                                sport,
                              ]);
                              setOpenBet(!openBet);
                            }}
                            color="green"
                          />
                        </div>
                        <p
                          style={{
                            minWidth: "auto",
                            fontSize: 10,
                            paddingRight: 15,
                            paddingLeft: 10,
                          }}
                        >
                          {game.away.start_time.slice(4)}
                        </p>
                        <p style={{ minWidth: 45 }}>Money</p>
                        <p style={{ minWidth: 70 }}>Spread</p>
                        <p style={{ minWidth: 93 }}>Total</p>
                      </div>
                      <div className={styles.team_format}>
                        <div className={styles.name_logo}>
                          <img
                            alt=""
                            className={styles.odds_logo}
                            src={game.away.logo}
                          />
                          <h4>{away_team}</h4>
                          <div className={styles.name_record}>
                            <span
                              style={{
                                fontSize: 10,
                                paddingLeft: 5,
                              }}
                            >
                              {game.away.record}
                            </span>
                          </div>

                          <p style={{ minWidth: 45 }}>{game.away.moneyline}</p>
                          <p
                            style={{
                              minWidth: 70,
                              paddingRight: 15,
                              paddingLeft: 10,
                            }}
                          >
                            {game.away.point_spread}
                          </p>
                          <p style={{ minWidth: 93 }}>
                            {game.away.total_points}
                          </p>
                        </div>
                      </div>

                      <div className={styles.team_format}>
                        <div className={styles.name_logo}>
                          <img
                            alt=""
                            className={styles.odds_logo}
                            src={game.home.logo}
                          />
                          <h4>{home_team}</h4>
                          <div className={styles.name_record}>
                            <span style={{ fontSize: 10, paddingLeft: 5 }}>
                              {game.home.record}
                            </span>
                          </div>

                          <p style={{ minWidth: 45 }}>{game.home.moneyline}</p>
                          <p
                            style={{
                              minWidth: 70,
                              paddingRight: 15,
                              paddingLeft: 10,
                            }}
                          >
                            {game.home.point_spread}
                          </p>
                          <p style={{ minWidth: 93 }}>
                            {game.home.total_points}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : null}
          {finalSportsOdds ? (
            <>
              <h1 className={styles.upcoming}>Game Final Odds</h1>
              {finalSportsOdds.map((game) => {
                let home_team = game.home.team;
                let away_team = game.away.team;
                [away_team, home_team] = findAbbrv(
                  abbrev,
                  away_team,
                  home_team
                );
                return (
                  <>
                    <div className={styles.team_info}>
                      <div className={styles.team_header}>
                        <p
                          style={{
                            minWidth: 100,
                            fontSize: 10,
                            paddingRight: 15,
                            paddingLeft: 10,
                          }}
                        >
                          Final
                        </p>
                        <p style={{ minWidth: 45 }}>Money</p>
                        <p style={{ minWidth: 75 }}>Spread</p>
                        <p style={{ minWidth: 93 }}>Total</p>
                      </div>
                      <div className={styles.team_format}>
                        <div className={styles.name_logo}>
                          <img
                            alt=""
                            className={styles.odds_logo}
                            src={game.away.logo}
                          />
                          <h4>{away_team}</h4>
                          <div className={styles.name_record}>
                            <span
                              style={{
                                paddingLeft: 5,
                                paddingRight: 5,
                              }}
                            >
                              {game.away.score}
                            </span>
                          </div>
                        </div>
                        {game.away.moneyline.length > 5 ? (
                          <p style={{ minWidth: 45 }}>
                            <AiIcon.AiFillCheckCircle
                              style={{ marginRight: 5 }}
                              color="green"
                            />
                            {game.away.moneyline.slice(5)}
                          </p>
                        ) : (
                          <p style={{ minWidth: 45 }}>{game.away.moneyline}</p>
                        )}
                        {game.away.point_spread.length > 5 ? (
                          <p style={{ minWidth: 75 }}>
                            <AiIcon.AiFillCheckCircle
                              style={{ marginRight: 5 }}
                              color="green"
                            />
                            {game.away.point_spread.slice(5)}
                          </p>
                        ) : (
                          <p style={{ minWidth: 75 }}>
                            {game.away.point_spread}
                          </p>
                        )}

                        {game.away.total_points.length > 8 ? (
                          <p style={{ minWidth: 93 }}>
                            <AiIcon.AiFillCheckCircle
                              style={{ marginRight: 5 }}
                              color="green"
                            />
                            {game.away.total_points.slice(5)}
                          </p>
                        ) : (
                          <>
                            (
                            {"basketball" !== sport &&
                            game.away.total_points.length > 4 ? (
                              <p style={{ minWidth: 93 }}>
                                {game.away.total_points.slice(4)}
                              </p>
                            ) : (
                              <p style={{ minWidth: 93 }}>
                                {game.away.total_points}
                              </p>
                            )}
                            )
                          </>
                        )}
                      </div>

                      <div className={styles.team_format}>
                        <div className={styles.name_logo}>
                          <img
                            alt=""
                            className={styles.odds_logo}
                            src={game.home.logo}
                          />
                          <h4>{home_team}</h4>
                          <div className={styles.name_record}>
                            <span
                              style={{
                                paddingLeft: 5,
                                paddingRight: 5,
                              }}
                            >
                              {game.home.score}
                            </span>
                          </div>
                        </div>
                        {game.home.moneyline.length > 5 ? (
                          <p style={{ minWidth: 45 }}>
                            <AiIcon.AiFillCheckCircle
                              style={{ marginRight: 5 }}
                              color="green"
                            />
                            {game.home.moneyline.slice(5)}
                          </p>
                        ) : (
                          <p style={{ minWidth: 45 }}>{game.home.moneyline}</p>
                        )}
                        {game.home.point_spread.length > 5 ? (
                          <p style={{ minWidth: 75 }}>
                            <AiIcon.AiFillCheckCircle
                              style={{ marginRight: 5 }}
                              color="green"
                            />
                            {game.home.point_spread.slice(5)}
                          </p>
                        ) : (
                          <p style={{ minWidth: 75 }}>
                            {game.home.point_spread}
                          </p>
                        )}
                        {game.home.total_points.length > 8 ? (
                          <p style={{ minWidth: 93 }}>
                            <AiIcon.AiFillCheckCircle
                              style={{ marginRight: 5 }}
                              color="green"
                            />
                            {game.home.total_points.slice(5)}
                          </p>
                        ) : (
                          <>
                            (
                            {"basketball" !== sport &&
                            game.home.total_points.length > 4 ? (
                              <p style={{ minWidth: 93 }}>
                                {game.home.total_points.slice(4)}
                              </p>
                            ) : (
                              <p style={{ minWidth: 93 }}>
                                {game.home.total_points}
                              </p>
                            )}
                            )
                          </>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : null}

          {openBet ? <Bet setOpenBet={setOpenBet} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Odds;
