import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { Comment, NewComment } from "../../types/Types";

const CommentPost = (props: any) => {
  const { post, userData } = props;
  console.log(userData, 90);

  const [alertMessage, setAlertMessage] = useState<boolean>(false);

  const desc = useRef<HTMLInputElement>(null!);

  const comment: Comment[] = post.comment;
  // const commentAll = comment.map((comment: any) => {
  //   return comment.comment;
  // });
  const commentUser: string[] = comment.map((commentuser: any) => {
    return commentuser.userId;
  });

  // interface Comment {
  //   comment: string;
  //   createdAt: string;
  //   id: number;
  //   postId: number;
  //   userId: string;
  //   username: string;
  // }

  // interface NewComment {
  //   comment: string;
  //   postId: number;
  //   userId: string;
  //   username: string;
  // }

  console.log(comment, comment, 10);
  console.log(commentUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment: NewComment = {
      comment: desc.current.value,
      postId: post.id,
      userId: userData.userId,
      username: userData.username,
    };
    if (desc.current.value !== "") {
      await axios
        .post(`/post/${post.id}/comment`, newComment)
        .then((responses) => responses);
      window.location.reload();
    } else {
      setAlertMessage(true);
    }
  };

  return (
    <div>
      <div>
        {comment.map((comment: Comment) => {
          return (
            <React.Fragment key={comment.id}>
              <p className="my-5 mr-3">
                {comment.userId}
                <span className="ml-5">{comment.comment}</span>
              </p>
            </React.Fragment>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="my-6 bg-mygreen rounded-lg">
        <input
          type="text"
          placeholder="コメントする"
          ref={desc}
          className="mr-3 my-4 ml-2 w-9/12"
        ></input>
        <button
          type="submit"
          className="px-2 py-1 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
        >
          投稿
        </button>
        {alertMessage ? <p>1文字以上入力してください</p> : ""}
      </form>
    </div>
  );
};

export default CommentPost;
