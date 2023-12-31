import { createContext, useState } from "react";

// 設定預設中心點(台北101)
const defaultCenter = { lat: 25.033671, lng: 121.564427 };
const defaultValue = {
  currentPosition: defaultCenter,
  userLocation: defaultCenter,
};

export const NavigationContext = createContext(defaultValue);

function NavigationProvider(props) {
  const { children } = props;

  const [userLocation, setUserLocation] = useState(defaultCenter); //存放使用者座標
  const [currentPosition, setCurrentPosition] = useState(defaultCenter); //存放目前所在地座標
  const [circle, setCircle] = useState(defaultCenter);
  const [screenCenter, setScreenCenter] = useState(null); //存放螢幕中心點座標

  return (
    <NavigationContext.Provider
      value={{
        currentPosition,
        setCurrentPosition,
        userLocation,
        setUserLocation,
        screenCenter,
        setScreenCenter,
        circle,
        setCircle,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationProvider;
