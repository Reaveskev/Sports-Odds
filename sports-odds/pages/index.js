import Head from "next/head";
import Image from "next/image";
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

// College Football
// Latest News: http://site.api.espn.com/apis/site/v2/sports/football/college-football/news

//Men College Basketball
// News: http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/news

//Women College Basketball
//News: http://site.api.espn.com/apis/site/v2/sports/basketball/womens-college-basketball/news

export default function Home() {
  return (
    <div>
      <Header />
      <Head>
        <title>Sport Odds</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}></div>
      </main>
    </div>
  );
}
