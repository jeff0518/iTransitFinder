import Image from "next/image";

import style from "./AuthNavigation.module.scss";

function AuthNavigation() {
  return (
    <div className={style.buttonBox}>
      <div className={style.buttonImg}>
        <Image
          src="/images/icon/login.png"
          width={32}
          height={32}
          alt="這是login"
        />
      </div>
    </div>
  );
}

export default AuthNavigation;
