import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/bet.module.css";
import { useAppContext } from "./GlobalContext";
import * as AiIcon from "react-icons/Ai";

const Bet = ({ setOpenBet, game_ids, game_over_ids, completed }) => {
  const { betInfo, user, allBets, setAllBets } = useAppContext();
  const [potential, setPotential] = useState();
  const [moneyline, setMoneyline] = useState();
  const [pointSpread, setPointSpread] = useState();
  const [totalPoints, setTotalPoints] = useState();
  const [betAmount, setbetAmount] = useState();
  const [message, setMessage] = useState();

  function handleBetAmountChange(event) {
    setbetAmount(event.target.value);
  }

  //
  function test(words) {
    var n = words.split(" ");
    return n[n.length - 1];
  }

  let teams = betInfo[1] + " vs " + betInfo[7];

  let teamName = test(allBets[0].teams);
  let matchingKey;
  let matchingKey2;

  useEffect(() => {
    if (Object.keys(game_over_ids).length !== 0) {
      for (const key in game_over_ids) {
        if (game_over_ids[key].some((value) => value.includes(teamName))) {
          matchingKey = key;
          // console.log(matchingKey);
          break;
        }
      }
    }

    if (Object.keys(game_ids).length !== 0) {
      for (const key in game_ids) {
        if (game_ids[key].some((value) => value.includes(teamName))) {
          matchingKey2 = key;
          // console.log(matchingKey2);
          break;
        }
      }
    }

    if (Object.keys(completed).length !== 0) {
      if (completed.games.some((obj) => obj.id === matchingKey)) {
        let filteredData = completed.games.filter(
          (obj) => obj.id === matchingKey
        );

        let game_over_stats = {
          Team1: filteredData[0].team_one.name,
          Team2: filteredData[0].team_two.name,
          "Total score":
            parseInt(filteredData[0].team_one.score) +
            parseInt(filteredData[0].team_two.score),

          "Point Spread":
            parseInt(filteredData[0].team_one.score) -
            parseInt(filteredData[0].team_two.score),
          Winner:
            parseInt(filteredData[0].team_one.score) >
            parseInt(filteredData[0].team_two.score)
              ? filteredData[0].team_one.name
              : filteredData[0].team_two.name,
        };
      }
    }
  }, [game_over_ids, game_over_ids]);

  const addBet = async (
    teams,
    moneyline,
    pointSpread,
    totalPoints,
    potential,
    betAmount
  ) => {
    // let url = "https://sports-odds.herokuapp.com/addBet";
    let url = "http://127.0.0.1:5000/addBet";
    try {
      const response = await axios
        .post(url, {
          teams: teams,
          moneyline: moneyline,
          pointSpread: pointSpread,
          totalPoints: totalPoints,
          parlayPayout: potential,
          betAmount: betAmount,
        })
        .then((res) => {
          if (res.status === 200) {
            setMessage("Your bet has been added to your account!");
            setTimeout(() => {
              setPotential();
              setMoneyline();
              setPointSpread();
              setTotalPoints();
              setbetAmount();
              setOpenBet(false);
            }, "3000");
            let url2 = "http://127.0.0.1:5000/seeBets";

            axios.get(url2).then((res) => {
              if (res.status === 200) {
                setAllBets(res.data);
              }
            });
          } else {
            console.log(res);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  function calculateParlayPayout(
    betAmount,
    moneyline,
    pointSpread,
    totalPoints
  ) {
    let parlayPayout = parseInt(betAmount);

    if (moneyline !== undefined && moneyline !== "") {
      let moneylineOdds = parseInt(moneyline);
      // Calculate the moneyline factor
      let moneylineFactor;
      if (moneylineOdds > 0) {
        moneylineFactor = 1 + moneylineOdds / 100;
      } else {
        moneylineFactor = 1 + 100 / Math.abs(moneylineOdds);
      }
      parlayPayout *= moneylineFactor;
    }

    if (pointSpread !== undefined && pointSpread !== "") {
      let spreadOdds = parseInt(pointSpread.slice(-5, -1));
      if (isNaN(spreadOdds) !== true) {
        // Calculate the spread factor
        let spreadFactor;
        if (spreadOdds > 0) {
          spreadFactor = 1 + spreadOdds / 100;
        } else {
          spreadFactor = 1 + 100 / Math.abs(spreadOdds);
        }
        parlayPayout *= spreadFactor;
      }
    }

    if (totalPoints !== undefined && moneyline !== "") {
      // Calculate the total points factor

      let totalPointsOdds = parseInt(totalPoints.slice(-5, -1));
      if (isNaN(totalPointsOdds) !== true) {
        console.log(totalPointsOdds);
        let totalPointsFactor;
        if (totalPointsOdds > 0) {
          totalPointsFactor = 1 + totalPointsOdds / 100;
        } else {
          totalPointsFactor = 1 + 100 / Math.abs(totalPointsOdds);
        }

        parlayPayout *= totalPointsFactor;
      }
    }

    return setPotential("$" + parlayPayout.toFixed(2));
  }

  return (
    <div className={styles.bets_container}>
      <div
        style={{
          display: "block",
          fontSize: 14,
          backgroundColor: "white",
          borderRadius: 10,
          height: "auto",
          width: 334,
          margin: "15% auto",
        }}
      >
        <span onClick={() => setOpenBet(false)} style={{ color: "black" }}>
          <AiIcon.AiFillCloseCircle
            style={{ margin: 10, cursor: "pointer" }}
            size={20}
          />
        </span>
        {message ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "green" }}>{message}</span>
          </div>
        ) : null}
        <div style={{ display: "flex", color: "black" }}>
          <div style={{ padding: 15 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img srcSet={betInfo[0]}></img>

              <div
                style={{
                  padding: 5,
                  whiteSpace: "nowrap",
                }}
              >
                {betInfo[1]}
              </div>
            </div>
            {/* <div style={{ color: "black" }}>{betInfo[2]}</div>; */}
            <div
              style={{
                padding: 5,
                borderRadius: 10,
                width: 100,
              }}
            >
              <input
                onClick={() => {
                  if (moneyline === betInfo[3]) {
                    setMoneyline("");
                  } else {
                    setMoneyline(betInfo[3]);
                  }
                }}
                checked={moneyline === betInfo[3]}
                type="checkbox"
                style={{ marginRight: "10px", cursor: "pointer" }}
              />{" "}
              {betInfo[3]}
            </div>
            <div
              style={{
                padding: 5,
                borderRadius: 10,
                width: 140,
              }}
            >
              <input
                style={{ marginRight: "10px", cursor: "pointer" }}
                type="checkbox"
                onClick={() => {
                  if (pointSpread === betInfo[4]) {
                    setPointSpread("");
                  } else {
                    setPointSpread(betInfo[4]);
                  }
                }}
                checked={pointSpread === betInfo[4]}
              ></input>
              {betInfo[4]}
            </div>
            <div
              style={{
                padding: 5,
                borderRadius: 10,
                width: 120,
              }}
            >
              <input
                style={{ marginRight: "10px", cursor: "pointer" }}
                type="checkbox"
                onClick={() => {
                  if (totalPoints === betInfo[5]) {
                    setTotalPoints("");
                  } else {
                    setTotalPoints(betInfo[5]);
                  }
                }}
                checked={totalPoints === betInfo[5]}
              ></input>
              {betInfo[5]}
            </div>
          </div>
          <div style={{ padding: 15, color: "black" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img style={{}} srcSet={betInfo[6]}></img>
              <div
                style={{
                  padding: 5,
                }}
              >
                {betInfo[7]}
              </div>
            </div>
            {/* <div style={{ color: "black" }}>{betInfo[8]}</div> */}
            <div
              style={{
                padding: 5,
                borderRadius: 10,
                width: 100,
              }}
            >
              <input
                style={{ marginRight: "10px", cursor: "pointer" }}
                type="checkbox"
                onClick={() => {
                  if (moneyline === betInfo[9]) {
                    setMoneyline("");
                  } else {
                    setMoneyline(betInfo[9]);
                  }
                }}
                checked={moneyline === betInfo[9]}
              ></input>
              {betInfo[9]}
            </div>
            <div
              style={{
                padding: 5,
                borderRadius: 10,
                width: 135,
              }}
            >
              <input
                style={{ marginRight: "10px", cursor: "pointer" }}
                type="checkbox"
                onClick={() => {
                  if (pointSpread === betInfo[10]) {
                    setPointSpread("");
                  } else {
                    setPointSpread(betInfo[10]);
                  }
                }}
                checked={pointSpread === betInfo[10]}
              ></input>
              {betInfo[10]}
            </div>
            <div
              style={{
                padding: 5,
                borderRadius: 10,
                width: 120,
              }}
            >
              <input
                style={{ marginRight: "10px", cursor: "pointer" }}
                type="checkbox"
                onClick={() => {
                  if (totalPoints === betInfo[11]) {
                    setTotalPoints("");
                  } else {
                    setTotalPoints(betInfo[11]);
                  }
                }}
                checked={totalPoints === betInfo[11]}
              ></input>
              {betInfo[11]}
            </div>
          </div>
        </div>
        <span
          style={{
            color: "black",
            padding: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          Your projections: {moneyline}
          {pointSpread}
          {totalPoints}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "black" }}>How much do you want to bet? $</span>
          <input
            className={styles.money_input}
            onChange={handleBetAmountChange}
            value={betAmount}
            type="text"
          ></input>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            style={{ margin: 10, cursor: "pointer" }}
            onClick={() =>
              calculateParlayPayout(
                betAmount,
                moneyline,
                pointSpread,
                totalPoints
              )
            }
          >
            Calculate
          </button>
          <span style={{ color: "black" }}>Potential payout: {potential}</span>
        </div>
        {potential ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {user ? (
              <button
                onClick={() => {
                  addBet(
                    teams,
                    moneyline,
                    pointSpread,
                    totalPoints,
                    potential,
                    betAmount
                  );
                }}
                style={{ margin: 10, cursor: "pointer" }}
              >
                Add to bets
              </button>
            ) : (
              <span style={{ color: "black", paddingBottom: 10 }}>
                Sign in to add bet to your account!
              </span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Bet;
