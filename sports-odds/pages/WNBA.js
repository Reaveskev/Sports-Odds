import { useState } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import WhistleLoader from "@/src/Loading";
import Scoreboard from "@/src/Scoreboard";
import Standings from "@/src/Standings";
import NewsCard from "@/src/helpers/NewsCard";
import useSportsPageData from "@/src/helpers/useSportsPageData";
import { normalizeEspnWnbaStandings } from "@/src/helpers/standingHelpers";

function WNBA() {
  const [seeNews, setSeeNews] = useState(true);
  const [seeStandings, setSeeStandings] = useState(false);

  const {
    loading,
    upcoming,
    inprogress,
    completed,
    news,
    standings,
    offseason,
  } = useSportsPageData({
    scoreboardUrl:
      "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/scoreboard",
    espnNewsUrl:
      "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/news",
    customNewsUrl: "http://127.0.0.1:5000/api/Sport_News/wnba",
    standingsUrl:
      "https://site.api.espn.com/apis/v2/sports/basketball/wnba/standings",
    //  customNewsUrl: "https://sports-odds.herokuapp.com/api/Sport_News/wnba",
    // standingsUrl: "https://sports-odds.herokuapp.com/api/Sport_Standings/wnba",
  });

  const updatedStandings = normalizeEspnWnbaStandings(standings);

  console.log("Upcoming Games :", upcoming);

  return (
    <div>
      <Header />

      {loading ? (
        <div style={{ height: "100vh" }}>
          <WhistleLoader />
        </div>
      ) : (
        <>
          {!offseason ? (
            <Scoreboard
              inprogress={inprogress}
              upcoming={upcoming}
              completed={completed}
            />
          ) : (
            <div className={styles.offseason}>
              <p>It is currently the offseason.</p>
            </div>
          )}

          <div className={styles.mainContent}>
            {!offseason && (
              <div className={styles.leftColumn}>
                <Standings standings={updatedStandings} />
              </div>
            )}

            <div className={styles.rightColumn}>
              <h1 className={styles.sectionTitle}>WNBA News</h1>
              <div className={styles.news}>
                {news.map((item) => (
                  <NewsCard key={item.headline} news={item} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WNBA;
