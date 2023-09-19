import { useState, useEffect } from "react";
import { useGoogleMaps } from "@/utils/useGoogleMaps";
import { getTaipeiYouBikeData } from "@/api/getYouBikeAPI";

import Map from "@/components/map/Map";
import SearchBar from "@/components/map/SearchBar";
import ErrorModel from "@/components/error/ErrorModel";
import style from "./index.module.scss";

function BikePage() {
  const { isLoaded } = useGoogleMaps();

  // 抓取API的資料，並每個1分鐘自動更新一次
  const [youBikeData, setYouBikeData] = useState([]);
  const fetchData = async () => {
    try {
      const data = await getTaipeiYouBikeData();
      setYouBikeData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const renderAPI = setInterval(() => {
      fetchData();
    }, 60000);
    return () => {
      clearInterval(renderAPI);
    };
  }, []);
  if (!isLoaded) return <ErrorModel errorName="loading" />;
  return (
    <div className={style.container}>
      <div className={style.container__search}>
        <SearchBar />
      </div>
      <div className={style.container__map}>
        <Map youBikeData={youBikeData} />
      </div>
    </div>
  );
}

export default BikePage;
