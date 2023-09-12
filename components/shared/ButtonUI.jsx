import style from "./ButtonUI.module.scss";

function ButtonUI(props) {
  const { text, btnStyle, onClick } = props;
  return (
    <button className={style[btnStyle]} onClick={onClick}>
      {text}
    </button>
  );
}

export default ButtonUI;
