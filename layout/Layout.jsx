import Logo from "./Logo";
import AuthNavigation from "./AuthNavigation";

import style from "./Layout.module.scss";

function Layout(props) {
  return (
    <>
      <div className={style.container}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.AuthNavigation}>
          <AuthNavigation />
        </div>
      </div>
      {props.children}
    </>
  );
}

export default Layout;
