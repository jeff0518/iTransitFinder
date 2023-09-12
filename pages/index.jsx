import Head from "next/head";

import style from "../styles/HomePage.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>iTransit Finder</title>
        <meta
          name="description"
          content="iTransit Finder - Your Urban Navigation Companion"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.header}></div>
    </>
  );
}
