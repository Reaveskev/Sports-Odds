import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import { useRouter } from "next/router";
import Yahoo_Sports from "./Yahoo_Sports.csv";

function NBA() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [NBANews, setNBANews] = useState([]);
  const [offseason, setoffseason] = useState(false);
  const [sports_odds, setSports_Odds] = useState([]);

  useEffect(() => {
    let temp = [];
    axios
      .get(
        "https://statmilk.bleacherreport.com/api/scores/carousel?league=NBA&team=none&carousel_context=league&tz=-25200&appversion=500.0"
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
            "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news"
          )
          .then((res) => {
            setNBANews(res.data.articles);
            setLoading(false);
          });
      });

    Yahoo_Sports.forEach((element) => {
      if (element.League === "NBA") {
        temp.push(element);
      }
    });
    setSports_Odds(temp);
  }, []);

  // const handleCopy = (numbers) => {
  //   let url = "http://localhost:3000/" + numbers;
  //   navigator.clipboard.writeText(url);
  //   console.log(url);
  //   // router.push(url);
  // };

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
                {inprogress.games !== undefined ? (
                  <>
                    {inprogress.games.map((games) => {
                      return (
                        <div
                          onClick={() => handleCopy(games.id)}
                          className={styles.games}
                          key={games.id}
                        >
                          <div className={styles.date}>
                            {games.game_progress.primary}
                          </div>
                          <div className={styles.time}>
                            {games.game_progress.header}
                          </div>
                          <div className={styles.teamContainer}>
                            <div className={styles.logoDiv}>
                              <img
                                className={styles.logo}
                                src={games.team_one.logo}
                              ></img>
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
                                className={styles.logo}
                                src={games.team_two.logo}
                              ></img>
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
                              <img
                                className={styles.logo}
                                src={games.team_one.logo}
                              ></img>
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
                                className={styles.logo}
                                src={games.team_two.logo}
                              ></img>
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
                {upcoming.games !== undefined ? (
                  <>
                    {upcoming.games.map((games) => {
                      return (
                        <div
                          onClick={() => handleCopy(games.id)}
                          className={styles.games}
                          key={games.id}
                        >
                          <div className={styles.date}>
                            {games.game_progress.primary}
                          </div>
                          <div className={styles.time}>
                            {games.game_progress.header}
                          </div>
                          <div className={styles.teamContainer}>
                            <div className={styles.logoDiv}>
                              <img
                                className={styles.logo}
                                src={games.team_one.logo}
                              ></img>
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
                                className={styles.logo}
                                src={games.team_two.logo}
                              ></img>
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
              </>
            )}
          </>
        )}
      </div>

      <div className={styles.news}>
        <header className="newsHeader">NBA News</header>
        {NBANews.map((news) => {
          return (
            <div className={styles.newInfo} key={news.headline}>
              <header>{news.headline}</header>
              <a href={news.links.web.href}>
                <img
                  className={styles.Pic}
                  alt="randomnews"
                  src={news.images[0].url}
                ></img>
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
                      <img
                        className={styles.odds_logo}
                        src={game.Away_logo}
                      ></img>
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
                      <img
                        className={styles.odds_logo}
                        src={game.Home_logo}
                      ></img>
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

export default NBA;
