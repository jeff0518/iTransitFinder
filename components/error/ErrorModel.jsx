import { useState } from "react";
import style from "./ErrorModel.module.scss";

const error404 = {
  title: "404 - 頁面未找到",
  text: "抱歉，我們找不到您要查找的畫面",
};

const loading = { title: null, text: "載入中..." };

function ErrorModel(props) {
  const { errorName } = props;
  const [error, setError] = useState(errorName);
  return (
    <div className={style.container}>
      <h1>{error.title}</h1>
      <p>{error.text}</p>
    </div>
  );
}

export default ErrorModel;
