import AuthImage from "@/components/auth/AuthImage";

import style from "./AuthNavigation.module.scss";

function AuthNavigation() {
  return (
    <div className={style.buttonBox}>
      <AuthImage text="登入" src="/images/icon/login.png" />
    </div>
  );
}

export default AuthNavigation;
