import { useState, createContext } from "react";

const defaultValue = {
  destination: "",
  stationData: "",
};

export const SearchContext = createContext(defaultValue);

function SearchProvider(props) {
  const { children } = props;

  const [destination, setDestination] = useState(null); // 存放目的地的資料
  const [distance, setDistance] = useState(""); // 存放到目的地的時間
  const [duration, setDuration] = useState(""); // 存放到目的地的距離
  const [stationData, setStationData] = useState(""); // 存放bike站點的資料
  const [mrtStationData, setMrtStationData] = useState("");

  return (
    <SearchContext.Provider
      value={{
        destination,
        setDestination,
        distance,
        setDistance,
        duration,
        setDuration,
        stationData,
        setStationData,
        mrtStationData,
        setMrtStationData,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
export default SearchProvider;
