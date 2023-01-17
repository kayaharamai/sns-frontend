import { AddPhotoAlternate } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

const Share = (userData) => {

  const [count,setCount] = useState(0); 
  const [post, setPosts] = useState([]);


  const desc = useRef();
  const location = useLocation();
  const loginuser = location.state;

  console.log(102, userData);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      authorId: userData.userData.id,
      desc: desc.current.value,
      img: "",
      userId: userData.userData.userId,
      username: userData.userData.username
    };

    await axios.post("/post", newPost)
    .then((response)=>{
      axios.get("/post").then((response) => {setPosts(response.data)})
    })
    window.location.reload();
  };

  console.log(post)

  return (
    <div class="border-b-2">
      <form onSubmit={(e) => handleSubmit(e)} class="m-4">
        <div>
          <h1 class="pb-3">ホーム</h1>
              <ul class="flex pb-3">
                <li>画像</li>
                {/* <li>{loginUserId}</li>
                <li>@{loginUsername}</li> */}
                <li><textarea type="text" placeholder="いまなにしてる？" ref={desc}　class="" cols={60} onChange={(e) => setCount(count + Number(1))}></textarea></li>
                <li><p>{count}文字</p></li>
              </ul>
          {/* <input type="text" placeholder="いまなにしてる？" ref={desc} /> */}
        </div>
        <div>
          <ul class="flex justify-between">
            <li class="items-center">
            </li>
            <li>
              <button
                class="px-2 py-1 m-2 bg-blue-400 text-white font-semibold rounded-full hover:bg-blue-500"
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
