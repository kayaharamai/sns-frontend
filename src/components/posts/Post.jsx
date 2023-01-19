import React from "react";
import { ChatBubbleOutline, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import CommentPost from "./CommentPost";
import { Link } from "react-router-dom";
import dayjs, { locale,extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ja';
import { Scrollbars } from 'react-custom-scrollbars';

const Post = (props) => {
  const { post, userData, folloUser } = props;
  const [openComment, setOpenComment] = useState(false);
  const data = localStorage.getItem("id");
  console.log(userData,34);

  dayjs.locale('ja');
  extend(relativeTime);
  

  const clickComment = () => {
    if (openComment === false) {
      setOpenComment(true);
    } else {
      setOpenComment(false);
    }
  };
  console.log(folloUser,90)

  // let newPost = post.filter(item => item.authorId === 1)
  // console.log(newPost)

  let postArray = [];
  postArray.push(post);
  console.log(postArray);

  const compareFunc = (a, b) => {
    return b - a;
  };
  // postsData.sort(compareFunc);

  const clickLike = () => {
    const likeItem = {
      likeId: post.id,
      authorId: data,
    };
    const createLike = async () => {
      const response = await axios.post(`/post/${post.id}/like`, likeItem);
      return response.data;
    };
    createLike();
    window.location.reload();
  };

  const clickDelete = () => {
    if (Number(data) === post.authorId) {
      alert("投稿を削除します");
      axios.delete(`/post/${post.id}`);
      window.location.reload();
    } else {
      alert("自分の投稿以外は削除できません");
    }
  };

  return (
    <>
      <div class="p-6 border-b-2">
        {/* //top */}
        <div>
          <ul class="flex">
            <li class="mr-4"><img src={`${process.env.PUBLIC_URL}/profile.png`} alt="profile" class="w-10 rounded-full"/></li>
            <li class="mr-4">
              <Link to={`/profile/${post.authorId}`}>{post.username}</Link>
            </li>
            <li class="mr-4">@{post.userId}</li>
            <li>{dayjs(post.createdAt).fromNow()}</li>
          </ul>
          {/* <p class="my-4">{post.desc}</p> */}
        </div>
        {/* //center */}
        <div>
          <div class="my-3">{post.desc}</div>
        </div>
        <div>
          <ul class="flex">
            <li class="w-32">
              <ChatBubbleOutline onClick={clickComment} />
              {post.comment.length}
            </li>
            {/* <li class="w-32">
              <FavoriteBorder onClick={clickLike} />
              {post.likes.length}
            </li> */}
            <li>
              <button onClick={clickDelete} class="px-2 py-1 m-2 bg-mypink text-white font-semibold rounded-full hover:opacity-80">削除</button>
            </li>
          </ul>
        </div>
        {openComment ? <CommentPost post={post} userData={userData} /> : ("")}
      </div>
      
    </>
  );
};

export default Post;
