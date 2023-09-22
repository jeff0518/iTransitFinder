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
import { Trans97 } from "trans97";

import { NavigationContext } from "@/context/NavigationContext";
import style from "./Map.module.scss";

function Map(props) {
  const {
    youBikeData,
    mrtData,
    busData,
    parkingInfo,
    parkingAvailability,
    showDataHandler,
  } = props;
  const {
    currentPosition,
    setCurrentPosition,
    userLocation,
    setUserLocation,
    screenCenter,
    setScreenCenter,
    circle,
    setCircle,
  } = useContext(NavigationContext);
  const screenCenterRef = useRef();
  const [timer, setTimer] = useState(null); //存放setTimeout的計時器

  // 轉換座標使用trans97.getLocation()
  const trans97 = new Trans97({
    type: "wgs84",
  });

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
        setCircle({
          lat: newCurrentCenter.lat(),
          lng: newCurrentCenter.lng(),
        });
      }
    }, 500);
    setTimer(newTimer);
  };

  // 計算使用者位置與螢幕中心點位置
  const iconDistance = getDistance(
    { lat: userLocation.lat, lng: userLocation.lng },
    { lat: currentPosition.lat, lng: currentPosition.lng }
  );

  // 拿取當前使用者位子
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setCircle({
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
        {iconDistance > 100 && <MarkerF position={currentPosition} />}
        <MarkerF position={userLocation} icon={currentIcon} />

        {parkingInfo &&
          parkingInfo.map((data) => {
            const position = trans97.getLocation(data.tw97x, data.tw97y);
            let screenCenterDistance = getDistance(
              { lat: circle.lat, lng: circle.lng },
              {
                lat: position.lat,
                lng: position.lng,
              }
            );
            if (screenCenterDistance > 500) return;
            return (
              <>
                <MarkerF
                  key={data.id}
                  position={{
                    lat: position.lat,
                    lng: position.lng,
                  }}
                  icon={parkingIcon}
                  onClick={() => showDataHandler(data)}
                />
              </>
            );
          })}

        {busData &&
          busData.map((data) => {
            return (
              <div key={data.RouteUID + data.Direction}>
                {data.Stops.map((stopsData) => {
                  let screenCenterDistance = getDistance(
                    { lat: circle.lat, lng: circle.lng },
                    {
                      lat: stopsData.StopPosition.PositionLat,
                      lng: stopsData.StopPosition.PositionLon,
                    }
                  );
                  if (screenCenterDistance > 200) return;
                  return (
                    <MarkerF
                      key={stopsData.StopUID}
                      position={{
                        lat: stopsData.StopPosition.PositionLat,
                        lng: stopsData.StopPosition.PositionLon,
                      }}
                      icon={busIcon}
                      onClick={() => showDataHandler(stopsData)}
                    />
                  );
                })}
              </div>
            );
          })}

        {mrtData &&
          mrtData.map((data) => {
            let screenCenterDistance = getDistance(
              { lat: circle.lat, lng: circle.lng },
              {
                lat: data.StationPosition.PositionLat,
                lng: data.StationPosition.PositionLon,
              }
            );
            if (screenCenterDistance > 800) return;
            return (
              <>
                <MarkerF
                  key={data.StationID}
                  position={{
                    lat: data.StationPosition.PositionLat,
                    lng: data.StationPosition.PositionLon,
                  }}
                  icon={subwayIcon}
                  onClick={() => showDataHandler(data)}
                />
              </>
            );
          })}

        {youBikeData &&
          youBikeData.map((data) => {
            let amount = null;
            if (data.act === "0") return;
            // 計算離使用者有多少距離
            let screenCenterDistance = getDistance(
              { lat: circle.lat, lng: circle.lng },
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
                  onClick={() => showDataHandler(data)}
                />
              </>
            );
          })}
      </GoogleMap>
    </div>
  );
}

export default Map;

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

const flagIcon = {
  url: "/images/icon/flag.png",
  scaledSize: { width: 50, height: 50 },
};

const subwayIcon = {
  url: "/images/icon/subway.png",
  scaledSize: { width: 36, height: 36 },
};

const busIcon = {
  url: "/images/icon/bus.png",
  scaledSize: { width: 36, height: 36 },
};

const parkingIcon = {
  url: "/images/icon/parking-sign.png",
  scaledSize: { width: 36, height: 36 },
};
