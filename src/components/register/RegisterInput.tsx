import React, { useState } from "react";
import { useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { UserRegister } from "../../types/Types";

const RegisterInput: React.FC = () => {
  
  const userName = useRef<HTMLInputElement>(null!);
  const userId = useRef<HTMLInputElement>(null!);
  const userEmail = useRef<HTMLInputElement>(null!);
  const userPass = useRef<HTMLInputElement>(null!);

  const [alertMessage, setAlertMessage] = useState<boolean>(false);

  const navigate = useNavigate();

  const clickRegister = async () => {
    const userRegister: UserRegister = {
      username: userName.current.value,
      userId: userId.current.value,
      email: userEmail.current.value,
      password: userPass.current.value,
    };
    if (
      userName.current.value !== "" ||
      userId.current.value !== "" ||
      userEmail.current.value !== "" ||
      userPass.current.value !== ""
    ) {
      try {
        await axios
          .post("/register", userRegister)
          .then((response: AxiosResponse) => response);
        alert("登録しました");
        navigate("/login");
      } catch (err) {
        alert("ユーザーIDもしくはEメールがすでに使用されています");
      }
    } else {
      setAlertMessage(true);
    }
  };

  const clickClear = () => {
    userName.current.value = "";
    userId.current.value = "";
    userEmail.current.value = "";
    userPass.current.value = "";
  };

  return (
    <div>
      <div className="w-full max-w-md my-20 mx-auto">
        <form className="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4">
          <h1 className="pb-3 mt-3 mb-3 font-semibold">会員登録</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              ユーザー名<span className="text-red-500 text-xs ml-2">必須</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
              id="username"
              type="text"
              placeholder="ユーザー名"
              ref={userName}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userid"
            >
              ユーザーID<span className="text-red-500 text-xs ml-2">必須</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
              id="userid"
              type="text"
              placeholder="ユーザーID"
              ref={userId}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Eメール<span className="text-red-500 text-xs ml-2">必須</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Eメール"
              ref={userEmail}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              パスワード<span className="text-red-500 text-xs ml-2">必須</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:shadow-outline"
              id="password"
              type="password"
              placeholder="パスワード"
              ref={userPass}
            />
            {alertMessage ? (
              <p className="text-red-500 text-xs">必須項目を入力してください</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-mypink hover:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={clickRegister}
            >
              登録
            </button>
            <button
              className="bg-mypink hover:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={clickClear}
            >
              クリア
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterInput;
