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

export function LoginImage() {
  <div className={style.loginImage}>
    <Image
      src="/images/icon/login.png"
      width={32}
      height={32}
      alt="這是login"
    />
    <span>登入</span>
  </div>;
}

export function LogoutImage() {
  <div className={style.logoutImage}>
    <Image
      src="/images/icon/logout.png"
      width={32}
      height={32}
      alt="這是logout"
    />
    <span>登出</span>
  </div>;
}
