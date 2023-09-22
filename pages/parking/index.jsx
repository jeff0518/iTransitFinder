import { useState, useEffect, useContext } from "react";
import { useGoogleMaps } from "@/utils/useGoogleMaps";
import {
  getTaipeiParkingLotInfoData,
  getTaipeiParkingAvailabilityData,
} from "@/api/getParkingLotAPI";
import { Trans97 } from "trans97";

import Map from "@/components/map/Map";
import SearchBar from "@/components/map/SearchBar";
import ErrorModel from "@/components/error/ErrorModel";
import { NavigationContext } from "@/context/NavigationContext";
import { SearchContext } from "@/context/SearchContext";
import style from "./index.module.scss";

function ParkingPage() {
  const [isParkingInfoVisible, setIsParkingInfoVisible] = useState(false);
  const { setCurrentPosition } = useContext(NavigationContext);
  const {
    setDestination,
    parkingLotBaseData,
    setParkingLotBaseData,
    parkingLotAvailabilityData,
    setParkingLotAvailabilityData,
  } = useContext(SearchContext);

  const { isLoaded } = useGoogleMaps();
  // 轉換座標使用trans97.getLocation()
  const trans97 = new Trans97({
    type: "wgs84",
  });
  // 抓取站點資料
  const showDataHandler = (props) => {
    const position = trans97.getLocation(props.tw97x, props.tw97y);
    setIsParkingInfoVisible(true);
    setParkingLotBaseData(props);
    setParkingLotAvailabilityData(props);
    setDestination(props.StationAddress);
    setCurrentPosition({
      lat: position.lat,
      lng: position.lng,
    });
  };

  // 抓取API的資料，並每個1分鐘自動更新一次
  const [parkingInfo, setParkingInfo] = useState([]);
  const [parkingAvailability, setParkingAvailability] = useState([]);
  const fetchData = async () => {
    try {
      const infoData = await getTaipeiParkingLotInfoData();
      const availabilityData = await getTaipeiParkingAvailabilityData();
      setParkingInfo(infoData);
      setParkingAvailability(availabilityData);
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
          parkingLotBaseData={parkingLotBaseData}
          parkingAvailability={parkingAvailability}
          parkingLotAvailabilityData={parkingLotAvailabilityData}
          isParkingInfoVisible={isParkingInfoVisible}
          setIsParkingInfoVisible={setIsParkingInfoVisible}
        />
      </div>
      <div className={style.container__map}>
        <Map
          parkingInfo={parkingInfo}
          parkingAvailability={parkingAvailability}
          showDataHandler={showDataHandler}
        />
      </div>
    </div>
  );
}

export default ParkingPage;
