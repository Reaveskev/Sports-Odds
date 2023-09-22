import React, { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import * as AiIcon from "react-icons/ai";
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
  const NFL_Logo = {
    ARI: "https://s.yimg.com/iu/api/res/1.2/F6V8_IS5kdnPYMdjjuWFXA--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20230503/500x500/ari_wbg.png",
    ATL: "https://s.yimg.com/iu/api/res/1.2/NTC6HmUTm9svTAuUwqDzdQ--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_ATL_wbg.png",
    BAL: "https://s.yimg.com/iu/api/res/1.2/OgmkzmqBbXp96GOGftwscg--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_BAL_wbg.png",
    BUF: "https://s.yimg.com/iu/api/res/1.2/vZnU36eYz81JHjxwh8dRuQ--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_BUF_wbg.png",
    CAR: "https://s.yimg.com/iu/api/res/1.2/O6OTmQlHtIOLcuewHM8BMw--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_CAR_wbg.png",
    CHI: "https://s.yimg.com/iu/api/res/1.2/FA6BqDcRNfdOqnBNYbry4w--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/20230905/500px/bears_new_wbg.png",
    CIN: "https://s.yimg.com/iu/api/res/1.2/665GIPhjnuMrRwzWeLNRAA--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_CIN_wbg.png",
    CLE: "https://s.yimg.com/iu/api/res/1.2/FhFodhYRl8T539fb3H3toA--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_CLE_wbg.png",
    DAL: "https://s.yimg.com/iu/api/res/1.2/hVcI.GtKtVwMbX78t0u5hQ--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_DAL_wbg.png",
    DEN: "https://s.yimg.com/iu/api/res/1.2/fG2anZ4xIS4ylKVaauT9jA--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_DEN_wbg.png",
    DET: "https://s.yimg.com/iu/api/res/1.2/JwpPnMwxX1Tp4XQhT3aWiA--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_DET_wbg.png",
    GB: "https://s.yimg.com/iu/api/res/1.2/2Rfo7yEBJMdB_g_6QUYEQA--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_GB_wbg.png",
    HOU: "https://s.yimg.com/iu/api/res/1.2/AzECLZr2DYgK65EMnEO1LA--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_HOU_wbg.png",
    IND: "https://s.yimg.com/iu/api/res/1.2/uJ8gTjUHyNbOs8Pa04YEXw--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_IND_wbg.png",
    JAX: "https://s.yimg.com/iu/api/res/1.2/MpxJvj_exA0hCsTPTovCbQ--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_JAX_wbg.png",
    KC: "https://s.yimg.com/iu/api/res/1.2/1TtIgLlgwhOy1YMAbpuTNA--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_KC_wbg.png",
    LV: "https://s.yimg.com/iu/api/res/1.2/_mxGk0woIZth_G4NM7AIlg--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20200908/500x500/raiders_wbg.png",
    LAC: "https://s.yimg.com/iu/api/res/1.2/G3pw_60Yyxv0PYfWhYV8.w--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20200508/500x500/chargers_wbg.png",
    LAR: "https://s.yimg.com/iu/api/res/1.2/NkAVTbcF4lk1G.4yhzf2Iw--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20200323/500x500/rams_wbg.png",
    MIA: "https://s.yimg.com/iu/api/res/1.2/tjR4TvZAZZbEuVJ3clmBAw--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_MIA_wbg.png",
    MIN: "https://s.yimg.com/iu/api/res/1.2/tUNLpfCpaK1m8w9YpxXtyQ--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_MIN_wbg.png",
    NE: "https://s.yimg.com/iu/api/res/1.2/aMjLxfdz0x.GnlQFS81g4A--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_NE_wbg.png",
    NO: "https://s.yimg.com/iu/api/res/1.2/Ap5qWrs3J31FVqunDKktkQ--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_NO_wbg.png",
    NYG: "https://s.yimg.com/iu/api/res/1.2/irmn2p9B4vd3Rfbaqu0QJw--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03Mjt3PTcy/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_NYG_wbg.png",
    NYJ: "https://s.yimg.com/iu/api/res/1.2/cz7w_xBXJ7RV_FTOhKQUog--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_NYJ_wbg.png",
    PHI: "https://s.yimg.com/iu/api/res/1.2/iCU2.qC7SHK7bc0ZiaZnXg--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_PHI_wbg.png",
    PIT: "https://s.yimg.com/iu/api/res/1.2/h4NVYcLFDI8WsfqTCQ9Dtw--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_PIT_wbg.png",
    SF: "https://s.yimg.com/iu/api/res/1.2/X4_oJVT64fopDILM8mXcxw--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03Mjt3PTcy/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_SF_wbg.png",
    SEA: "https://s.yimg.com/iu/api/res/1.2/GIgBF4ZOz6HQEqjuGDw6mg--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_SEA_wbg.png",
    TB: "https://s.yimg.com/iu/api/res/1.2/6eaV4PSvc5dMXpCQHtOFbA--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20200508/500x500/buccaneers_wbg.png",
    TEN: "https://s.yimg.com/iu/api/res/1.2/HLfD7UQwuWM7_QVCW_1PEA--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20190724/500x500/2019_TEN_wbg.png",
    WAS: "https://s.yimg.com/iu/api/res/1.2/e4sU1g7geWcCqFN1NSFG1A--~B/YXBwaWQ9c2hhcmVkO2ZpPWZpbGw7cT0xMDA7aD03NTt3PTc1/https://s.yimg.com/cv/apiv2/default/nfl/20220202/500x500/washington_wbg.png",
  };
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

  const findLogo = (NFL_Logo, away_team, home_team) => {
    let away_logo = "";
    let home_logo = "";
    for (const [team, logo] of Object.entries(NFL_Logo)) {
      if (away_team === team) {
        away_logo = logo;
      }
      if (home_team === team) {
        home_logo = logo;
      }
      if (away_logo && home_logo) {
        break;
      }
    }

    return [away_logo, home_logo];
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
              {featuredSportsOdds.length > 0 ? (
                <>
                  <h1 className={styles.upcoming}>Featured Game Odds</h1>
                  <div className={styles.featured_odds}>
                    {featuredSportsOdds.map((game) => {
                      let home_team = game.home.team;
                      let away_team = game.away.team;

                      let away_logo = game.away.logo;
                      let home_logo = game.home.logo;

                      if (game.away.logo === "No Image") {
                        [away_logo, home_logo] = findLogo(
                          NFL_Logo,
                          away_team,
                          home_team
                        );
                      }
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
                                  src={away_logo}
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
                              <p style={{ minWidth: 45 }}>
                                {game.away.moneyline}
                              </p>
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
                              <p style={{ minWidth: 45 }}>
                                {game.home.moneyline}
                              </p>
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
            </>
          ) : null}

          {inprogressSportsOdds ? (
            <>
              {inprogressSportsOdds.length > 0 ? (
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
                    let away_logo = game.away.logo;
                    let home_logo = game.home.logo;

                    if (game.away.logo === "No Image") {
                      [away_logo, home_logo] = findLogo(
                        NFL_Logo,
                        away_team,
                        home_team
                      );
                    }
                    return (
                      <>
                        <div className={styles.team_info}>
                          <div className={styles.team_header}>
                            <div style={{ minWidth: 30, cursor: "pointer" }}>
                              <AiIcon.AiFillPlusCircle
                                onClick={() => {
                                  setBetInfo([
                                    away_logo,
                                    game.away.team,
                                    game.away.score,
                                    game.away.moneyline,
                                    game.away.point_spread,
                                    game.away.total_points,
                                    home_logo,
                                    game.home.team,
                                    game.home.score,
                                    game.home.moneyline,
                                    game.home.point_spread,
                                    game.home.total_points,
                                    league,
                                    sport,
                                    away_team,
                                    home_team,
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
                                src={away_logo}
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
                            <p style={{ minWidth: 45 }}>
                              {game.away.moneyline}
                            </p>
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
                                src={home_logo}
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
                            <p style={{ minWidth: 45 }}>
                              {game.home.moneyline}
                            </p>
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
                </>
              ) : null}
            </>
          ) : null}
          {upcomingSportsOdds ? (
            <>
              {upcomingSportsOdds.length > 0 ? (
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

                    let away_logo = game.away.logo;
                    let home_logo = game.home.logo;

                    if (game.away.logo === "No Image") {
                      [away_logo, home_logo] = findLogo(
                        NFL_Logo,
                        away_team,
                        home_team
                      );
                    }
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
                                    away_logo,
                                    game.away.team,
                                    game.away.record,
                                    game.away.moneyline,
                                    game.away.point_spread,
                                    game.away.total_points,
                                    home_logo,
                                    game.home.team,
                                    game.home.record,
                                    game.home.moneyline,
                                    game.home.point_spread,
                                    game.home.total_points,
                                    game.home.start_time,
                                    league,
                                    sport,
                                    away_team,
                                    home_team,
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
                                src={away_logo}
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

                              <p style={{ minWidth: 45 }}>
                                {game.away.moneyline}
                              </p>
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
                                src={home_logo}
                              />
                              <h4>{home_team}</h4>
                              <div className={styles.name_record}>
                                <span style={{ fontSize: 10, paddingLeft: 5 }}>
                                  {game.home.record}
                                </span>
                              </div>

                              <p style={{ minWidth: 45 }}>
                                {game.home.moneyline}
                              </p>
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
            </>
          ) : null}
          {finalSportsOdds ? (
            <>
              {finalSportsOdds.length > 0 ? (
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

                    let away_logo = game.away.logo;
                    let home_logo = game.home.logo;

                    if (game.away.logo === "No Image") {
                      [away_logo, home_logo] = findLogo(
                        NFL_Logo,
                        away_team,
                        home_team
                      );
                    }
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
                                src={away_logo}
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
                              <p style={{ minWidth: 45 }}>
                                {game.away.moneyline}
                              </p>
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

                            {sport !== "basketball" && sport !== "football" ? (
                              <>
                                {game.away.total_points.length > 4 ? (
                                  <p style={{ minWidth: 93 }}>
                                    <AiIcon.AiFillCheckCircle
                                      style={{ marginRight: 5 }}
                                      color="green"
                                    />
                                    {game.away.total_points.slice(4)}
                                  </p>
                                ) : (
                                  <p style={{ minWidth: 93 }}>
                                    {game.away.total_points}
                                  </p>
                                )}
                              </>
                            ) : null}

                            {sport == "basketball" || sport == "football" ? (
                              <>
                                {game.away.total_points.length > 8 ? (
                                  <p style={{ minWidth: 93 }}>
                                    <AiIcon.AiFillCheckCircle
                                      style={{ marginRight: 5 }}
                                      color="green"
                                    />
                                    {game.away.total_points.slice(5)}
                                  </p>
                                ) : (
                                  <p style={{ minWidth: 93 }}>
                                    {game.away.total_points}
                                  </p>
                                )}
                              </>
                            ) : null}
                          </div>

                          <div className={styles.team_format}>
                            <div className={styles.name_logo}>
                              <img
                                alt=""
                                className={styles.odds_logo}
                                src={home_logo}
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
                              <p style={{ minWidth: 45 }}>
                                {game.home.moneyline}
                              </p>
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
                            {sport !== "basketball" && sport !== "football" ? (
                              <>
                                {game.home.total_points.length > 4 ? (
                                  <p style={{ minWidth: 93 }}>
                                    <AiIcon.AiFillCheckCircle
                                      style={{ marginRight: 5 }}
                                      color="green"
                                    />
                                    {game.home.total_points.slice(4)}
                                  </p>
                                ) : (
                                  <p style={{ minWidth: 93 }}>
                                    {game.home.total_points}
                                  </p>
                                )}
                              </>
                            ) : null}
                            {sport == "basketball" || sport == "football" ? (
                              <>
                                {game.home.total_points.length > 8 ? (
                                  <p style={{ minWidth: 93 }}>
                                    <AiIcon.AiFillCheckCircle
                                      style={{ marginRight: 5 }}
                                      color="green"
                                    />
                                    {game.home.total_points.slice(5)}
                                  </p>
                                ) : (
                                  <p style={{ minWidth: 93 }}>
                                    {game.home.total_points}
                                  </p>
                                )}
                              </>
                            ) : null}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : null}
            </>
          ) : null}

          {openBet ? <Bet setOpenBet={setOpenBet} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Odds;
