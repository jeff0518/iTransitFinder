import ButtonUI from "../shared/ButtonUI";
import InputUI from "../shared/InputUI";
import style from "./SearchBar.module.scss";

function SearchBar() {
  return (
    <>
      <div className={style.container}>
        <div className={style.inputBox}>
          <InputUI
            inputId="search__destination"
            inputStyle="search"
            inputType="text"
            inputPlaceholder="目的地"
          />
        </div>
        <div className={style.buttonBox}>
          <ButtonUI text="搜索" btnStyle="btn__pill"></ButtonUI>
        </div>
        {/* 資訊顯示欄位並附上刪除資料按鈕 */}
      </div>
    </>
  );
}

export default SearchBar;
