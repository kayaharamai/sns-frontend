import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useState } from "react";

const CommentPost = (props) => {
  const { post, userData } = props;
  console.log(userData, 90);

  const [alertMessage, setAlertMessage] = useState(false);

  const desc = useRef();

  const comment = post.comment;
  const commentAll = comment.map((comment) => {
    return comment.comment;
  });
  const commentUser = comment.map((commentuser) => {
    return commentuser.userId;
  });

  console.log(comment, comment, 10);
  console.log(commentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      comment: desc.current.value,
      postId: post.id,
      userId: userData.userId,
      username: userData.username,
    };
    if (desc.current.value !== "") {
      await axios.post(`/post/${post.id}/comment`, newComment);
      window.location.reload();
    } else {
      setAlertMessage(true);
    }
  };

  return (
    <div>
      <div>
        {comment.map((comment) => {
          return (
            <>
              <p class="my-5 mr-3">
                {comment.userId}
                <span class="ml-5">{comment.comment}</span>
              </p>
            </>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} class="my-6 bg-mygreen rounded-lg">
        <input
          type="text"
          placeholder="コメントする"
          ref={desc}
          class="mr-3 my-4 ml-2"
        ></input>
        <button
          type="suubmit"
          class="px-2 py-1 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
        >
          投稿
        </button>
        {alertMessage ? <p>1文字以上入力してください</p> : ""}
      </form>
    </div>
  );
};

export default CommentPost;
