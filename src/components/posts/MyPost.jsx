import React from 'react'
import {ChatBubbleOutline, FavoriteBorder} from '@mui/icons-material'
import axios from "axios";
import MyPostComment from './MyPostComment';
import { useState } from "react";
import dayjs, { locale,extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ja';

const MyPost = ({mypost}) => {

  const [openComment, setOpenComment] = useState(false);

  const data = localStorage.getItem("id");

  dayjs.locale('ja');
  extend(relativeTime);
    
      const clickLike = () => {
        alert("いいねを押しました")
      }

      const clickDelete = () => {
        if (Number(data) === mypost.authorId) {
          alert("投稿を削除します");
          axios.delete(`/post/${mypost.id}`);
          window.location.reload();
        } else {
          alert("自分の投稿以外は削除できません");
        }
      };

      const clickComment = () => {
        if (openComment === false) {
          setOpenComment(true);
        } else {
          setOpenComment(false);
        }
      };

    
  return (
    <div class="m-5 bg-gray-300"> 
      {/* //top */}
      <div>
        <ul class="flex">
          <li class="mr-4">画像</li>
          <li class="mr-4">{mypost.username}</li>
          <li class="mr-4">@{mypost.userId}</li>
          <li class="mr-4">{dayjs(mypost.createdAt).fromNow()}</li>
        </ul>
      </div>
      {/* //center */}
      <div>
        <div class="my-3">{mypost.desc}</div>
      </div>
      <div>
        <ul class="flex">
          <li class="w-32"><ChatBubbleOutline onClick={clickComment}/>{mypost.comment.length}</li>
          <li class="w-32"><FavoriteBorder onClick={clickLike}/>{mypost.likes.length}</li>
          <li>
              <button onClick={clickDelete}>削除</button>
            </li>
        </ul>
      </div>
      {openComment ? (<MyPostComment mypost={mypost}/>) : ("")}
        
    </div>
  )
}

export default MyPost
