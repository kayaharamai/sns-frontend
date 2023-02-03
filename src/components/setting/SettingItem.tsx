import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../deleteModal/DeleteModal";
import { ChangeItem } from "../../types/Types";

const SettingItem = () => {
  const profile = useRef<HTMLInputElement>(null!);

  const data: string | null = localStorage.getItem("id");

  const navigate = useNavigate();

  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<boolean>(false);

  const clickChange = async () => {
    const changeItem: ChangeItem = {
      desc: profile.current.value,
    };
    if (profile.current.value !== "") {
      await axios.put(`/users/${Number(data)}`, changeItem);
      alert("更新しました");
    } else {
      setAlertMessage(true);
    }
  };

  const clickDelete = async () => {
    setEditModalIsOpen(true);
  };

  const userDelete = async () => {
    await axios.delete(`/user/${data}`);
    navigate("/login");
  };

  return (
    <div className="basis-3/4">
      <h1 className="pb-3 ml-2 mt-8  font-semibold text-lg">設定</h1>
      <div className="bg-mygreen my-8 px-3 py-5 w-10/12 rounded-lg">
        <h3>プロフィール説明変更</h3>
        <input type="text" ref={profile} className="mr-3 my-4 ml-2 w-5/12" />
        <button
          onClick={clickChange}
          className="px-2 py-1 ml-5 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
        >
          変更
        </button>
        {alertMessage ? (
          <p className="ml-3 text-red-500 text-sm">
            変更内容を入力してください
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="bg-mygreen my-8 px-3 py-5 w-10/12 rounded-lg">
        <h3 className="mb-5">アカウント削除</h3>
        <button
          onClick={clickDelete}
          className="px-2 py-1 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
        >
          削除する
        </button>
        {editModalIsOpen ? (
          <DeleteModal
            appElement={document.getElementById("app")}
            userDelete={userDelete}
            editModalIsOpen={editModalIsOpen}
            setEditModalIsOpen={setEditModalIsOpen}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SettingItem;
