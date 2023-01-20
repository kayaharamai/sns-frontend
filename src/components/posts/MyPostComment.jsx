import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useState } from "react";

const MyPostComment = (props) => {
  const { mypost,userData } = props;
  const desc = useRef();
  const [alertMessage, setAlertMessage] = useState(false);

  const myPostComment = mypost.comment;
  console.log(myPostComment);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      comment: desc.current.value,
      postId: mypost.id,
      userId: userData.userId,
      username: userData.username,
    };
    if (desc.current.value !== "") {
      await axios.post(`/post/${mypost.id}/comment`, newComment);
      window.location.reload();
    } else {
      setAlertMessage(true);
    }
  };


  return (
    <div>
      <div>
        {myPostComment.map((comment) => {
          return (
            <p class="my-5 mr-3">
              {comment.userId}
              <span class="ml-5">{comment.comment}</span>
            </p>
          );
        })}
      </div>
      <form　onSubmit={handleSubmit} class="my-6 bg-mygreen rounded-lg">
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

export default MyPostComment;
