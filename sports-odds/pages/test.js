import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/styles/NBA.module.css";
import Header from "@/src/Header";

function Test() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [NBANews, setNBANews] = useState([]);
  const [offseason, setoffseason] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://statmilk.bleacherreport.com/api/scores/schedules?date=2023-03-22&league=&appversion=500.0&context="
      )
      .then((res) => {
        console.log(res.data.game_groups);
      });
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Test;
