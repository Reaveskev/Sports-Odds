import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/src/Header";
const inter = Inter({ subsets: ["latin"] });

// Soccer
// Upcoming Games fetch("https://statmilk.bleacherreport.com/api/scores/carousel?league=SOCCER&team=none&carousel_context=league&tz=-25200&appversion=500.0", {
// Latest News: http://site.api.espn.com/apis/site/v2/sports/soccer/:league/news

//  Sports Odds
// Upcoming Games fetch("https://statmilk.bleacherreport.com/api/scores/schedules?date=2023-03-22&league=&appversion=500.0&context=", {
//

export default function Home() {
  return (
    <div>
      <Header />
      <Head>
        <title>Sport Odds</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.description}></div>
      </main>
    </div>
  );
}
