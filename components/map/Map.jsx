import { useContext, useEffect, useMemo, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import getDistance from "geolib/es/getDistance";

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
        {youBikeData.map((data) => {
          let amount = null;
          if (data.act === "0") return;
          // 計算離使用者有多少距離
          let itemDistance = getDistance(
            { lat: currentPosition.lat, lng: currentPosition.lng },
            { lat: data.lat, lng: data.lng }
          );
          if (itemDistance > 500) return;
          if (data.sbi > 3) {
            amount = true;
          } else {
            amount = false;
          }
          return (
            <>
              <MarkerF
                key={data.sno}
                position={{ lat: data.lat, lng: data.lng }}
                icon={amount ? normalBike : noRentBike}
              />
            </>
          );
        })}
      </GoogleMap>
    </div>
  );
}

export default Map;
