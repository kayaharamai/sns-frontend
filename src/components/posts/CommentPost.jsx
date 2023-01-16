import React from "react";
import { useRef } from "react";
import axios from "axios";

const CommentPost = (props) => {
  const { post, userData } = props;
  console.log(userData, 90);

  const desc = useRef();

  const comment = post.comment;
  const commentAll = comment.map((comment) => {
    return comment.comment;
  });
  const commentUser = comment.map((commentuser) => {
    return commentuser.userId;
  });

  console.log(comment,comment,10);
  console.log(commentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      comment: desc.current.value,
      postId: post.id,
      userId: userData.userId,
      username: userData.username,
    };

    await axios.post(`/post/${post.id}/comment`, newComment);
    window.location.reload();
  };

  return (
    <div class="m-5">
      <div>
        {comment.map((comment) => {
          return (
            <>
            <p>{comment.userId}{comment.comment}</p>
            </>
          )
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="返信" ref={desc}></input>
        <button type="suubmit">投稿する</button>
      </form>
    </div>
  );
};

export default CommentPost;
