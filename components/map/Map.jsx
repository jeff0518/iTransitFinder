import { GoogleMap, MarkerF } from "@react-google-maps/api";

import style from "./Map.module.scss";

function Map() {
  return (
    <div className={style.container}>
      <GoogleMap zoom={16} mapContainerClassName={style.googleMap}></GoogleMap>
    </div>
  );
}

export default Map;
