import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/profile.module.css";
import Header from "@/src/Header";
import { useAppContext } from "@/src/GlobalContext";
import * as AiIcon from "react-icons/Ai";
import Money_Change from "@/src/Money_change";
import DropboxApp from "@/src/DropboxApp";

function Profile() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [info, setInfo] = useState();
  const [update, setUpdate] = useState(false);
  const [money, setMoney] = useState(false);

  const [findFinal, setFindFinal] = useState(false);

  const {
    user,
    setUser,
    allBets,
    setAllBets,
    allBetsOutcome,
    setAllBetsOutcome,
    setAllTransactions,
    allTransactions,
  } = useAppContext();

  const findSpecifcGame = (oldGames) => {
    if (oldGames) {
      for (let i = 0; i < oldGames.length; i++) {
        if (oldGames[i].name === info.teams) {
          let home = oldGames[i].competitions[0].competitors[0];
          let away = oldGames[i].competitions[0].competitors[1];
          let winner;
          let point_spread;

          if (oldGames[i].status.type.completed !== true) {
            alert("This game is not over yet. Please try again later!");
            setInfo("");
            setFindFinal(false);
            break;
          }
          if (home.winner === true) {
            winner = home.team.name;
          } else {
            winner = away.team.name;
          }
          if (info.money_line_team === home.team.name) {
            point_spread = home.score - away.score;
          } else {
            point_spread = away.score - home.score;
          }
          let temp = {
            money_line: winner,
            point_spread: point_spread,
            total_points: parseInt(home.score) + parseInt(away.score),
          };

          let post = { bet_id: info.bet_id };

          if (info.point_spread) {
            let result = info.point_spread
              .slice(0, info.point_spread.indexOf("("))
              .trim();
            if (result === temp.point_spread) {
              post.point_spread = true;
            } else {
              post.point_spread = false;
            }
          }

          if (info.total_points) {
            let result = info.total_points
              .slice(0, info.total_points.indexOf("("))
              .trim();
            if (result.charAt(0) === "O") {
              if (result.slice(1) > temp.total_points) {
                post.total_points = true;
              }
            } else if (result.charAt(0) === "U") {
              if (result.slice(1) < temp.total_points) {
                post.total_points = false;
              }
            }
          }

          if (info.money_line_team) {
            if (info.money_line_team === temp.money_line) {
              post.money_line = true;
            } else {
              post.money_line = false;
            }
          }

          if (Object.values(post) !== false) {
            post.payout = true;
          } else {
            post.payout = false;
          }

          if (post.payout === true) {
            let update_url =
              "https://sports-odds.herokuapp.com/api/update_money";
            // let update_url = "http://127.0.0.1:5000/api/update_money";
            let fake_money = user.fake_money + info.payout;
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
                    transaction_type: "Won bet",
                    transaction_amount: info.payout,
                    money_in_account: fake_money,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      setAllTransactions(res.data);
                      setInfo("");
                      setFindFinal(false);
                    }
                  });
              });
          }
          let urladd = "https://sports-odds.herokuapp.com/api/addBetOutcome";

          // let urladd = "http://127.0.0.1:5000/api/addBetOutcome";

          axios.post(urladd, post).then((res) => {
            if (res.status === 200) {
              let url3 = "https://sports-odds.herokuapp.com/api/seeBetsOutcome";
              // let url3 = "http://127.0.0.1:5000/api/seeBetsOutcome";
              axios.get(url3).then((res) => {
                if (res.status === 200) {
                  setAllBetsOutcome(res.data);
                }
              });
            }
          });

          // Do something with the matching object
          break; // Exit the loop since we found a match
        }
      }
    }
  };

  const findGame = () => {
    axios
      .get(
        `https://site.api.espn.com/apis/site/v2/sports/${info.sport}/${info.league}/scoreboard?dates=${info.game_date}`
      )
      .then((res) => {
        let oldGames = res.data.events;
        findSpecifcGame(oldGames);
      });
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const clearAll = () => {
    setPassword("");
    setLastName("");
    setFirstName("");
    setUsername("");
  };

  useEffect(() => {
    let url2 = "https://sports-odds.herokuapp.com/api/seeBets";
    // let url2 = "http://127.0.0.1:5000/api/seeBets";
    axios.get(url2).then((res) => {
      if (res.status === 200) {
        setAllBets(res.data);
        let url3 = "https://sports-odds.herokuapp.com/api/seeBetsOutcome";
        // let url3 = "http://127.0.0.1:5000/api/seeBetsOutcome";
        axios.get(url3).then((res) => {
          if (res.status === 200) {
            setAllBetsOutcome(res.data);
            let url4 = "https://sports-odds.herokuapp.com/api/getTransaction";
            // let url4 = "http://127.0.0.1:5000/api/getTransaction";
            axios.get(url4).then((res) => {
              if (res.status === 200) {
                setAllTransactions(res.data);
              }
            });
          }
        });
      } else {
        console.log("Did not work as planned");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "https://sports-odds.herokuapp.com/api/update_info";
    // let url = "http://127.0.0.1:5000/api/update_info";

    try {
      if (username === "") {
        setUsername(user.username);
      }
      if (firstName === "") {
        setFirstName(user.f_name);
      }
      if (lastName === "") {
        setLastName(user.l_name);
      }
      if (password === "") {
        setPassword(user.password);
      }

      const response = await axios
        .post(url, {
          username,
          password,
          firstName,
          lastName,
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);
            setUpdate(!update);
          } else {
            setError("Invalid username or password!");
          }
        });
    } catch (error) {
      console.log(error);
    }
    clearAll();
  };

  return (
    <>
      <Header />
      <div className={styles.profile_container}>
        <div className={styles.profile_header}>
          {user ? (
            <>
              <div className={styles.profile_title}>
                <h1>Profile</h1>
                <h5
                  style={{ color: "#0047AB", cursor: "pointer" }}
                  onClick={() => setUpdate(!update)}
                >
                  Edit?
                </h5>
              </div>
              {user.image === null ? (
                <img
                  height={225}
                  width={225}
                  alt="default"
                  src={"/out/default.png"}
                />
              ) : (
                <img height={225} width={225} alt="avatar" src={user.image} />
              )}

              <h2>{user.username}</h2>
              <h3>
                {user.f_name} {user.l_name}
              </h3>
              <h3>Fake Money: ${user.fake_money}</h3>
              <h4
                style={{ color: "#0047AB", cursor: "pointer" }}
                onClick={() => setMoney(!money)}
              >
                Deposit/Withdraw
              </h4>
              {money ? <Money_Change setMoney={setMoney} /> : null}
            </>
          ) : null}
        </div>

        {update ? (
          <div className={styles.update_container}>
            <div className={styles.update_div_container}>
              <div className={styles.profile_body}>
                <form onSubmit={handleSubmit}>
                  <div className={styles.update_header}>
                    <h2>Account Information</h2>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setUpdate(false)}
                    >
                      cancel
                    </span>
                  </div>
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    id="firstname"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    id="lastname"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                  <button type="submit">Save Changes</button>
                </form>
              </div>
              <DropboxApp />
            </div>
          </div>
        ) : null}

        {findFinal ? (
          <div>
            <button
              className={styles.findGame}
              onClick={() => {
                findGame();
              }}
            >
              Find Results
            </button>
          </div>
        ) : null}

        {allBets ? (
          <div className={styles.table_div}>
            <h2 style={{ paddingTop: 20 }}>Your Bets</h2>
            <table className={styles.bet_table}>
              <thead>
                <tr>
                  <th className={styles.bet_table_header}>Teams</th>
                  <th className={styles.bet_table_header}>Point Spread</th>
                  <th className={styles.bet_table_header}>Total Points</th>
                  <th className={styles.bet_table_header}>Money Line</th>
                  <th className={styles.bet_table_header}>Bet Amount</th>
                  <th className={styles.bet_table_header}>Payout</th>
                </tr>
              </thead>
              <tbody>
                {allBets.map((bet, index) => {
                  return (
                    <tr
                      onClick={() => {
                        if (!allBetsOutcome[index]) {
                          if (info) {
                            setInfo("");
                            setFindFinal(false);
                          } else {
                            setInfo(bet);
                            setFindFinal(true);
                          }
                        }
                      }}
                      key={bet.bet_id}
                      className={styles.bet_table_row}
                      style={{
                        backgroundColor: info
                          ? info.bet_id === bet.bet_id
                            ? "#424242"
                            : null
                          : null,
                      }}
                    >
                      <td className={styles.bet_table_cell}>{bet.teams}</td>
                      <td className={styles.bet_table_cell}>
                        {!allBetsOutcome[index]?.point_spread ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {bet.point_spread}
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <AiIcon.AiFillCheckCircle
                              style={{ marginRight: 10 }}
                              color="green"
                            />
                            {bet.point_spread}
                          </div>
                        )}
                      </td>
                      <td className={styles.bet_table_cell}>
                        {!allBetsOutcome[index]?.total_points ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {bet.total_points}
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <AiIcon.AiFillCheckCircle
                              style={{ marginRight: 10 }}
                              color="green"
                            />
                            {bet.total_points}
                          </div>
                        )}
                      </td>
                      <td className={styles.bet_table_cell}>
                        {!allBetsOutcome[index]?.money_line ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {bet.money_line} {bet.money_line_team}
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <AiIcon.AiFillCheckCircle
                              style={{ marginRight: 10 }}
                              color="green"
                            />
                            {bet.money_line} {bet.money_line_team}
                          </div>
                        )}
                      </td>
                      <td className={styles.bet_table_cell}>
                        ${bet.bet_amount}
                      </td>
                      <td className={styles.bet_table_cell}>
                        {!allBetsOutcome[index]?.payout ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            ${bet.payout}
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <AiIcon.AiFillCheckCircle
                              style={{ marginRight: 10 }}
                              color="green"
                            />
                            ${bet.payout}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
        {allTransactions ? (
          <div className={styles.table_div}>
            <h2 style={{ paddingTop: 20 }}>Transaction History</h2>
            <table className={styles.transaction_table}>
              <thead>
                <tr>
                  <th className={styles.bet_table_header}>Date</th>
                  <th className={styles.bet_table_header}>Type</th>
                  <th className={styles.bet_table_header}>Amount</th>
                  <th className={styles.bet_table_header}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.map((transaction) => (
                  <tr
                    key={transaction.transaction_id}
                    className={styles.bet_table_row}
                  >
                    <td className={styles.bet_table_cell}>
                      {transaction.date}
                    </td>
                    <td className={styles.bet_table_cell}>
                      {transaction.transaction_type}
                    </td>
                    <td className={styles.bet_table_cell}>
                      {transaction.transaction_amount}
                    </td>
                    <td className={styles.bet_table_cell}>
                      ${transaction.money_in_account}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Profile;
