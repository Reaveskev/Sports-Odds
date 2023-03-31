import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import Image from "next/image";
import Yahoo_Sports from "./Yahoo_Sports.csv";

function MLB() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [MLBNews, setMLBNews] = useState([]);
  const [MLBNews2, setMLBNews2] = useState([]);
  const [offseason, setoffseason] = useState(false);
  const [sports_odds, setSports_Odds] = useState([]);

  useEffect(() => {
    let temp = [];
    axios
      .get(
        "https://statmilk.bleacherreport.com/api/scores/carousel?league=MLB&team=none&carousel_context=league&tz=-25200&appversion=500.0"
      )
      .then((res) => {
        if (res.data.game_groups[0] === undefined) {
          setoffseason(true);
        } else if (
          res.data.game_groups[0].name === "In Progress" &&
          res.data.game_groups[1].name === "Completed"
        ) {
          setInprogress(res.data.game_groups[0]);
          setCompleted(res.data.game_groups[1]);
          setUpcoming(res.data.game_groups[2]);
        } else if (res.data.game_groups[0].name === "Completed") {
          setCompleted(res.data.game_groups[0]);
          setUpcoming(res.data.game_groups[1]);
        } else if (
          res.data.game_groups[0].name === "In Progress" &&
          res.data.game_groups[1].name === "Upcoming"
        ) {
          setInprogress(res.data.game_groups[0]);
          setUpcoming(res.data.game_groups[1]);
        } else {
          setUpcoming(res.data.game_groups[0]);
        }
      })
      .then(() => {
        axios
          .get(
            "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news"
          )
          .then((res) => {
            setMLBNews(res.data.articles);
            setLoading(false);
          });
      })
      .then(() => {
        axios
          .get(
            "https://sports-odds.herokuapp.com/MLB_NEWS"
            // ||
            // "http://127.0.0.1:5000/MLB_NEWS"
          )
          .then((res) => {
            setMLBNews2(res.data);
          });
      })
      .then(() => {
        Yahoo_Sports.forEach((element) => {
          if (element.League === "MLB") {
            temp.push(element);
          }
        });
      });
    setSports_Odds(temp);
  }, []);

  return (
    <div>
      <Header />
      <div
        className={styles.scoreboard}
        style={offseason ? { justifyContent: "center" } : null}
      >
        {loading ? (
          <>
            <p>Data is loading...</p>
          </>
        ) : (
          <>
            {offseason ? (
              <div className={styles.offseason}>
                <p>It is currently the offseason.</p>
              </div>
            ) : (
              <>
                {inprogress.game_groups !== undefined ? (
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
                              <Image
                                alt={games.team_one.logo}
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
                              <Image
                                alt={games.team_two.logo}
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
                            <span>{games.team_one.score}</span>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : null}
                {completed.games !== undefined ? (
                  <>
                    {completed.games.map((games) => {
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
                              <Image
                                alt={games.team_one.logo}
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
                              <Image
                                alt={games.team_two.logo}
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
                            <span>{games.team_one.score}</span>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : null}
                {upcoming.games.map((games) => {
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
                          <Image
                            alt={games.team_one.logo}
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
                          <Image
                            alt={games.team_two.logo}
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
                        <span>{games.team_one.score}</span>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>

      <div className={styles.news}>
        <header className="newsHeader">MLB News</header>
        {MLBNews.map((news) => {
          return (
            <div className={styles.newInfo} key={news.headline}>
              <header>{news.headline}</header>
              <a href={news.links.web.href}>
                <Image
                  className={styles.Pic}
                  alt={news.links.web.href}
                  src={news.images[0].url}
                />
              </a>
              <p>{news.description}</p>
            </div>
          );
        })}
        {MLBNews2.map((news) => {
          return (
            <div className={styles.newInfo} key={news.headline}>
              <header>{news.headline}</header>
              <a href={news.links}>
                <Image
                  className={styles.Pic}
                  alt={news.links}
                  src={news.image}
                />
              </a>
              <p>{news.description}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.odds_div}>
        <div className={styles.odds}>
          <h1 className={styles.upcoming}>Upcoming Game Odds</h1>

          {sports_odds.map((game) => {
            return (
              <>
                <div className={styles.team_info}>
                  <div className={styles.team_header}>
                    <p style={{ minWidth: 180 }}></p>
                    <p style={{ minWidth: 72 }}>Money Line</p>
                    <p style={{ minWidth: 120 }}>Point Spread</p>
                    <p style={{ minWidth: 120 }}>Total Points</p>
                  </div>
                  <div className={styles.team_format}>
                    <div className={styles.name_logo}>
                      <Image
                        alt={styles.name_logo}
                        className={styles.odds_logo}
                        src={game.Away_logo}
                      />
                      <div className={styles.name_record}>
                        <h4>{game.Away_Team}</h4>
                        <span>{game.Away_Record}</span>
                        <span style={{ paddingTop: 5 }}>@</span>
                      </div>
                    </div>
                    <p>{game.Away_Money_line}</p>
                    <p>{game.Away_Point_spread}</p>
                    <p>{game.Away_Total_points}</p>
                  </div>

                  <div className={styles.team_format}>
                    <div className={styles.name_logo}>
                      <Image
                        alt={styles.name_logo}
                        className={styles.odds_logo}
                        src={game.Home_logo}
                      />
                      <div className={styles.name_record}>
                        <h4>{game.Home_Team}</h4>
                        <span>{game.Home_Record}</span>
                      </div>
                    </div>
                    <p>{game.Home_Money_line}</p>
                    <p>{game.Home_Point_spread}</p>
                    <p>{game.Home_Total_points}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MLB;
