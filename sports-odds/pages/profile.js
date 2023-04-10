import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/profile.module.css";
import Header from "@/src/Header";
import { useAppContext } from "@/src/GlobalContext";
import * as AiIcon from "react-icons/Ai";
import * as RxIcon from "react-icons/Rx";

function Profile() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const {
    user,
    setUser,
    allBets,
    setAllBets,
    allBetsOutcome,
    setAllBetsOutcome,
  } = useAppContext();

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

  // function test(words) {
  //   var n = words.split(" ");
  //   return n[n.length - 1];
  // }

  // let teamName = test(betInfo[1]);
  useEffect(() => {
    // let url2 = "https://sports-odds.herokuapp.com/seeBets";
    // // let url2 = "http://127.0.0.1:5000/seeBets";
    // axios.get(url2).then((res) => {
    //   if (res.status === 200) {
    //     setAllBets(res.data);
    //   } else {
    //     console.log("Did not work as planned");
    //   }
    // console.log(res);
    // });
    //////////////////
    // let url2 = "http://127.0.0.1:5000/seeBets";
    // axios.get(url2).then((res) => {
    //   if (res.status === 200) {
    //     setAllBets(res.data);
    //     // let url3 = "https://sports-odds.herokuapp.com/seeBetsOutcome";
    //     let url3 = "http://127.0.0.1:5000/seeBetsOutcome";
    //     axios.get(url3).then((res) => {
    //       if (res.status === 200) {
    //         setAllBetsOutcome(res.data);
    //       }
    //     });
    //   } else {
    //     console.log("Did not work as planned");
    //   }
    // });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "https://sports-odds.herokuapp.com/update_info";
    // let url = "http://127.0.0.1:5000/update_info";

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
            <h1>
              {user.f_name} {user.l_name}
            </h1>
          ) : null}
        </div>
        <div className={styles.profile_body}>
          <form onSubmit={handleSubmit}>
            <h2>Account Information</h2>
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
        {allBets ? (
          <>
            <h2 style={{ paddingTop: 50 }}>Your Bets</h2>
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
                  // let outcome = allBetsOutcome[index] || "TBD"
                  return (
                    <tr key={bet.bet_id} className={styles.bet_table_row}>
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
                            {bet.money_line}
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
                            {bet.money_line}
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
                            {/* <RxIcon.RxCross2
                              style={{ marginRight: 10 }}
                              color="red"
                            /> */}
                            {bet.payout}
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
                            {bet.payout}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Profile;
