import { useContext } from "react";
import { NavigationContext } from "@/context/NavigationContext";

import { RiDeleteBin6Line } from "react-icons/ri";
import { BiNavigation } from "react-icons/bi";

import ButtonUI from "../shared/ButtonUI";
import InputUI from "../shared/InputUI";
import style from "./SearchBar.module.scss";

function SearchBar(props) {
  const { distance, duration, sna, sbi, bemp, updateTime } = props;

  const { userLocation, screenCenter, setCurrentPosition } =
    useContext(NavigationContext);

  // 點擊返回使用者所在地
  const panToUserLocationHandler = () => {
    setCurrentPosition(userLocation);
    screenCenter.panTo(userLocation);
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.container_box}>
          <div className={style.inputBox}>
            <InputUI
              inputId="search__destination"
              inputStyle="search"
              inputType="text"
              inputPlaceholder="目的地"
            />
          </div>
          <div className={style.buttonBox}>
            <ButtonUI text="GO" btnStyle="btn__pill"></ButtonUI>
          </div>
        </div>
        <div className={style.info__route}>
          <div className={style.route__distance}>Distance:{distance}</div>
          <div className={style.route__duration}>Duration:{duration}</div>
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
          <RiDeleteBin6Line className={style.riDelete} size={35} />
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
