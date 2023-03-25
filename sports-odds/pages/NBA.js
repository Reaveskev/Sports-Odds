import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import { useRouter } from "next/router";
import Papa from "papaparse";
import Yahoo_Sports from "./Yahoo_Sports.csv";
import { Table } from "@nextui-org/react";

function NBA() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [NBANews, setNBANews] = useState([]);
  const [offseason, setoffseason] = useState(false);

  useEffect(() => {
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

    // const fetchParseData = async (Yahoo_Sports) => {
    //   Papa.parse(Yahoo_Sports),
    //     {
    //       header: true,
    //       skipEmptyLines: true,
    //       complete: (result) => {
    //         console.log(result.data);
    //       },
    //     };
    // };
    // fetchParseData(Yahoo_Sports);
  }, []);

  const handleCopy = (numbers) => {
    let url = "http://localhost:3000/" + numbers;
    navigator.clipboard.writeText(url);
    console.log(url);
    // router.push(url);
  };

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
          <Table
            aria-label="Example table with static content"
            css={{
              color: "white",
              height: "auto",
              minWidth: "100%",
              background: "lightgray",
              text: "white",
            }}
          >
            <Table.Header>
              <Table.Column style={{ backgroundColor: "#333", color: "white" }}>
                Team
              </Table.Column>
              <Table.Column style={{ backgroundColor: "#333", color: "white" }}>
                Record
              </Table.Column>
              <Table.Column style={{ backgroundColor: "#333", color: "white" }}>
                Money Line
              </Table.Column>
              <Table.Column style={{ backgroundColor: "#333", color: "white" }}>
                Point Spread
              </Table.Column>
              <Table.Column style={{ backgroundColor: "#333", color: "white" }}>
                Total Points
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {Yahoo_Sports.map((game) => {
                return (
                  <Table.Row key={game.Team}>
                    <Table.Cell>{game.Team}</Table.Cell>
                    <Table.Cell>{game.Record}</Table.Cell>
                    <Table.Cell>{game.Money_line}</Table.Cell>
                    <Table.Cell>{game.Point_spread}</Table.Cell>
                    <Table.Cell>{game.Total_points}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>

          {/* <h1 className={styles.upcoming}>Upcoming Game Odds</h1> */}
          {/* <div className={styles.info_header}>
            <span> Team </span>
            <span>- Record </span>
            <span>- Money Line </span>
            <span>- Point Spread </span>
            <span>- Total Points </span>
          </div> */}
          {/* {Yahoo_Sports.map((game) => {
            return (
              <div key={game.Team}>
                <span className={styles.info}>{game.Team}</span>
                <span className={styles.info}> {game.Record}</span>
                <span className={styles.info}> {game.Money_line}</span>
                <span className={styles.info}> {game.Point_spread}</span>
                <span className={styles.info}> {game.Total_points}</span>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}

export default NBA;
