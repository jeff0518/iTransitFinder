import Map from "@/components/map/Map";
import SearchBar from "@/components/map/SearchBar";
import style from "./index.module.scss";

function BikePage() {
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
