import React from "react";
import { ChatBubbleOutline, FavoriteBorder } from "@mui/icons-material";

const LikePost = ({ post }) => {
  const clickComment = () => {
    alert("コメントを投稿します");
  };

  const clickLike = () => {
    alert("いいねを押しました");
  };

  return (
    <div class="m-5 bg-gray-300">
      {/* //top */}
      <div>
        <ul class="flex">
          <li class="mr-4">画像</li>
          <li class="mr-4">{post.username}</li>
          <li class="mr-4">@{post.userId}</li>
          <li class="mr-4">{post.date}</li>
        </ul>
      </div>
      {/* //center */}
      <div>
        <div class="my-3">{post.desc}</div>
      </div>
      <div>
        <ul class="flex">
          <li class="w-32">
            <ChatBubbleOutline onClick={clickComment} />
            {post.comment}
          </li>
          <li>
            <FavoriteBorder onClick={clickLike} />
            {post.like}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LikePost;
