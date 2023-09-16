import { useContext, useEffect, useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

import { NavigationContext } from "@/context/NavigationContext";
import style from "./Map.module.scss";

function Map() {
  const { currentPosition, setCurrentPosition } = useContext(NavigationContext);

  // 設定預設中心點(台北101)
  const defaultCenter = useMemo(
    () => ({ lat: 25.033671, lng: 121.564427 }),
    []
  );

  // 定義地圖的選項
  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: false,
      zoomControl: true,
      mapTypeControl: false,
    }),
    []
  );

  // 拿取當前使用者位子
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.log("無法顯示或拒絕定位");
        setCurrentPosition(defaultCenter);
      }
    );
  }, []);

  return (
    <div className={style.container}>
      <GoogleMap
        zoom={16}
        center={currentPosition}
        options={options}
        mapContainerClassName={style.googleMap}
      ></GoogleMap>
    </div>
  );
}

export default Map;
