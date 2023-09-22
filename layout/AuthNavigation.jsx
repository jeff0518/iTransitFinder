import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import AuthImage from "@/components/auth/AuthImage";

import style from "./AuthNavigation.module.scss";

function AuthNavigation() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logoutHandler() {
    signOut();
    router.replace("/");
  }

  function loginHandler() {
    router.push("/auth");
  }

  return (
    <div className={style.buttonBox}>
      {!session && !loading ? (
        <AuthImage
          text="登入"
          src="/images/icon/login.png"
          onClick={loginHandler}
        />
      ) : (
        <AuthImage
          text="登出"
          src="/images/icon/logout.png"
          onClick={logoutHandler}
        />
      )}
    </div>
  );
}

export default AuthNavigation;
