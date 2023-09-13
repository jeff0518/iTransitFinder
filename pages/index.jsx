import Head from "next/head";

import style from "./HomePage.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>iTransit Finder</title>
        <meta
          name="description"
          content="iTransit Finder - Your Urban Navigation Companion"
        />
      </Head>
      <div className={style.header}>
        <h1 className={style.heading}>
          <span className={style.heading_main}>iTransitFinder</span>
          <span className={style.heading_sub}>
            Your Urban Navigation Companion
          </span>
        </h1>
      </div>
    </>
  );
}
