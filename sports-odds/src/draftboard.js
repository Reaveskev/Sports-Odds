import React, { useState, useEffect } from "react";
import styles from "@/styles/draftboard.module.css";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import WhistleLoader from "@/src/Loading";

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
        // For WR, TE
        return data.slice(0, 10);
    }
  };

  ///

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const data = response.data;

        // const fetchedPlayers = data.map(
        //   ([rank, name, position, team, adp, bye]) => [
        //     parseInt(rank),
        //     name,
        //     position,
        //     team,
        //     parseInt(adp),
        //     bye,
        //   ]
        // );
        const formattedPlayers = data.map(
          ([rank, name, position, team, adp, bye, ...statsAndProjections]) => {
            let stats;
            let projections;
            if (position === "RB" || position === "QB") {
              statsAndProjections.splice(-2);
              stats = getPlayerStatsByPosition(
                position,
                statsAndProjections.slice(0, 9)
              );
              projections = statsAndProjections.slice(8, -1); // Get projections from index 8 to second to last element
            } else if (position === "WR" || position === "TE") {
              stats = getPlayerStatsByPosition(
                position,
                statsAndProjections.slice(0, 9)
              );
              projections = statsAndProjections.slice(9, -1); // Get projections from index 9 to second to last element
            } else if (position === "K") {
              statsAndProjections.splice(-2);
              stats = getPlayerStatsByPosition(
                position,
                statsAndProjections.slice(0, 6)
              );
              projections = statsAndProjections.slice(6, -1); // Get projections from index 9 to second to last element
            } else {
              statsAndProjections.splice(-2);
              stats = getPlayerStatsByPosition(
                position,
                statsAndProjections.slice(0, 9)
              );
              projections = statsAndProjections.slice(9, -1); // Get projections from index 9 to second to last element
            }

            const outlook = statsAndProjections[statsAndProjections.length - 1]; // Get the last element as outlook

            return {
              rank: parseInt(rank),
              name,
              position,
              team,
              adp: parseInt(adp),
              bye,
              stats: Object.fromEntries(
                stats.map((stat, index) => [`stat${index + 1}`, stat])
              ),
              projections: Object.fromEntries(
                projections.map((projection, index) => [
                  `projection${index + 1}`,
                  projection,
                ])
              ),
              outlook,
            };
          }
        );

        console.log(formattedPlayers);

        ////////
        setLoading(false);
        setAvailablePlayers(formattedPlayers);
        // setAvailablePlayers(fetchedPlayers);
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

  const handlePlayerSelection = (playerName) => {
    setSelectedPlayer(playerName);
  };

  const handlePlayerDraft = () => {
    const selectedPlayerInfo = availablePlayers.find(
      (p) => p[1] === selectedPlayer
    );
    const updatedTeamPlayers = [...teamPlayers];
    const currentRoundIndex = Math.floor(currentPlayerIndex / numPlayers);
    const currentTeamIndex =
      currentRoundIndex % 2 === 0
        ? currentPlayerIndex % numPlayers
        : numPlayers - 1 - (currentPlayerIndex % numPlayers);

    updatedTeamPlayers[currentTeamIndex][currentRoundIndex] = selectedPlayer;
    setTeamPlayers(updatedTeamPlayers);

    // Add the selected player and team index to draftedPlayers
    setDraftedPlayers((prevDraftedPlayers) => [
      ...prevDraftedPlayers,
      {
        player: selectedPlayer,
        position: selectedPlayerInfo[2],
        teamIndex: currentTeamIndex,
        bye: selectedPlayerInfo[5],
      },
    ]);
    // Remove the selected player from the wishlist
    setWishlist((prevWishlist) =>
      prevWishlist.filter((p) => p[1] !== selectedPlayer)
    );
    buttonPressed();
    handleNextTurn();
    setSelectedPlayer("");
  };

  const handleNextTurn = () => {
    const currentRoundIndex = Math.floor(currentPlayerIndex / numPlayers);
    const currentTeamIndex = currentPlayerIndex % numPlayers;
    let nextPlayerIndex;

    if (currentTeamIndex === numPlayers - 1) {
      // If it's the last team in the current round, increase the round index by 1
      const nextRoundIndex = currentRoundIndex + 1;

      setCurrentPlayerIndex(nextRoundIndex * numPlayers);

      if (nextRoundIndex >= numRounds) {
        setIsDraftFinished(true);
        alert("Reached the end of the draft 1");
        return;
        // Perform any necessary actions or handle end of draft logic here
      }

      return;
    }

    // Move to the next team in the current round
    nextPlayerIndex = currentPlayerIndex + 1;

    setCurrentPlayerIndex(nextPlayerIndex % (numPlayers * numRounds));

    if (nextPlayerIndex >= numPlayers * numRounds) {
      alert("Reached the end of the draft 2");
      // Perform any necessary actions or handle end of draft logic here
    }
  };

  useEffect(() => {
    const filterAvailablePlayers = () => {
      const allPlayers = [
        ...availablePlayers,
        ...(draftedPlayers.length > 0
          ? draftedPlayers.map((player) => player.player)
          : []),
      ];

      let sortedPlayers;
      if (sortByRank) {
        sortedPlayers = allPlayers.sort((a, b) => a[0] - b[0]);
      } else if (sortByADP) {
        sortedPlayers = allPlayers.sort((a, b) => a[4] - b[4]);
      } else {
        sortedPlayers = allPlayers;
      }

      const filteredPlayers = sortedPlayers.filter(
        (player) =>
          !teamPlayers.some((team) => team.includes(player[1])) &&
          !draftedPlayers.includes(player[1]) &&
          (positionFilter === "" || player[2] === positionFilter)
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

  const searchFilteredPlayers = filteredPlayers.filter((player) =>
    player[1].toLowerCase().includes(searchQuery.toLowerCase())
  );

  ///

  const handleAddToWishlist = (playerInfo) => {
    if (wishlist.some((p) => p[1] === playerInfo[1])) {
      setWishlist((prevWishlist) =>
        prevWishlist.filter((p) => p[1] !== playerInfo[1])
      );
    } else {
      setWishlist((prevWishlist) => [...prevWishlist, playerInfo]);
    }
  };

  const isPlayerInWishlist = (playerInfo) => {
    return wishlist.some((p) => p[1] === playerInfo[1]);
  };

  ////

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

                          handlePlayerSelection(player[1]);
                        }}
                        className={
                          selectedPlayer === player[1] ? styles.selected : ""
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
                            {player[0]}.
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
                            <span>{player[1]}</span>

                            <span style={{ fontSize: 11 }}>
                              {player[2]} ({player[3]}) - Bye {player[5]}
                            </span>
                          </div>
                          <span style={{ paddingRight: "0.5rem" }}>
                            {player[4]}.
                          </span>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </div>
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
                      (p) => p.position === position
                    );

                    return (
                      <div key={index}>
                        <h5>{position}</h5>
                        <ul className={styles.list}>
                          {players.map((player, index) => (
                            <li key={index}>
                              {player.player} - Bye {player.bye}
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
                .sort((a, b) => a[0] - b[0]) // Sort wishlist by rank number
                .map((player, index) => (
                  <li
                    key={index}
                    style={{
                      listStyleType: "none",
                    }}
                    onClick={() => {
                      if (isDraftFinished) return;

                      handlePlayerSelection(player[1]);
                    }}
                    className={
                      selectedPlayer === player[1] ? styles.selected : ""
                    }
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
                      <div style={{ paddingLeft: "0.5rem" }}>{player[0]}.</div>
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
                        <span>{player[1]}</span>
                        <span style={{ fontSize: 11 }}>
                          {player[2]} ({player[3]}) - Bye {player[5]}
                        </span>
                      </div>
                      <span style={{ paddingRight: "0.5rem" }}>
                        {player[4]}.
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
                  const [rank, name, position, teamname, adp, bye] =
                    availablePlayers.find((p) => p[1] === player) || [];

                  const cellStyle = {
                    backgroundColor:
                      position === "RB"
                        ? "#0374e7"
                        : position === "WR"
                        ? "#388556"
                        : position === "QB"
                        ? "#7d69b3"
                        : position === "TE"
                        ? "#d27548 "
                        : position === "K"
                        ? "#008298"
                        : position === "DEF"
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
                          <span>{name}</span>
                          <span>
                            {teamname} - {position}
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
