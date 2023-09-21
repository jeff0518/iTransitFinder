import { useContext, useState, useRef } from "react";
import { NavigationContext } from "@/context/NavigationContext";
import { Autocomplete } from "@react-google-maps/api";

import { RiDeleteBin6Line } from "react-icons/ri";
import { BiNavigation } from "react-icons/bi";

import ButtonUI from "../shared/ButtonUI";
import InputUI from "../shared/InputUI";
import style from "./SearchBar.module.scss";

function SearchBar(props) {
  const { sna, sbi, bemp, updateTime } = props; //有問題
  const {
    userLocation,
    screenCenter,
    currentPosition,
    setCurrentPosition,
    destination,
    circle,
    setCircle,
  } = useContext(NavigationContext);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const destinationInputRef = useRef();

  // 抓取input內容
  const calculateRoute = async () => {
    console.log(currentPosition);
    if (destinationInputRef.current.value === "") {
      return;
    }
    if (destination !== null) {
      destinationInputRef.current.value = destination;
    }
    if (currentPosition) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { address: destinationInputRef.current.value },
        (results, status) => {
          if (status === "OK") {
            const { location } = results[0].geometry;
            console.log("我是第3行：" + location);
            setCurrentPosition({ lat: location.lat(), lng: location.lng() });
            setCircle({ lat: location.lat(), lng: location.lng() });
            panToDestinationHandler({
              lat: location.lat(),
              lng: location.lng(),
            });
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        }
      );
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: userLocation,
      destination: currentPosition,
      travelMode: google.maps.TravelMode.BICYCLING,
    });
    panToDestinationHandler(currentPosition);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  // 點擊返回使用者所在地
  const panToUserLocationHandler = () => {
    setCurrentPosition(userLocation);
    setCircle({ lat: userLocation.lat, lng: userLocation.lng });
    screenCenter.panTo(userLocation);
  };
  // 前往目的地
  const panToDestinationHandler = (destination) => {
    screenCenter.panTo(destination);
  };

  // 刪除按鈕
  const clearButton = () => {
    setDistance("");
    setDuration("");
    destinationInputRef.current.value = "";
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.container_box}>
          <div className={style.inputBox}>
            <Autocomplete>
              <InputUI
                inputId="search__destination"
                inputStyle="search"
                inputType="text"
                inputPlaceholder="請輸入目的地"
                inputRef={destinationInputRef}
              />
            </Autocomplete>
          </div>
          <div className={style.buttonBox}>
            <ButtonUI
              text="GO"
              btnStyle="btn__pill"
              onClick={calculateRoute}
            ></ButtonUI>
          </div>
        </div>
        <div className={style.info__route}>
          <div className={style.route__distance}>與目的地的距離:{distance}</div>
          <div className={style.route__duration}>
            到目的地的預估時間:{duration}
          </div>
        </div>
        {/* 資訊欄必須要點擊才會出現，後續要補判斷式 */}
        <div className={style.info__station}>
          <h3 className={style.station__title}>站點資訊</h3>
          <div className={style.station__text}>站點名稱：{sna}</div>
          <div className={style.station__text}>可借車輛：{sbi}</div>
          <div className={style.station__text}>可停空位：{bemp}</div>
          <div className={style.station__text}>更新時間：{updateTime}</div>
        </div>
        <div className={style.action}>
          <RiDeleteBin6Line
            className={style.riDelete}
            size={35}
            onClick={clearButton}
          />
          <BiNavigation
            className={style.biNav}
            size={35}
            onClick={panToUserLocationHandler}
          />
        </div>
        {/* 資訊顯示欄位並附上刪除資料按鈕 */}
      </div>
    </>
  );
}
export default SearchBar;
