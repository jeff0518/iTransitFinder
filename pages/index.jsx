import Head from "next/head";
import Link from "next/link";

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
        <div className={style.headingBox}>
          <h1 className={style.heading}>
            <span className={style.heading_main}>iTransit Finder</span>
            <span className={style.heading_sub}>
              Your Urban Navigation Companion
            </span>
          </h1>
        </div>
        <div className={style.composition}>
          <Link href="/parking">
            <img
              className={style.parking}
              src="/images/background/ParkingLot.jpg"
              alt="停車場"
            />
          </Link>
          <Link href="/bus">
            <img
              className={style.bus}
              src="/images/background/bus.jpg"
              alt="巴士"
            />
          </Link>
          <Link href="mrt">
            <img
              className={style.mrt}
              src="/images/background/MRT.jpg"
              alt="捷運"
            />
          </Link>
          <Link href="bike">
            <img
              className={style.ubike}
              src="/images/background/ubike.jpg"
              alt="uBike"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
