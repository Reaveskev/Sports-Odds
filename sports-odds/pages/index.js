import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/src/Header";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Header />
      <Head>
        <title>Sport Odds</title>
        <meta name="description" content="Sports news and odds" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <link rel="shortcut icon" href="/out/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.description}></div>
      </main>
    </div>
  );
}
