import Image from "next/image";

import style from "./Logo.module.scss";

function Logo() {
  return (
    <div className={style.logoBox}>
      <div className={style.logoImg}>
        <Image
          src="/images/icon/logo.png"
          width={32}
          height={32}
          alt="這是logo"
        />
      </div>
      <div className={style.logoText}>iTransitFinder</div>
    </div>
  );
}

export default Logo;
