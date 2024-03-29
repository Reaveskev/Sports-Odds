import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/bet.module.css";
import { useAppContext } from "./GlobalContext";
import * as AiIcon from "react-icons/ai";

const Bet = ({ setOpenBet }) => {
  const { betInfo, user, setUser, allBets, setAllBets } = useAppContext();
  const [potential, setPotential] = useState();
  const [moneyline, setMoneyline] = useState();
  const [moneyline_team, setMoneyline_team] = useState();
  const [pointSpread, setPointSpread] = useState();
  const [totalPoints, setTotalPoints] = useState();
  const [betAmount, setbetAmount] = useState();
  const [gameDate, setGameDate] = useState();
  const [sport, setSport] = useState();
  const [league, setLeague] = useState();
  const [message, setMessage] = useState();

  function handleBetAmountChange(event) {
    setbetAmount(event.target.value);
  }

  function test(words) {
    var n = words.split(" ");
    return n[n.length - 1];
  }
  let teams = betInfo[1] + " at " + betInfo[7];
  useEffect(() => {
    let today = new Date();
    let yy = String(today.getFullYear());
    let givenDate;
    if (betInfo[12].length < 15) {
      let day = String(today.getDate());
      let month = String(today.getMonth() + 1);
      givenDate = month + day;
    } else {
      givenDate = betInfo[12];
      givenDate = givenDate.slice(5, -9);
    }
    if (givenDate[4] === ",") {
      givenDate = "0" + givenDate;
      let month = givenDate.slice(0, 2);
      let day = givenDate.slice(-3, -1);
      givenDate = month + day;
    } else if (givenDate.length < 5) {
      givenDate = "0" + givenDate;
      let month = givenDate.slice(0, 2);
      let day = givenDate.slice(-2);
      givenDate = month + day;
    } else {
      let month = givenDate.slice(0, 2);
      let day = givenDate.slice(-2);
      givenDate = month + day;
    }

    let fullDate = yy + givenDate;
    setGameDate(fullDate);
    setLeague(betInfo[13]);
    setSport(betInfo[14]);
  }, []);

  const addBet = async (
    teams,
    moneyline,
    moneyline_team,
    pointSpread,
    totalPoints,
    potential,
    betAmount,
    gameDate,
    league,
    sport
  ) => {
    if (moneyline === "") {
      setMoneyline(null);
      setMoneyline_team(null);
    }
    if (pointSpread === "") {
      setPointSpread(null);
    }
    if (totalPoints === "") {
      setTotalPoints(null);
    }

    let url = "https://sports-odds.herokuapp.com/api/addBet";
    // let url = "http://127.0.0.1:5000/api/addBet";
    if (betAmount > user.fake_money) {
      alert(
        `You are trying to bet more fake money than you have. Please try again with a lower bet amount. You have $${user.fake_money} available.`
      );
      return;
    }
    try {
      const response = await axios
        .post(url, {
          teams: teams,
          moneyline: moneyline,
          moneyline_team: moneyline_team,
          pointSpread: pointSpread,
          totalPoints: totalPoints,
          parlayPayout: potential,
          betAmount: betAmount,
          gameDate: gameDate,
          league: league,
          sport: sport,
        })
        .then((res) => {
          if (res.status === 200) {
            setMessage("Your bet has been added to your account!");

            setTimeout(() => {
              setPotential();
              setMoneyline();
              setMoneyline_team();
              setPointSpread();
              setTotalPoints();
              setbetAmount();
              setOpenBet(false);
            }, "3000");

            let url2 = "https://sports-odds.herokuapp.com/api/seeBets";
            // let url2 = "http://127.0.0.1:5000/api/seeBets";

            axios.get(url2).then((res) => {
              if (res.status === 200) {
                setAllBets(res.data);
                let update_url =
                  "https://sports-odds.herokuapp.com/api/update_money";
                // let update_url = "http://127.0.0.1:5000/api/update_money";
                let fake_money = user.fake_money - betAmount;
                axios
                  .post(update_url, {
                    fake_money,
                  })
                  .then((res) => {
                    if (res.status === 200) setUser(res.data);
                    const today = new Date();
                    const day = String(today.getDate()).padStart(2, "0");
                    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
                    const year = today.getFullYear();

                    const date = `${month}/${day}/${year}`;
                    // let new_transaction =
                    //   "http://127.0.0.1:5000/api/addTransaction";
                    let new_transaction =
                      "https://sports-odds.herokuapp.com/api/addTransaction";
                    axios
                      .post(new_transaction, {
                        date: date,
                        transaction_type: "Placed bet",
                        transaction_amount: betAmount,
                        money_in_account: fake_money,
                      })
                      .then((res) => {
                        if (res.status === 200) {
                          setAllTransactions(res.data);
                        }
                      });
                  });
              }
            });
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
        let totalPointsFactor;
        if (totalPointsOdds > 0) {
          totalPointsFactor = 1 + totalPointsOdds / 100;
        } else {
          totalPointsFactor = 1 + 100 / Math.abs(totalPointsOdds);
        }

        parlayPayout *= totalPointsFactor;
      }
    }

    return setPotential(parlayPayout.toFixed(2));
  }

  let header1, header2, header3;
  if (moneyline) {
    if (moneyline === betInfo[3]) {
      header1 = `${betInfo[15]} ${moneyline}`;
    } else {
      header1 = `${betInfo[16]} ${moneyline}`;
    }
  }
  if (pointSpread) {
    if (pointSpread === betInfo[4]) {
      header2 = `${betInfo[15]} ${pointSpread}`;
    } else {
      header2 = `${betInfo[16]} ${pointSpread}`;
    }
  }

  if (totalPoints) {
    if (totalPoints === betInfo[5]) {
      header3 = `${betInfo[15]} ${totalPoints}`;
    } else {
      header3 = `${betInfo[16]} ${totalPoints}`;
    }
  }

  return (
    <div className={styles.bets_container}>
      <div className={styles.div_container} style={{ width: 460 }}>
        <span onClick={() => setOpenBet(false)} style={{ color: "white" }}>
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
        <div
          style={{ display: "flex", color: "white", flexDirection: "column" }}
        >
          <div style={{ padding: 15, textAlign: "center" }}>
            <h3 style={{ paddingBottom: 6 }}>Select your bets!</h3>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Money</th>
                  <th>Spread</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
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
                  </td>
                  <td
                    onClick={() => {
                      if (moneyline === betInfo[3]) {
                        setMoneyline("");
                        setMoneyline_team("");
                      } else {
                        setMoneyline(betInfo[3]);
                        setMoneyline_team(test(betInfo[1]));
                      }
                    }}
                  >
                    <div
                      className={styles.cells}
                      style={{
                        backgroundColor:
                          moneyline === betInfo[3] ? "#393939" : null,
                      }}
                    >
                      {betInfo[3]}
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      if (pointSpread === betInfo[4]) {
                        setPointSpread("");
                      } else {
                        setPointSpread(betInfo[4]);
                      }
                    }}
                  >
                    <div
                      className={styles.cells}
                      style={{
                        backgroundColor:
                          pointSpread === betInfo[4] ? "#393939" : null,
                      }}
                    >
                      {betInfo[4]}
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      if (totalPoints === betInfo[5]) {
                        setTotalPoints("");
                      } else {
                        setTotalPoints(betInfo[5]);
                      }
                    }}
                  >
                    <div
                      className={styles.cells}
                      style={{
                        backgroundColor:
                          totalPoints === betInfo[5] ? "#393939" : null,
                      }}
                    >
                      {betInfo[5]}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img srcSet={betInfo[6]}></img>
                      <div
                        style={{
                          padding: 5,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {betInfo[7]}
                      </div>
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      if (moneyline === betInfo[9]) {
                        setMoneyline("");
                        setMoneyline_team("");
                      } else {
                        setMoneyline(betInfo[9]);
                        setMoneyline_team(test(betInfo[7]));
                      }
                    }}
                  >
                    <div
                      className={styles.cells}
                      style={{
                        backgroundColor:
                          moneyline === betInfo[9] ? "#393939" : null,
                      }}
                    >
                      {betInfo[9]}
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      if (pointSpread === betInfo[10]) {
                        setPointSpread("");
                      } else {
                        setPointSpread(betInfo[10]);
                      }
                    }}
                  >
                    <div
                      className={styles.cells}
                      style={{
                        backgroundColor:
                          pointSpread === betInfo[10] ? "#393939" : null,
                      }}
                    >
                      {betInfo[10]}
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      if (totalPoints === betInfo[11]) {
                        setTotalPoints("");
                      } else {
                        setTotalPoints(betInfo[11]);
                      }
                    }}
                  >
                    <div
                      className={styles.cells}
                      style={{
                        backgroundColor:
                          totalPoints === betInfo[11] ? "#393939" : null,
                      }}
                    >
                      {betInfo[11]}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white" }}>
              How much do you want to bet? $
            </span>
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
              className={styles.calc_button}
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
          </div>
          {potential ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  color: "white",
                  padding: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Your projections: {header1} {header2} {header3}
              </span>
              <span style={{ color: "white", padding: 10 }}>
                Potential payout: ${potential}
              </span>
              {user ? (
                <button
                  onClick={() => {
                    addBet(
                      teams,
                      moneyline,
                      moneyline_team,
                      pointSpread,
                      totalPoints,
                      potential,
                      betAmount,
                      gameDate,
                      league,
                      sport
                    );
                  }}
                  className={styles.addbutton}
                >
                  Add to bets
                </button>
              ) : (
                <span style={{ color: "white", paddingBottom: 10 }}>
                  Sign in to add bet to your account!
                </span>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Bet;
