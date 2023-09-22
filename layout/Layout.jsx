import Logo from "./Logo";
import Link from "next/link";
import AuthNavigation from "./AuthNavigation";

import style from "./Layout.module.scss";

function Layout(props) {
  return (
    <>
      <div className={style.container}>
        <Link href="/">
          <div className={style.logo}>
            <Logo />
          </div>
        </Link>
        <div className={style.AuthNavigation}>
          <AuthNavigation />
        </div>
      </div>
      {props.children}
    </>
  );
}

export default Layout;
