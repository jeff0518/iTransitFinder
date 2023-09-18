import { useContext, useEffect, useMemo, useState } from "react";
import { GoogleMap, MarkerF, Circle } from "@react-google-maps/api";

import { NavigationContext } from "@/context/NavigationContext";
import { getTaipeiYouBikeData } from "@/api/getYouBikeAPI";
import style from "./Map.module.scss";

const currentIcon = {
  url: "/images/icon/location.png",
  scaledSize: { width: 50, height: 50 },
};

const normalBike = {
  url: "/images/icon/normal-bike.png",
  scaledSize: { width: 36, height: 36 },
};

const noRentBike = {
  url: "/images/icon/no-rent-bike.png",
  scaledSize: { width: 36, height: 36 },
};

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
      >
        <MarkerF position={currentPosition} icon={currentIcon} />

        <Circle center={currentPosition} radius={500} options={closeOptions} />
        {youBikeData.map((data) => {
          let amount = null;
          if (data.act === "0") return;
          if (data.sbi > 3) {
            amount = true;
          } else {
            amount = false;
          }
          return (
            <MarkerF
              key={data.sno}
              position={{ lat: data.lat, lng: data.lng }}
              icon={amount ? normalBike : noRentBike}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
}

export default Map;

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
