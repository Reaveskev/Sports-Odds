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
  const [error, setError] = useState("");
  const { user, setUser, setAllBets, setAllBetsOutcome } = useAppContext();
  let url = "https://sports-odds.herokuapp.com/login_to_db";
  // let url = "http://127.0.0.1:5000/login_to_db";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios
        .post(url, {
          username,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);

            let url2 = "https://sports-odds.herokuapp.com/seeBets";
            // let url2 = "http://127.0.0.1:5000/seeBets";

            axios.get(url2).then((res) => {
              if (res.status === 200) {
                setAllBets(res.data);
                let url3 = "https://sports-odds.herokuapp.com/seeBetsOutcome";
                // let url3 = "http://127.0.0.1:5000/seeBetsOutcome";
                axios.get(url3).then((res) => {
                  if (res.status === 200) {
                    setAllBetsOutcome(res.data);
                    router.push("/");
                  }
                });
              } else {
                console.log("Did not work as planned");
              }
            });
          } else {
            setError("Invalid username or password!");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.login_container}>
      <Header />
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
