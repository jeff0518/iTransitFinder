import { useState, useEffect, useContext } from "react";
import { useGoogleMaps } from "@/utils/useGoogleMaps";
import { getTaipeiBusStationData } from "@/api/getBusAPI";

import Map from "@/components/map/Map";
import SearchBar from "@/components/map/SearchBar";
import ErrorModel from "@/components/error/ErrorModel";
import { NavigationContext } from "@/context/NavigationContext";
import { SearchContext } from "@/context/SearchContext";
import style from "./index.module.scss";

function BusPage() {
  const [isBusStationInfoVisible, setIsBusStationInfoVisible] = useState(false);
  const { setCurrentPosition } = useContext(NavigationContext);
  const { setDestination, busStationData, setBusStationData } =
    useContext(SearchContext);
  const { isLoaded } = useGoogleMaps();

  // 抓取站點資料
  const showDataHandler = (props) => {
    console.log(props);
    setIsBusStationInfoVisible(true);
    setBusStationData(props);
    setDestination(props.StationAddress);
    setCurrentPosition({
      lat: props.StopPosition.PositionLat,
      lng: props.StopPosition.PositionLon,
    });
  };

  // 抓取API的資料，並每個1分鐘自動更新一次
  const [busData, setBusData] = useState([]);
  const fetchData = async () => {
    try {
      const data = await getTaipeiBusStationData();
      setBusData(data);
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
        <SearchBar
          busStationData={busStationData}
          isBusStationInfoVisible={isBusStationInfoVisible}
          setIsBusStationInfoVisible={setIsBusStationInfoVisible}
        />
      </div>
      <div className={style.container__map}>
        <Map busData={busData} showDataHandler={showDataHandler} />
      </div>
    </div>
  );
}

export default BusPage;
