import React, { useState, useEffect } from "react";
import styles from "@/styles/draftboard.module.css";
import axios from "axios";
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

  const positionSlots = ["QB", "RB", "WR", "TE", "K", "DST"];

  const url =
    "https://us-central1-fantasy-football-389122.cloudfunctions.net/Google_sheet";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        const fetchedPlayers = data.map(
          ([rank, name, position, team, adp, bye]) => [
            parseInt(rank),
            name,
            position,
            team,
            parseInt(adp),
            bye,
          ]
        );
        setLoading(false);
        setAvailablePlayers(fetchedPlayers);
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
        ...draftedPlayers.map((player) => [player, "", ""]),
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

  return (
    <div className={styles.draft_board_container}>
      <div className={styles.available_players}>
        <h3 className={styles.align}>Available Players</h3>
        <div className={styles.button_div}>
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
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
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
                      <div>{player[0]}.</div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: 150,
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

        <button
          style={{
            margin: "10px 0",
          }}
          onClick={handlePlayerDraft}
          disabled={!selectedPlayer}
        >
          Draft Player
        </button>
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
      </div>

      <div className={styles.draft_board_table}>
        <table className={styles.draft_board_table}>
          <thead>
            <tr>
              <th>
                {isDraftFinished
                  ? "Draft is over!"
                  : `${teamNames[teamNameIndex]}'s Turn`}
              </th>
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
                <td className={styles.draft_board_pick}>
                  Round {roundIndex + 1}
                </td>
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
