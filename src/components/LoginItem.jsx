import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUsername, loginUserId, loginDesc } from "../store/LoginSlice";

const LoginItem = () => {
  const navigate = useNavigate();
  const email = useRef();
  const pass = useRef();
  const [loginError, setLoginError] = useState("none");
  const [loginuser, setLoginUser] = useState({});
  const [alertMessage, setAlertMessage] = useState(false);

  const dispatch = useDispatch();

  const clickLogin = (e) => {
    e.preventDefault();

    const loginItem = {
      email: email.current.value,
      password: pass.current.value,
    };
    console.log(loginItem);
    // try {
    if (email.current.value !== "" || pass.current.value !== "") {
      const getUser = async () => {
        const response = await axios.post("/login", loginItem);
        return response.data;
        // .then((response) => response).then((data) => {setUser(data)})
      };
      getUser().then((user) => setLoginUser(user));
    } else {
      setAlertMessage(true);
    }
    // dispatch(loginUsername(loginuser.username))
    // console.log(0,username)
    // alert("ログインしました");
    // navigate("/",{state:loginuser});
    // } catch (err) {
    // setLoginError("block");
    // }
  };
  dispatch(loginUsername(loginuser.username));
  dispatch(loginUserId(loginuser.userId));
  dispatch(loginDesc(loginuser.desc));

  const loginArray = Object.keys(loginuser);
  console.log(33, loginuser.username);
  if (loginArray.length > 0) {
    window.localStorage.setItem("id", loginuser.id);
    navigate("/home");
  } else {
    // setAlertMessage(true)
  }

  return (
    <div>
      <div class="w-full max-w-md my-20 mx-auto">
        <div>
          <form
            onSubmit={(e) => clickLogin(e)}
            class="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4"
          >
            <h1 class="pb-3 mt-3 mb-3 font-semibold">ログイン</h1>
            <div class="mb-4">
              <label
                htmlFor="email"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Eメール
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
                type="email"
                placeholder="Eメール"
                id="email"
                ref={email}
              />
            </div>
            <div class="mb-4">
              <label
                htmlFor="pass"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                パスワード
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                type="password"
                placeholder="パスワード"
                id="pass"
                ref={pass}
              />
            </div>
            {/* <p style={{ display: loginError }}>ユーザーが見つかりません</p> */}
            {alertMessage ? <p class="text-red-500 text-xs text-center">Eメールとパスワードを入力してください</p> : ""}
            {/* <button
              type="submit"
              class="bg-mypink hover:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              ログイン
            </button> */}
            <button
              class="relative rounded-full my-5 mx-auto px-5 py-2.5 overflow-hidden group
              bg-mypink hover:bg-gradient-to-r hover:from-opacity-80
              hover:to-opacity-80 text-white hover:ring-2 hover:ring-offset-2
              hover:ring-mypink transition-all ease-out duration-300"
              type="submit"
            >
              <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span class="relative">ログイン</span>
            </button>
          </form>
          <p class="text-center text-sm">
            新規会員登録は
            <Link to="/register" class="text-red-500">
              こちら
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginItem;
