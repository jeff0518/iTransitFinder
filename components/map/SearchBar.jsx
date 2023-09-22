import { useContext, useRef } from "react";
import { NavigationContext } from "@/context/NavigationContext";
import { SearchContext } from "@/context/SearchContext";
import { Autocomplete } from "@react-google-maps/api";

import { RiDeleteBin6Line } from "react-icons/ri";
import { BiNavigation } from "react-icons/bi";

import ButtonUI from "../shared/ButtonUI";
import InputUI from "../shared/InputUI";
import style from "./SearchBar.module.scss";

function SearchBar(props) {
  const {
    isStationInfoVisible,
    setIsStationInfoVisible,
    setIsMrtStationInfoVisible,
    isMrtStationInfoVisible,
    isBusStationInfoVisible,
    setIsBusStationInfoVisible,
    isParkingInfoVisible,
    setIsParkingInfoVisible,
  } = props;
  const {
    mrtStationData,
    stationData,
    busStationData,
    parkingLotBaseData,
    parkingLotAvailabilityData,
    parkingAvailability,
  } = props;
  const {
    userLocation,
    screenCenter,
    currentPosition,
    setCurrentPosition,
    setCircle,
  } = useContext(NavigationContext);
  const {
    destination,
    setDestination,
    distance,
    setDistance,
    duration,
    setDuration,
  } = useContext(SearchContext);
  const destinationInputRef = useRef();
  // 抓取input內容
  const calculateRoute = async () => {
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
    setDestination(null);
    if (isStationInfoVisible) {
      setIsStationInfoVisible(false);
    }
    if (isMrtStationInfoVisible) {
      setIsMrtStationInfoVisible(false);
    }
    if (isBusStationInfoVisible) {
      setIsBusStationInfoVisible(false);
    }
    if (isParkingInfoVisible) {
      setIsParkingInfoVisible(false);
    }
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
        {isParkingInfoVisible && (
          <div className={style.info__station}>
            <h3 className={style.station__title}>停車場資訊</h3>
            <div className={style.station__text}>
              <p>停車場名稱</p>
              <p>{parkingLotBaseData.name}</p>
            </div>
            <div className={style.station__text}>
              可停空位：
              {parkingAvailability[parkingLotBaseData.id]?.availablecar}格
            </div>
            <div className={style.station__text}>
              <p>停車場費用</p>
              <p>{parkingLotBaseData.payex}</p>
            </div>
            <div className={style.station__text}>
              <p>停車場營業時間</p>
              <p>{parkingLotBaseData.serviceTime}</p>
            </div>
            {/* <div className={style.station__text}>
              <p>更新時間：</p>
              <p>{stationData.updateTime}</p>
            </div> */}
          </div>
        )}

        {isBusStationInfoVisible && (
          <div className={style.info__station}>
            <h3 className={style.station__title}>站點資訊</h3>
            <div className={style.station__text}>
              <p>公車站名稱</p>
              <p>{busStationData.StopName.Zh_tw}</p>
            </div>
            <div className={style.station__text}>
              <p>停靠此站的公車</p>
              <p>資料處理中</p>
            </div>
          </div>
        )}

        {isMrtStationInfoVisible && (
          <div className={style.info__station}>
            <h3 className={style.station__title}>站點資訊</h3>
            <div className={style.station__text}>
              <p>捷運站名稱</p>
              <p>{mrtStationData.StationName.Zh_tw}</p>
            </div>
            <div className={style.station__text}>
              <p>捷運站路線</p>
              <p>{mrtStationData.StationID}</p>
            </div>
          </div>
        )}
        {isStationInfoVisible && (
          <div className={style.info__station}>
            <h3 className={style.station__title}>站點資訊</h3>
            <div className={style.station__text}>
              <p>站點名稱</p>
              <p>{stationData.sna}</p>
            </div>
            <div className={style.station__text}>
              可借車輛：{stationData.sbi} 台
            </div>
            <div className={style.station__text}>
              可停空位：{stationData.bemp} 格
            </div>
            <div className={style.station__text}>
              <p>更新時間：</p>
              <p>{stationData.updateTime}</p>
            </div>
          </div>
        )}

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
