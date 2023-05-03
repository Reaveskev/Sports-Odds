import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/login.module.css";
import Header from "@/src/Header";
import { useAppContext } from "@/src/GlobalContext";

function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [error, setError] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const {
    user,
    setUser,
    setAllBets,
    setAllBetsOutcome,
    setAllTransactions,
    allTransactions,
  } = useAppContext();
  let url = "https://sports-odds.herokuapp.com/api/login_to_db";
  let url2 = "https://sports-odds.herokuapp.com/api/seeBets";
  let url3 = "https://sports-odds.herokuapp.com/api/seeBetsOutcome";
  let url4 = "https://sports-odds.herokuapp.com/api/create_user";
  let url5 = "https://sports-odds.herokuapp.com/api/getTransaction";
  // let url = "http://127.0.0.1:5000/api/login_to_db";
  // let url2 = "http://127.0.0.1:5000/api/seeBets";
  // let url3 = "http://127.0.0.1:5000/api/seeBetsOutcome";
  // let url4 = "http://127.0.0.1:5000/api/create_user";
  // let url5 = "http://127.0.0.1:5000/api/getTransaction";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCreatingAccount) {
      try {
        const response1 = await axios.post(url4, {
          username: username,
          password: password,
          f_name: f_name,
          l_name: l_name,
        });
        if (response1.status === 200) {
          setUser(response1.data);
          router.push("/");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response1 = await axios.post(url, { username, password });
        const response2 = await axios.get(url2);
        const response3 = await axios.get(url3);
        const response4 = await axios.get(url5);

        if (response1.status === 200) {
          setUser(response1.data);
        }
        if (response2.status === 200) {
          setAllBets(response2.data);
        }
        if (response3.status === 200) {
          setAllBetsOutcome(response3.data);
        }
        if (response4.status === 200) {
          setAllTransactions(response4.data);
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        setError("Invalid username or password!");
      }
    }
  };

  return (
    <>
      <Header />
      <div className={styles.login_container}>
        <h1>{isCreatingAccount ? "Create Account" : "Login"}</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.form_control}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              required
            />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </div>
          {isCreatingAccount && (
            <>
              <div className={styles.form_control}>
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="First Name"
                  value={f_name}
                  onChange={(e) => {
                    setF_name(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
              <div className={styles.form_control}>
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Last Name"
                  value={l_name}
                  onChange={(e) => {
                    setL_name(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
            </>
          )}
          <button type="submit">
            {isCreatingAccount ? "Create Account" : "Login"}
          </button>
          <div style={{ paddingTop: 30 }}>
            <p>
              {isCreatingAccount
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                className={styles.create}
                onClick={() => setIsCreatingAccount(!isCreatingAccount)}
                style={{
                  background: "none",
                  border: "none",
                  margin: 0,
                  padding: 0,
                  fontWeight: "lighter",
                  cursor: "pointer",
                }}
              >
                {isCreatingAccount ? "Login" : "Create Account"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
