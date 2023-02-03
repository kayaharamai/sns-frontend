import axios, { AxiosResponse } from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginInputItem, LoginUser } from "../types/Types";

const LoginItem: React.FC = () => {
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null!);
  const pass = useRef<HTMLInputElement>(null!);
  const [loginuser, setLoginUser] = useState<any>([]); 
  const [alertMessage, setAlertMessage] = useState<boolean>(false);
  const [noLoginMessage, setNoLogintMessage] = useState<boolean>(false);

  const clickLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginInputItem: LoginInputItem = {
      email: email.current.value,
      password: pass.current.value,
    };
    const getUser = async () => {
      try {
        if (email.current.value !== "" || pass.current.value !== "") {
          const response = await axios
            .post("/login", loginInputItem)
            .then((responses: AxiosResponse<LoginUser[]>) =>
              setLoginUser(responses.data)
            );
        } else {
          setAlertMessage(true);
        }
      } catch (err) {
        setNoLogintMessage(true);
      }
    };
    getUser();
  };

  const loginArray: string[] = Object.keys(loginuser);
  if (loginArray.length > 0) {
    window.localStorage.setItem("id", loginuser.id);
    navigate("/home");
  }

  return (
    <div>
      <div className="w-full max-w-md my-20 mx-auto">
        <div>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => clickLogin(e)}
            className="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4"
          >
            <h1 className="pb-3 mt-3 mb-3 font-semibold">ログイン</h1>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Eメール
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
                type="email"
                placeholder="Eメール"
                id="email"
                ref={email}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="pass"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                パスワード
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                type="password"
                placeholder="パスワード"
                id="pass"
                ref={pass}
              />
            </div>
            {alertMessage ? (
              <p className="text-red-500 text-xs text-center">
                Eメールとパスワードを入力してください
              </p>
            ) : (
              ""
            )}

            {noLoginMessage ? (
              <p className="text-red-500 text-xs text-center">
                ユーザーが見つかりません
              </p>
            ) : (
              ""
            )}
            <button
              className="flex relative rounded-full my-5 mx-auto px-5 py-2.5 overflow-hidden group
              bg-mypink hover:bg-gradient-to-r hover:from-opacity-80
              hover:to-opacity-80 text-white hover:ring-2 hover:ring-offset-2
              hover:ring-mypink transition-all ease-out duration-300"
              type="submit"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative font-semibold">ログイン</span>
            </button>
          </form>
          <p className="text-center text-sm">
            新規会員登録は
            <Link to="/register" className="text-red-500">
              こちら
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginItem;
