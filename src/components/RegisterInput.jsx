import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterInput = () => {
  const userName = useRef();
  const userId = useRef();
  const userEmail = useRef();
  const userPass = useRef();

  const [alertMessage, setAlertMessage] = useState(false);

  const navigate = useNavigate();

  const clickRegister = async () => {
    const userRegister = {
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
        await axios.post("/register", userRegister);
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
      <div class="w-full max-w-md my-20 mx-auto">
        <form class="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4">
          <h1　class="pb-3 mt-3 mb-3 font-semibold">会員登録</h1>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              ユーザー名<span class="text-red-500 text-xs ml-2">必須</span>
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
              id="username"
              type="text"
              placeholder="ユーザー名"
              ref={userName}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="userid"
            >
              ユーザーID<span class="text-red-500 text-xs ml-2">必須</span>
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
              id="userid"
              type="text"
              placeholder="ユーザーID"
              ref={userId}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Eメール<span class="text-red-500 text-xs ml-2">必須</span>
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Eメール"
              ref={userEmail}
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              パスワード<span class="text-red-500 text-xs ml-2">必須</span>
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:shadow-outline"
              id="password"
              type="password"
              placeholder="パスワード"
              ref={userPass}
            />
            {alertMessage ? (
              <p class="text-red-500 text-xs">
                必須項目を入力してください
              </p>
            ) : (
              ""
            )}
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-mypink hover:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={clickRegister}
            >
              登録
            </button>
            <button
              class="bg-mypink hover:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
