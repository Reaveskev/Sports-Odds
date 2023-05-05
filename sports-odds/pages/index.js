import Head from "next/head";
import Header from "@/src/Header";
import HomePage from "./HomePage";

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
      <main>
        <HomePage />
      </main>
    </div>
  );
}
