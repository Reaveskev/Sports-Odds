import { useState, useEffect } from "react";
import WhistleLoader from "@/src/Loading";
import Scoreboard from "@/src/Scoreboard";
import styles from "@/styles/NBA.module.css";
import Odds from "@/src/Odds";
import axios from "axios";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [featuredSportsOdds, setFeaturedSportsOdds] = useState([]);

  const welcome = `Welcome to our sports news and betting website! Here you can stay up-to-date with the latest news and standings for all your favorite sports. You can also place bets using fake money and receive payouts if you win. We track all the bets you make, and you can easily see your transaction history for withdrawals and deposits. You can also set your profile picture using Dropbox, and show off your favorite team's logo! We use various technologies like Flask, next.js, MySQL, Selenium, and Beautifulsoup to provide you with accurate and timely information. But don't worry, you don't need to be a tech expert to use our website. Just sit back, relax, and enjoy the latest sports news and betting odds!`;

  useEffect(() => {
    async function loadPageData() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      try {
        const [response1, response2] = await Promise.all([
          axios.get(
            `https://statmilk.bleacherreport.com/api/scores/schedules?date=${formattedDate}&appversion=500.0&context=`
          ),
          axios.get("https://sports-odds.herokuapp.com/api/featured"),
          // axios.get("http://127.0.0.1:5000/api/featured"),
        ]);

        let data = response1.data.game_groups;

        let gamesArr = [];

        data.forEach((item) => {
          if (item.games) {
            gamesArr.push(...item.games);
          }
        });

        let gamesObj = { games: gamesArr };
        setInprogress(gamesObj);
        console.log(response1.data);
        setFeaturedSportsOdds(response2.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadPageData();
  }, []);

  return (
    <div>
      {loading ? (
        <>
          <WhistleLoader />
        </>
      ) : (
        <>
          {inprogress ? (
            <Scoreboard
              inprogress={inprogress}
              upcoming={upcoming}
              completed={completed}
            />
          ) : null}
          <div className={styles.news}>
            <h1 className={styles.upcoming}>Welcome to Sports Odds</h1>
            <div className={styles.welcome}>
              <p>{welcome}</p>
            </div>
          </div>

          {featuredSportsOdds ? (
            <Odds featuredSportsOdds={featuredSportsOdds} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default HomePage;
