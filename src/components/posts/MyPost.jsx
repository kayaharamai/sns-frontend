import React from 'react'
import {ChatBubbleOutline, FavoriteBorder} from '@mui/icons-material'
import axios from "axios";
import MyPostComment from './MyPostComment';
import { useState } from "react";
import dayjs, { locale,extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ja';

const MyPost = (props) => {

  const {mypost,userData} = props;

  const [openComment, setOpenComment] = useState(false);

  const data = localStorage.getItem("id");

  dayjs.locale('ja');
  extend(relativeTime);
    
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
    <div class="p-6 border-b-2"> 
      {/* //top */}
      <div>
        <ul class="flex">
          <li class="mr-4"><img src={`${process.env.PUBLIC_URL}/profile.png`} alt="profile" class="w-10 rounded-full"/></li>
          <li class="mr-4">{mypost.username}</li>
          <li class="mr-4">@{mypost.userId}</li>
          <li class="mr-4">{dayjs(mypost.createdAt).fromNow()}</li>
        </ul>
      </div>
      {/* //center */}
      <div>
        <div class="my-4">{mypost.desc}</div>
      </div>
      <div>
        <ul class="flex">
          <li class="w-32"><ChatBubbleOutline onClick={clickComment}/>{mypost.comment.length}</li>
          <li>
              <button onClick={clickDelete} class="px-2 py-1 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80">削除</button>
            </li>
        </ul>
      </div>
      {openComment ? (<MyPostComment mypost={mypost} userData={userData}/>) : ("")}
        
    </div>
  )
}

export default MyPost
