import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import InputUI from "../shared/InputUI";
import ButtonUI from "../shared/ButtonUI";
import style from "./AuthForm.module.scss";

async function createUser(email, password) {
  try {
    const response = await axios.post("/api/auth/signup", {
      email,
      password,
    });

    const data = response.data;

    if (!response.status === 200) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    // 處理錯誤
    console.error(error);
    throw new Error("Something went wrong");
  }
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  function authHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const enterEmail = emailInputRef.current.value;
    const enterPassword = passwordInputRef.current.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enterEmail,
        password: enterPassword,
      });

      if (!result.error) {
        router.replace("/");
      }
      router.push("/");
    } else {
      try {
        const result = await createUser(enterEmail, enterPassword);

        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <section className={style.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <InputUI
            inputId="email"
            inputType="email"
            inputStyle="control"
            inputText="Your Email"
            inputRef={emailInputRef}
          />
          <InputUI
            inputId="password"
            inputType="password"
            inputStyle="control"
            inputText="Your Password"
            inputRef={passwordInputRef}
          />

          <div className={style.div__btn}>
            {isLogin ? (
              <ButtonUI btnStyle="btn__pill" text="Login" />
            ) : (
              <ButtonUI btnStyle="btn__pill" text="Create Account" />
            )}

            {isLogin ? (
              <ButtonUI
                btnStyle="btn__link"
                text="Create new account"
                onClick={authHandler}
              />
            ) : (
              <ButtonUI
                btnStyle="btn__link"
                text="Login with existing account"
                onClick={authHandler}
              />
            )}
          </div>
        </form>
      </section>
    </>
  );
}

export default AuthForm;
