import React, { useState, useEffect } from "react";
import styles from "@/styles/draftboard.module.css";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import WhistleLoader from "@/src/Loading";
import PlayerStats from "./PlayerStats";

const DraftBoard = ({ numPlayers, numRounds }) => {
  const [teamNames, setTeamNames] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [teamNameIndex, setTeamNameIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [draftedPlayers, setDraftedPlayers] = useState([]);
  const [positionFilter, setPositionFilter] = useState("");
  const [isDraftFinished, setIsDraftFinished] = useState(false);
  const [test, setTest] = useState(false);
  const [sortByRank, setSortByRank] = useState(true);
  const [sortByADP, setSortByADP] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seePlayers, setSeePlayers] = useState(true);
  const [seeRoster, setSeeRosters] = useState(false);
  const [seeWishlist, setSeeWishlist] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showStats, setShowStats] = useState(false);

  const positionSlots = ["QB", "RB", "WR", "TE", "K", "DST"];

  const url =
    "https://us-central1-fantasy-football-389122.cloudfunctions.net/Google_sheet";

  ////
  const getPlayerStatsByPosition = (position, data) => {
    switch (position.toLowerCase()) {
      case "qb":
        return data.slice(0, 9);
      case "k":
        return data.slice(0, 6);
      case "def":
        return data.slice(0, 7);
      case "rb":
        return data.slice(0, 8);
      default:
        return data.slice(0, 10);
    }
  };

  const generateCustomKeys = (position, statsLength, projectionsLength) => {
    switch (position.toLowerCase()) {
      case "qb":
        return {
          statsKeys: [
            "Completion/Attempts",
            "Passing Yards",
            "Passing TD",
            "Interception",
            "Carries",
            "Rushing Yards",
            "Rushing TD",
            "PPR Points",
          ],
          projectionsKeys: [
            "Completion/Attempts",
            "Passing Yards",
            "Passing TD",
            "Interception",
            "Carries",
            "Rushing Yards",
            "Rushing TD",
            "PPR Points",
          ],
        };
      case "rb":
        return {
          statsKeys: [
            "Carries",
            "Rushing Yards",
            "Average",
            "Rushing TD",
            "Receptions",
            "Receiving Yards",
            "Receiving TD",
            "PPR Points",
          ],
          projectionsKeys: [
            "Carries",
            "Rushing Yards",
            "Average",
            "Rushing TD",
            "Receptions",
            "Receiving Yards",
            "Receiving TD",
            "PPR Points",
          ],
        };
      case "k":
        return {
          statsKeys: ["1-39", "40-49", "50+", "TOT", "XP", "PPR Points"],
          projectionsKeys: ["1-39", "40-49", "50+", "TOT", "XP", "PPR Points"],
        };
      case "def":
        return {
          statsKeys: ["SCK", "INT", "FR", "TD", "PA", "YA", "PPR Points"],
          projectionsKeys: ["SCK", "INT", "FR", "TD", "PA", "YA", "PPR Points"],
        };
      default:
        return {
          statsKeys: [
            "Targets",
            "Receptions",
            "Receiving Yards",
            "Average",
            "Receiving Td",
            "Carries",
            "Rushing Yard",
            "Rushing TD",
            "PPR Points",
          ],
          projectionsKeys: [
            "Targets",
            "Receptions",
            "Receiving Yards",
            "Average",
            "Receiving Td",
            "Carries",
            "Rushing Yard",
            "Rushing TD",
            "PPR Points",
          ],
        };
    }
  };

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const data = response.data;

        const formattedPlayers = data.map(
          ([
            rank,
            name,
            position,
            team,
            adp,
            bye,
            image_url,
            ...statsAndProjections
          ]) => {
            let stats;
            let projections;
            if (position === "RB") {
              statsAndProjections.splice(-1);
              stats = getPlayerStatsByPosition(
                position,
                statsAndProjections.slice(0, 9)
              );

              projections = statsAndProjections.slice(8, -1); // Get projections from index 8 to second to last element
            } else if (position === "QB") {
              statsAndProjections.splice(-1);
              stats = getPlayerStatsByPosition(
                position,
                statsAndProjections.slice(0, 8)
              );
              projections = statsAndProjections.slice(8, -1); // Get projections from index 9 to second to last element
            } else if (position === "WR" || position === "TE") {
              stats = getPlayerStatsByPosition(
                position,
                statsAndProjections.slice(0, 9)
              );
              projections = statsAndProjections.slice(9, -1); // Get projections from index 9 to second to last element
            } else if (position === "K") {
              statsAndProjections.splice(-1);
              stats = getPlayerStatsByPosition(
                position,
                statsAndProjections.slice(0, 6)
              );
              projections = statsAndProjections.slice(6, -1); // Get projections from index 9 to second to last element
            } else {
              statsAndProjections.splice(-1);
              stats = getPlayerStatsByPosition(
                position,
                statsAndProjections.slice(0, 7)
              );
              projections = statsAndProjections.slice(7, -1); // Get projections from index 9 to second to last element
            }

            const outlook = statsAndProjections[statsAndProjections.length - 1]; // Get the last element as outlook

            const customKeys = generateCustomKeys(position);

            const formattedStats = Object.fromEntries(
              stats.map((stat, index) => {
                return [customKeys.statsKeys[index], stat];
              })
            );

            // Create the projections object with custom keys
            const formattedProjections = Object.fromEntries(
              projections.map((projection, index) => [
                customKeys.projectionsKeys[index],
                projection,
              ])
            );

            return {
              rank: parseInt(rank),
              name,
              position,
              team,
              adp: parseInt(adp),
              bye,
              image_url,
              stats: formattedStats,
              projections: formattedProjections,
              outlook,
            };
          }
        );

        setLoading(false);
        setAvailablePlayers(formattedPlayers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [selectedTeamIndex, setSelectedTeamIndex] = useState(-1);
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState([]);
  useEffect(() => {
    if (selectedTeamIndex !== -1) {
      const teamPlayers = draftedPlayers
        .filter(
          (draftedPlayer) => draftedPlayer.teamIndex === selectedTeamIndex
        )
        .map((draftedPlayer) => ({
          player: draftedPlayer.player,
          position: draftedPlayer.position,
          bye: draftedPlayer.bye,
        }));
      setSelectedTeamPlayers(teamPlayers);
    } else {
      setSelectedTeamPlayers([]);
    }
  }, [draftedPlayers, selectedTeamIndex]);

  const buttonPressed = () => {
    setTeamNameIndex((prevCount) => {
      if (prevCount === numPlayers - 1) {
        if (test === false) {
          setTest(true);
          return prevCount;
        } else {
          return prevCount - 1;
        }
      } else if (test === true) {
        if (prevCount === 0) {
          setTest(false);
          return prevCount;
        } else {
          return prevCount - 1;
        }
      } else if (prevCount === 0) {
        return prevCount + 1;
      } else if (prevCount === -1) {
        return prevCount + 2;
      } else {
        return prevCount + 1;
      }
    });
  };

  const getDefaultTeamNames = (numPlayers) => {
    const teamNames = [];

    for (let i = 1; i <= numPlayers; i++) {
      teamNames.push(`Team ${i}`);
    }

    return teamNames;
  };

  useEffect(() => {
    // Initialize team names and team players arrays
    const defaultTeamNames = getDefaultTeamNames(numPlayers);
    setTeamNames(defaultTeamNames);

    // Initialize team players array
    const initialTeamPlayers = Array(numPlayers)
      .fill()
      .map(() => Array(numRounds).fill(""));
    setTeamPlayers(initialTeamPlayers);
  }, [numPlayers, numRounds]);

  const handleTeamNameChange = (index, newName) => {
    setTeamNames((prevTeamNames) => {
      const updatedTeamNames = [...prevTeamNames];
      updatedTeamNames[index] = newName;
      return updatedTeamNames;
    });
  };

  const handlePlayerSelection = (player) => {
    setSelectedPlayer(player);
  };

  const handlePlayerDraft = () => {
    if (!selectedPlayer.name) {
      // Handle the case where no player is selected
      return;
    }

    const selectedPlayerInfo = availablePlayers.find(
      (p) => p.name === selectedPlayer.name
    );

    if (!selectedPlayerInfo) {
      // Handle the case where the selected player is not found in availablePlayers
      return;
    }

    const updatedTeamPlayers = [...teamPlayers];
    const currentRoundIndex = Math.floor(currentPlayerIndex / numPlayers);
    const currentTeamIndex =
      currentRoundIndex % 2 === 0
        ? currentPlayerIndex % numPlayers
        : numPlayers - 1 - (currentPlayerIndex % numPlayers);

    updatedTeamPlayers[currentTeamIndex][currentRoundIndex] =
      selectedPlayer.name;
    setTeamPlayers(updatedTeamPlayers);

    // Add the selected player and team index to draftedPlayers
    setDraftedPlayers((prevDraftedPlayers) => [
      ...prevDraftedPlayers,
      {
        player: selectedPlayerInfo, // Pass the player object instead of just the name
        position: selectedPlayerInfo.position,
        teamIndex: currentTeamIndex,
        bye: selectedPlayerInfo.bye,
      },
    ]);

    // Remove the selected player from the wishlist
    setWishlist((prevWishlist) =>
      prevWishlist.filter((p) => p.name !== selectedPlayer.name)
    );

    buttonPressed();
    handleNextTurn();
    setSelectedPlayer("");
  };

  const handleNextTurn = () => {
    setCurrentPlayerIndex((prevIndex) => {
      const currentRoundIndex = Math.floor(prevIndex / numPlayers);
      const currentTeamIndex = currentRoundIndex % numPlayers;
      let nextPlayerIndex;

      if (currentTeamIndex === numPlayers - 1) {
        // If it's the last team in the current round, increase the round index by 1
        const nextRoundIndex = currentRoundIndex + 1;

        if (nextRoundIndex >= numRounds) {
          setIsDraftFinished(true);
          alert("Reached the end of the draft");
          return prevIndex;
          // Perform any necessary actions or handle end of draft logic here
        }

        nextPlayerIndex = nextRoundIndex * numPlayers;
      } else {
        // Move to the next team in the current round
        nextPlayerIndex = prevIndex + 1;
      }

      return nextPlayerIndex;
    });
  };

  useEffect(() => {
    const filterAvailablePlayers = () => {
      const allPlayers = [
        ...availablePlayers.map((player) => player.name),
        ...(draftedPlayers.length > 0
          ? draftedPlayers.map((player) => player.name)
          : []),
      ];

      let sortedPlayers;
      if (sortByRank) {
        sortedPlayers = availablePlayers.sort((a, b) => a.rank - b.rank);
      } else if (sortByADP) {
        sortedPlayers = availablePlayers.sort((a, b) => a.adp - b.adp);
      } else {
        sortedPlayers = availablePlayers;
      }

      const filteredPlayers = sortedPlayers.filter(
        (player) =>
          !teamPlayers.some((team) => team.includes(player.name)) &&
          !draftedPlayers.some(
            (draftedPlayer) => draftedPlayer.name === player.name
          ) &&
          (positionFilter === "" || player.position === positionFilter)
      );

      setFilteredPlayers(filteredPlayers);
    };

    filterAvailablePlayers();
  }, [
    teamPlayers,
    draftedPlayers,
    availablePlayers,
    positionFilter,
    sortByADP,
    sortByRank,
  ]);

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
  };

  const handlePositionFilter = (position) => {
    setPositionFilter(position);
  };

  const searchFilteredPlayers = filteredPlayers.filter((player) => {
    const playerName = player.name.toLowerCase();
    const query = searchQuery.toLowerCase();

    return playerName.includes(query);
  });
  ///

  const handleAddToWishlist = (playerInfo) => {
    if (wishlist.some((p) => p.name === playerInfo.name)) {
      setWishlist((prevWishlist) =>
        prevWishlist.filter((p) => p.name !== playerInfo.name)
      );
    } else {
      setWishlist((prevWishlist) => [...prevWishlist, playerInfo]);
    }
  };

  const isPlayerInWishlist = (playerInfo) => {
    return wishlist.some((p) => p.name === playerInfo.name);
  };

  return (
    <div className={styles.draft_board_container}>
      <div className={styles.available_players}>
        <div className={styles.align} style={{ padding: "10px 10px" }}>
          <div
            onClick={() => {
              setSeePlayers(true);
              setSeeRosters(false);
              setSeeWishlist(false);
            }}
            className={styles.categories}
            style={{
              borderLeft: "1px solid white",
              color: !seePlayers ? "gray" : "white",
            }}
          >
            <FaIcons.FaList />
            <span>Available Players</span>
          </div>
          <div
            onClick={() => {
              setSeePlayers(false);
              setSeeRosters(true);
              setSeeWishlist(false);
            }}
            className={styles.categories}
            style={{
              color: !seeRoster ? "gray" : "white",
            }}
          >
            <FaIcons.FaUsers />
            <span>Rosters</span>
          </div>
          <div
            onClick={() => {
              setSeePlayers(false);
              setSeeRosters(false);
              setSeeWishlist(true);
            }}
            className={styles.categories}
            style={{
              color: !seeWishlist ? "gray" : "white",
            }}
          >
            <FaIcons.FaHeart />
            <span>Wishlist</span>
          </div>
        </div>
        {seePlayers ? (
          <div className={styles.available_players}>
            <div
              style={{ borderBottom: "1px solid #f1f1f1" }}
              className={styles.button_div}
            >
              <button
                className={styles.position_buttons}
                onClick={() => handlePositionFilter("")}
              >
                All
              </button>
              <button
                className={styles.position_buttons}
                onClick={() => handlePositionFilter("RB")}
              >
                RB
              </button>
              <button
                className={styles.position_buttons}
                onClick={() => handlePositionFilter("WR")}
              >
                WR
              </button>
              <button
                className={styles.position_buttons}
                onClick={() => handlePositionFilter("QB")}
              >
                QB
              </button>
              <button
                className={styles.position_buttons}
                onClick={() => handlePositionFilter("TE")}
              >
                TE
              </button>
              <button
                className={styles.position_buttons}
                onClick={() => handlePositionFilter("K")}
              >
                K
              </button>
              <button
                className={styles.position_buttons}
                onClick={() => handlePositionFilter("DEF")}
              >
                DEF
              </button>
            </div>
            <input
              type="text"
              placeholder="Search player..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.search}
            />

            <ul className={styles.list}>
              <li
                style={{
                  listStyleType: "none",
                  minWidth: 250,
                }}
              >
                <div
                  style={{ borderTop: "1px solid #f1f1f1", padding: "10 0" }}
                  className={styles.available_players_header}
                >
                  <div
                    style={{ paddingLeft: "0.5rem" }}
                    className={styles.rank_vs_adp}
                    onClick={() => {
                      setSortByRank(true);
                      setSortByADP(false);
                    }}
                  >
                    No.
                  </div>
                  <div>Player</div>
                  <div
                    className={styles.rank_vs_adp}
                    onClick={() => {
                      setSortByRank(false);
                      setSortByADP(true);
                    }}
                    style={{ paddingRight: "1rem" }}
                  >
                    ADP
                  </div>
                </div>
              </li>

              <div className={styles.scrollable}>
                {loading ? (
                  <li style={{ height: 500 }}>
                    <WhistleLoader />
                  </li>
                ) : (
                  <>
                    {searchFilteredPlayers.map((player, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          if (isDraftFinished) return;

                          handlePlayerSelection(player);
                        }}
                        className={
                          selectedPlayer === player ? styles.selected : ""
                        }
                        style={{
                          listStyleType: "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 0",
                          }}
                        >
                          <div
                            style={{
                              paddingLeft: "0.5rem",
                              fontWeight: "bold",
                            }}
                          >
                            {player.rank}.
                          </div>
                          <div>
                            {isPlayerInWishlist(player) ? (
                              <AiIcons.AiFillHeart
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToWishlist(player);
                                }}
                                style={{ color: "#ff0040" }}
                              />
                            ) : (
                              <AiIcons.AiOutlineHeart
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToWishlist(player);
                                }}
                                style={{ color: "#ff0040" }}
                              />
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              minWidth: 150,
                              cursor: "pointer",
                            }}
                          >
                            <span>{player.name}</span>
                            <span style={{ fontSize: 11 }}>
                              {player.position} ({player.team}) - Bye{" "}
                              {player.bye}
                            </span>
                          </div>
                          <BiIcons.BiStats
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setShowStats(true);
                            }}
                          />
                          <span style={{ paddingRight: "0.5rem" }}>
                            {player.adp}.
                          </span>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </div>
            </ul>

            {showStats && (
              <PlayerStats
                player={selectedPlayer}
                setShowStats={setShowStats}
              />
            )}

            {!selectedPlayer ? (
              <button
                style={{
                  margin: "10px 0",
                  padding: "5px 10px",
                  color: "#fff",
                  border: "none",
                  borderRadius: 5,
                  cursor: "not-allowed",
                }}
                onClick={handlePlayerDraft}
                disabled={!selectedPlayer}
              >
                Draft Player
              </button>
            ) : (
              <button
                style={{
                  margin: "10px 0",
                }}
                className={styles.FF_button}
                onClick={handlePlayerDraft}
                disabled={!selectedPlayer}
              >
                Draft Player
              </button>
            )}
          </div>
        ) : null}

        {seeRoster ? (
          <div className={styles.available_players}>
            <>
              <select
                value={selectedTeamIndex}
                onChange={(e) => setSelectedTeamIndex(parseInt(e.target.value))}
                className={styles.team_dropdown}
              >
                <option value={-1}>Select a team</option>
                {teamNames.map((name, index) => (
                  <option key={index} value={index}>
                    {name}
                  </option>
                ))}
              </select>

              {selectedTeamIndex !== -1 && (
                <div className={styles.selected_team_players}>
                  <h4>Players Drafted by {teamNames[selectedTeamIndex]}</h4>
                  {positionSlots.map((position, index) => {
                    const players = selectedTeamPlayers.filter(
                      (p) => p.player.position === position
                    );

                    return (
                      <div key={index}>
                        <h5>{position}</h5>
                        <ul className={styles.list}>
                          {players.map((player, index) => (
                            <li key={index}>
                              {player.player.name} - Bye {player.player.bye}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          </div>
        ) : null}

        {seeWishlist ? (
          <div className={styles.available_players}>
            <h2>Wishlist</h2>
            <ul>
              <li
                style={{
                  listStyleType: "none",
                  minWidth: 250,
                }}
              >
                <div
                  style={{ borderTop: "1px solid #f1f1f1", padding: "10 0" }}
                  className={styles.available_players_header}
                >
                  <div
                    style={{ paddingLeft: "0.5rem" }}
                    className={styles.rank_vs_adp}
                  >
                    No.
                  </div>
                  <div>Player</div>
                  <div
                    className={styles.rank_vs_adp}
                    style={{ paddingRight: "1rem" }}
                  >
                    ADP
                  </div>
                </div>
              </li>
              {wishlist
                .sort((a, b) => a.rank - b.rank) // Sort wishlist by rank number
                .map((player, index) => (
                  <li
                    key={index}
                    style={{
                      listStyleType: "none",
                    }}
                    onClick={() => {
                      if (isDraftFinished) return;

                      handlePlayerSelection(player);
                    }}
                    className={selectedPlayer === player ? styles.selected : ""}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        width: 280,
                      }}
                    >
                      <div style={{ paddingLeft: "0.5rem" }}>
                        {player.rank}.
                      </div>
                      <div>
                        {isPlayerInWishlist(player) ? (
                          <AiIcons.AiFillHeart
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToWishlist(player);
                            }}
                            style={{ color: "#ff0040" }}
                          />
                        ) : (
                          <AiIcons.AiOutlineHeart
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToWishlist(player);
                            }}
                            style={{ color: "#ff0040" }}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: 150,
                          cursor: "pointer",
                        }}
                      >
                        <span>{player.name}</span>
                        <span style={{ fontSize: 11 }}>
                          {player.position} ({player.team}) - Bye {player.bye}
                        </span>
                      </div>
                      <span style={{ paddingRight: "0.5rem" }}>
                        {player.adp}.
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
            {!selectedPlayer ? (
              <button
                style={{
                  margin: "10px 0",
                  padding: "5px 10px",
                  color: "#fff",
                  border: "none",
                  borderRadius: 5,
                  cursor: "not-allowed",
                }}
                onClick={handlePlayerDraft}
                disabled={!selectedPlayer}
              >
                Draft Player
              </button>
            ) : (
              <button
                style={{
                  margin: "10px 0",
                }}
                className={styles.FF_button}
                onClick={handlePlayerDraft}
                disabled={!selectedPlayer}
              >
                Draft Player
              </button>
            )}
          </div>
        ) : null}
      </div>

      <div className={styles.draft_board_table}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className={styles.on_the_clock}>
            {isDraftFinished
              ? "Draft is over!"
              : `${teamNames[teamNameIndex]}'s ON THE CLOCK`}
          </span>
        </div>
        <table className={styles.draft_board_table}>
          <thead>
            <tr>
              {teamNames.map((name, index) => (
                <th
                  key={index}
                  onClick={() => {
                    const newTeamName = prompt("Enter new team name", name);
                    if (newTeamName) {
                      handleTeamNameChange(index, newTeamName);
                    }
                  }}
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numRounds }, (_, roundIndex) => (
              <tr key={roundIndex}>
                {teamPlayers.map((team, teamIndex) => {
                  const player = team[roundIndex];
                  const selectedPlayerInfo = availablePlayers.find(
                    (p) => p.name === player
                  );

                  const cellStyle = {
                    backgroundColor:
                      selectedPlayerInfo && selectedPlayerInfo.position === "RB"
                        ? "#0374e7"
                        : selectedPlayerInfo &&
                          selectedPlayerInfo.position === "WR"
                        ? "#388556"
                        : selectedPlayerInfo &&
                          selectedPlayerInfo.position === "QB"
                        ? "#7d69b3"
                        : selectedPlayerInfo &&
                          selectedPlayerInfo.position === "TE"
                        ? "#d27548 "
                        : selectedPlayerInfo &&
                          selectedPlayerInfo.position === "K"
                        ? "#008298"
                        : selectedPlayerInfo &&
                          selectedPlayerInfo.position === "DEF"
                        ? "#767676"
                        : "lightgrey",
                  };

                  return (
                    <td className={styles.draft_board_pick} key={teamIndex}>
                      {player && (
                        <div
                          className={styles.draft_board_pick_div}
                          style={cellStyle}
                        >
                          <span>
                            {selectedPlayerInfo ? selectedPlayerInfo.name : ""}
                          </span>
                          <span>
                            {selectedPlayerInfo
                              ? `${selectedPlayerInfo.team} - ${selectedPlayerInfo.position}`
                              : ""}
                          </span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DraftBoard;
