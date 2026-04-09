import { useState } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import WhistleLoader from "@/src/Loading";
import Scoreboard from "@/src/Scoreboard";
import Standings from "@/src/Standings";
import NewsCard from "@/src/helpers/NewsCard";
import useSportsPageData from "@/src/helpers/useSportsPageData";
import { normalizeEspnNbaStandingsByDivision } from "@/src/helpers/standingHelpers";

function NBA() {
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
      "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
    espnNewsUrl:
      "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news",
    customNewsUrl: "http://127.0.0.1:5000/api/Sport_News/nba",
    standingsUrl:
      "https://site.api.espn.com/apis/v2/sports/basketball/nba/standings",
    //  customNewsUrl: "https://sports-odds.herokuapp.com/api/Sport_News/nba",
    // standingsUrl: "https://sports-odds.herokuapp.com/api/Sport_Standings/nba",
  });

  const updatedStandings = normalizeEspnNbaStandingsByDivision(standings);

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
              <h1 className={styles.sectionTitle}>NBA News</h1>
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

export default NBA;
