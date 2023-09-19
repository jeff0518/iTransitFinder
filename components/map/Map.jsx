import {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
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
  const { currentPosition, setCurrentPosition, userLocation, setUserLocation } =
    useContext(NavigationContext);
  const screenCenterRef = useRef();
  const [screenCenter, setScreenCenter] = useState(); //存放螢幕中心點
  const [timer, setTimer] = useState(null); //存放setTimeout的計時器
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
  // 抓取螢幕中心點，並把使用者所在地位子改成目前螢幕中心點
  const onLoad = useCallback((screenCenter) => {
    screenCenterRef.current = screenCenter;
    setScreenCenter(screenCenter);
  }, []);
  const centerChangHandler = () => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      if (screenCenter) {
        const newCurrentCenter = screenCenter.getCenter();
        setCurrentPosition({
          lat: newCurrentCenter.lat(),
          lng: newCurrentCenter.lng(),
        });
      }
    }, 500);
    setTimer(newTimer);
  };

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
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.log("無法顯示或拒絕定位");
      }
    );
  }, []);

  return (
    <div className={style.container}>
      <GoogleMap
        zoom={16}
        center={userLocation}
        options={options}
        mapContainerClassName={style.googleMap}
        onLoad={onLoad}
        onCenterChanged={centerChangHandler}
      >
        <MarkerF position={userLocation} icon={currentIcon} />
        {youBikeData.map((data) => {
          let amount = null;
          if (data.act === "0") return;
          // 計算離使用者有多少距離
          // let userDistance = getDistance(
          //   { lat: userLocation.lat, lng: userLocation.lng },
          //   { lat: data.lat, lng: data.lng }
          // );
          let screenCenterDistance = getDistance(
            { lat: currentPosition.lat, lng: currentPosition.lng },
            { lat: data.lat, lng: data.lng }
          );
          if (screenCenterDistance > 500) return;
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
