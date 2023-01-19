import { AddPhotoAlternate } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

const Share = (userData) => {
  const [count, setCount] = useState(0);
  const [post, setPosts] = useState([]);
  const [alertMessage,setAlertMessage] = useState(false)

  const desc = useRef();
  const location = useLocation();
  const loginuser = location.state;

  console.log(102, userData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      authorId: userData.userData.id,
      desc: desc.current.value,
      userId: userData.userData.userId,
      username: userData.userData.username,
    };
    if (desc.current.value !== "") {
      await axios.post("/post", newPost).then((response) => {
        axios.get("/post").then((response) => {
          setPosts(response.data);
        });
      });
      window.location.reload();
    } else {
      setAlertMessage(true)
    }
  };

  console.log(post);

  return (
    <div class="border-b-4">
      <form onSubmit={(e) => handleSubmit(e)} class="m-4">
        <div>
          <h1 class="pb-3 ml-2 mt-8 font-semibold">ホーム</h1>
          <ul class="flex p-2">
            <li><img src={`${process.env.PUBLIC_URL}/profile.png`} alt="profile" class="w-10 mr-3 rounded-full"/></li>
            {/* <li>{loginUserId}</li>
                <li>@{loginUsername}</li> */}
            <li>
              <textarea
                type="text"
                placeholder="いまなにしてる？"
                ref={desc}
                class=""
                cols={60}
                onChange={(e) => setCount(count + Number(1))}
              ></textarea>
            </li>
          </ul>
          {alertMessage ? (<p class="ml-8">文字を入力してください</p>) : ("")}
        </div>
        <div>
          <ul class="flex justify-between">
            <li class="items-center"></li>
            <li>
              <button
                class="px-2 py-1 m-2 bg-mypink text-white font-semibold rounded-full hover:opacity-80"
                type="submit"
              >
                投稿する
              </button>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Share;
