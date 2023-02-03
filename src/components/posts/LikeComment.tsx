import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { Comment, NewComment, PropsMyPost } from "../../types/Types";

const LikeComment: React.FC<PropsMyPost> = (props) => {
  const { mypost, userData } = props;
  const desc = useRef<HTMLInputElement>(null!);
  const [alertMessage, setAlertMessage] = useState<boolean>(false);

  const myPostComment: Comment[] = mypost.comment;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment: NewComment = {
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
        {myPostComment.map((comment: Comment) => {
          return (
            <p key={comment.id} className="my-5 mr-3">
              {comment.userId}
              <span className="ml-5">{comment.comment}</span>
            </p>
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

export default LikeComment;
