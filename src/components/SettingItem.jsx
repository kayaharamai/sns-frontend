import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SettingItem = () => {
  const username = useRef();
  const profile = useRef();

  const data = localStorage.getItem("id");
  const navigate = useNavigate();

  const clickChange = async () => {
    const changeItem = {
      desc: profile.current.value,
    };

    console.log(changeItem);

    await axios.put(`/users/${Number(data)}`, changeItem);
    alert("更新しました");
  };

  const clickDelete = async () => {
    await axios.delete(`/user/${data}`);
    alert("削除");
    navigate("/login");
  };

  return (
    <div class="basis-3/4">
      <h1 class="pb-3 ml-2 mt-5 font-semibold">設定</h1>
      <div class="bg-mygreen my-8 px-3 py-5 w-10/12 rounded-lg">
        <h3>プロフィール説明変更</h3>
        <input type="text" ref={profile} class="my-3"/>
        <button onClick={clickChange} class="px-2 py-1 ml-5 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80">変更</button>
      </div>
      <div class="bg-mygreen my-8 px-3 py-5 w-10/12 rounded-lg">
        <h3 class="mb-5">アカウント削除</h3>
        <button onClick={clickDelete} class="px-2 py-1 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80">削除する</button>
      </div>
    </div>
  );
};

export default SettingItem;
