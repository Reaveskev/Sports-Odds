import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";
import WhistleLoader from "@/src/Loading";
import Scoreboard from "@/src/Scoreboard";
import Standings from "@/src/Standings";
import NewsCard from "@/src/helpers/NewsCard";
import useSportsPageData from "@/src/helpers/useSportsPageData";
import { normalizeEspnCfbStandings } from "@/src/helpers/standingHelpers";

function MCBB() {
  const [seeNews, setSeeNews] = useState(true);
  const [seeStandings, setSeeStandings] = useState(false);
  const [selectedConference, setSelectedConference] = useState("All");

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
      "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard",
    espnNewsUrl:
      "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/news",
    // customNewsUrl: "http://127.0.0.1:5000/api/Sport_News/ncaa-basketball",
    standingsUrl:
      "https://site.api.espn.com/apis/v2/sports/basketball/mens-college-basketball/standings",
    customNewsUrl:
      "https://sports-odds.herokuapp.com/api/Sport_News/ncaa-basketball",
  });

  const updatedStandings = normalizeEspnCfbStandings(standings);

  const conferencesOptions = [
    "All",
    ...updatedStandings.map((conference) => conference.conference),
  ];

  const filteredStandings =
    selectedConference === "All"
      ? updatedStandings
      : updatedStandings.filter(
          (conference) => conference.conference === selectedConference,
        );

  const selectedConferenceTeams = new Set(
    updatedStandings
      .filter(
        (conference) =>
          selectedConference === "All" ||
          conference.conference === selectedConference,
      )
      .flatMap((conference) =>
        conference.teams
          ? conference.teams.map((team) => team.abbrev)
          : conference.divisions.flatMap((division) =>
              division.teams.map((team) => team.abbrev),
            ),
      ),
  );

  const filteredUpcoming =
    selectedConference === "All"
      ? upcoming
      : upcoming.filter(
          (game) =>
            selectedConferenceTeams.has(game.team_one.abbrev) ||
            selectedConferenceTeams.has(game.team_two.abbrev),
        );

  const filteredInprogress =
    selectedConference === "All"
      ? inprogress
      : inprogress.filter(
          (game) =>
            selectedConferenceTeams.has(game.team_one.abbrev) ||
            selectedConferenceTeams.has(game.team_two.abbrev),
        );

  const filteredCompleted =
    selectedConference === "All"
      ? completed
      : completed.filter(
          (game) =>
            selectedConferenceTeams.has(game.team_one.abbrev) ||
            selectedConferenceTeams.has(game.team_two.abbrev),
        );

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
              inprogress={filteredInprogress}
              upcoming={filteredUpcoming}
              completed={filteredCompleted}
            />
          ) : (
            <div className={styles.offseason}>
              <p>It is currently the offseason.</p>
            </div>
          )}

          <div className={styles.mainContent}>
            {!offseason && (
              <div className={styles.leftColumn}>
                <div className={styles.filterBar}>
                  <label
                    htmlFor="conferenceFilter"
                    className={styles.filterLabel}
                  >
                    Conference:
                  </label>
                  <select
                    id="conferenceFilter"
                    value={selectedConference}
                    onChange={(e) => setSelectedConference(e.target.value)}
                    className={styles.filterSelect}
                  >
                    {conferencesOptions.map((conference) => (
                      <option key={conference} value={conference}>
                        {conference}
                      </option>
                    ))}
                  </select>
                </div>
                <Standings standings={filteredStandings} />
              </div>
            )}

            <div className={styles.rightColumn}>
              <h1 className={styles.sectionTitle}>MCBB News</h1>
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

export default MCBB;
