import React from 'react'
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SettingItem = () => {

  const username = useRef();
  const userId = useRef();
  const useremail = useRef();
  const userpass = useRef();

  const data = localStorage.getItem("id");
  const navigate = useNavigate();

  const clickChange = async () => {
    const changeItem = {
      username: username.current.value,
      userId: userId.current.value,
      email: useremail.current.value,
      password: userpass.current.value
    };

    console.log(changeItem)

    await axios.put(`/users/${Number(data)}`,changeItem)
    // alert("更新しました")
  }

  const clickDelete = async () => {
    await axios.delete(`/user/${data}`)
    alert("削除")
    navigate("/login")
  }

  return (
    <div class="bg-purple-300 basis-3/4">
        <div>
            <h1>設定</h1>
            <div>
              <h3>ユーザー名変更</h3>
              <input type="text" ref={username}/>
            </div>
            <div>
              <h3>ユーザーID変更</h3>
              <input type="text" ref={userId}/>
            </div>
            <div>
              <h3>Eメール変更</h3>
              <input type="email" ref={useremail}/>
            </div>
            <div>
              <h3>パスワード変更</h3>
              <input type="pass" ref={userpass}/>
            </div>
            <button onClick={clickChange}>変更</button>
        </div>
        <div>
          <h1>アカウント削除</h1>
          <button onClick={clickDelete}>削除する</button>
        </div>
    </div>
  )
}

export default SettingItem
