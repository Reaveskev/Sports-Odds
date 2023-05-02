import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/src/Header";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sport Odds</title>
        <meta name="description" content="Sports news and odds" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <link rel="shortcut icon" href="/out/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Source+Sans+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />

      <main className={styles.main}>
        <div className={styles.description}></div>
      </main>
    </div>
  );
}
