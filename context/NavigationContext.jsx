import { createContext, useState, useMemo } from "react";

// 設定預設中心點(台北101)
const defaultCenter = { lat: 25.033671, lng: 121.564427 };
const defaultValue = {
  currentPosition: null,
};

export const NavigationContext = createContext(defaultValue);

function NavigationProvider(props) {
  const { children } = props;

  const [currentPosition, setCurrentPosition] = useState(defaultCenter);

  return (
    <NavigationContext.Provider value={{ currentPosition, setCurrentPosition }}>
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationProvider;
