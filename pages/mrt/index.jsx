import { useState, useEffect, useContext } from "react";
import { useGoogleMaps } from "@/utils/useGoogleMaps";
import { getTaipeiMRTStationData } from "@/api/getMRTAPI";

import Map from "@/components/map/Map";
import SearchBar from "@/components/map/SearchBar";
import ErrorModel from "@/components/error/ErrorModel";
import { NavigationContext } from "@/context/NavigationContext";
import { SearchContext } from "@/context/SearchContext";
import style from "./index.module.scss";

function MRTPage() {
  const [isMrtStationInfoVisible, setIsMrtStationInfoVisible] = useState(false);
  const { setCurrentPosition } = useContext(NavigationContext);
  const { setDestination, mrtStationData, setMrtStationData } =
    useContext(SearchContext);
  const { isLoaded } = useGoogleMaps();

  // 抓取站點資料
  const showDataHandler = (props) => {
    setIsMrtStationInfoVisible(true);
    setMrtStationData(props);
    setDestination(props.StationAddress);
    setCurrentPosition({
      lat: props.StationPosition.PositionLat,
      lng: props.StationPosition.PositionLon,
    });
  };

  // 抓取API的資料，並每個1分鐘自動更新一次
  const [mrtData, setMrtData] = useState([]);
  const fetchData = async () => {
    try {
      const data = await getTaipeiMRTStationData();
      setMrtData(data);
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
          mrtStationData={mrtStationData}
          isMrtStationInfoVisible={isMrtStationInfoVisible}
          setIsMrtStationInfoVisible={setIsMrtStationInfoVisible}
        />
      </div>
      <div className={style.container__map}>
        <Map mrtData={mrtData} showDataHandler={showDataHandler} />
      </div>
    </div>
  );
}

export default MRTPage;
