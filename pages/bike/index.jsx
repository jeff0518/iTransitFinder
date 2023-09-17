import { useGoogleMaps } from "@/utils/useGoogleMaps";

import Map from "@/components/map/Map";
import SearchBar from "@/components/map/SearchBar";
import ErrorModel from "@/components/error/ErrorModel";
import style from "./index.module.scss";

function BikePage() {
  const { isLoaded } = useGoogleMaps();

  if (!isLoaded) return <ErrorModel errorName="loading" />;

  return (
    <div className={style.container}>
      <div className={style.container__search}>
        <SearchBar />
      </div>
      <div className={style.container__map}>
        <Map />
      </div>
    </div>
  );
}

export default BikePage;
