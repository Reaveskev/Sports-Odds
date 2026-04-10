import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/src/Header";
import WhistleLoader from "@/src/Loading";
import Scoreboard from "@/src/Scoreboard";
import styles from "@/styles/Home.module.css";
import {
  getFeaturedGames,
  splitGamesByStatus,
} from "@/src/helpers/standingHelpers";
import { getRandomGames } from "@/src/helpers/sportsPageHelpers";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);

  useEffect(() => {
    async function loadPageData() {
      try {
        const endpoints = [
          {
            league: "NFL",
            url: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
          },
          {
            league: "NBA",
            url: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
          },
          {
            league: "MLB",
            url: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",
          },
          {
            league: "NHL",
            url: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard",
          },
        ];

        const [newsResponse, ...scoreboardResponses] = await Promise.all([
          axios.get("https://now.core.api.espn.com/v1/sports/news"),
          ...endpoints.map((item) => axios.get(item.url)),
        ]);

        const eventsByLeague =
          scoreboardResponses.map((response, index) => ({
            league: endpoints[index].league,
            events: response.data?.events || [],
          })) || [];

        const featuredGames = getFeaturedGames(eventsByLeague, 12);
        const groupedGames = splitGamesByStatus(featuredGames);

        const mappedFeaturedNews = (newsResponse.data?.headlines || []).map(
          (item) => ({
            headline: item.headline,
            description: item.description,
            image: item.images?.[0]?.url || "",
            links: item.links?.web?.href || "#",
          }),
        );

        setInprogress(groupedGames.inprogress);
        setUpcoming(groupedGames.upcoming);
        setCompleted(groupedGames.completed);
        setFeaturedNews(mappedFeaturedNews);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadPageData();
  }, []);

  const allGames = [...inprogress, ...upcoming, ...completed];
  const featuredGames = getRandomGames(allGames, 3);

  function getRandomItems(arr, count = 2) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const articlesWithImages = featuredNews.filter(
    (item) => item.image && item.image !== "",
  );

  const [sideCardOne, sideCardTwo] = getRandomItems(articlesWithImages, 2);

  return (
    <div>
      <Header />

      {loading ? (
        <div style={{ height: "100vh" }}>
          <WhistleLoader />
        </div>
      ) : (
        <>
          <Scoreboard
            inprogress={inprogress}
            upcoming={upcoming}
            completed={completed}
          />

          <div className={styles.homeContainer}>
            <h1 className={styles.sectionTitle}>Welcome to Sports Odds</h1>

            <div className={styles.featuredGrid}>
              <div className={styles.featuredMain}>
                {featuredGames.length > 0 ? (
                  featuredGames.map((game, index) => (
                    <div key={index} className={styles.featuredGameCard}>
                      {/* Top row */}
                      <div className={styles.featuredTop}>
                        <span className={styles.featuredLeague}>
                          {game.league}
                        </span>
                        <span className={styles.featuredStatus}>
                          {game.game_progress.status === "post"
                            ? "FINAL"
                            : game.game_progress.description}
                        </span>
                      </div>

                      {/* Teams */}
                      <div className={styles.featuredTeams}>
                        <div className={styles.featuredTeam}>
                          <img
                            src={game.team_one.logo}
                            className={styles.featuredLogo}
                          />
                          <span>{game.team_one.name}</span>
                          <span className={styles.featuredScore}>
                            {game.team_one.score || ""}
                          </span>
                        </div>

                        <div className={styles.featuredTeam}>
                          <img
                            src={game.team_two.logo}
                            className={styles.featuredLogo}
                          />
                          <span>{game.team_two.name}</span>
                          <span className={styles.featuredScore}>
                            {game.team_two.score || ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No featured games</p>
                )}
              </div>

              <div className={styles.featuredSide}>
                {/* Card 1 */}
                <div className={styles.sideCard}>
                  {sideCardOne ? (
                    <a href={sideCardOne.links} className={styles.sideLink}>
                      {sideCardOne.image && (
                        <img
                          src={sideCardOne.image}
                          alt=""
                          className={styles.sideImage}
                        />
                      )}

                      <div className={styles.sideContent}>
                        <h3 className={styles.sideTitle}>
                          {sideCardOne.headline}
                        </h3>
                        <p className={styles.sideDescription}>
                          {sideCardOne.description}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <p>Top News</p>
                  )}
                </div>

                {/* Card 2 */}
                <div className={styles.sideCard}>
                  {sideCardTwo ? (
                    <a href={sideCardTwo.links} className={styles.sideLink}>
                      {sideCardTwo.image && (
                        <img
                          src={sideCardTwo.image}
                          alt=""
                          className={styles.sideImage}
                        />
                      )}

                      <div className={styles.sideContent}>
                        <h3 className={styles.sideTitle}>
                          {sideCardTwo.headline}
                        </h3>
                        <p className={styles.sideDescription}>
                          {sideCardTwo.description}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <p>Trending</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
