import Image from "next/image";

import style from "./AuthImage.module.scss";

function AuthImage(props) {
  const { text, src } = props;
  return (
    <div className={style.image}>
      <span>{text}</span>
      <Image src={src} width={32} height={32} alt={`這是${text}`} />
    </div>
  );
}

export default AuthImage;
