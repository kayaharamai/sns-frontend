import React from "react";
import {
  ChatBubbleOutline,
  Check,
  FavoriteBorder,
} from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import CommentPost from "./CommentPost";
import { Link } from "react-router-dom";
import dayjs, { locale, extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";
import DeleteModal from "../deleteModal/DeleteModal";
import { PropsPost,LikeId } from "../../types/Types";


const Post: React.FC<PropsPost> = (props) => {
  const { post, userData } = props;
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const isAdmin: boolean = true;
  const data: string | null = localStorage.getItem("id");

  dayjs.locale("ja");
  extend(relativeTime);

  const liked = post.likes.map((like: LikeId) => like.likes);
  
  //投稿のいいねに自分のuserIdがあるか
  const likeId: LikeId[] = post.likes.filter((item: LikeId) =>
    item.likes === userData.userId
  );

  const clickComment = () => {
    if (openComment === false) {
      setOpenComment(true);
    } else {
      setOpenComment(false);
    }
  };

  const clickLike = () => {
    const likeItem = {
      likeId: post.id,
      userId: userData.userId,
      authorId: data,
    };
    if (!liked.includes(userData.userId)) {
      const createLike = async () => {
        const response = await axios.post(`/post/${post.id}/like`, likeItem);
        return response.data;
      };
      createLike();
      window.location.reload();
    } else {
      const deleteLike = async () => {
        const response = await axios.delete(`/post/${likeId[0]?.id}/like`);
        return response.data;
      };
      deleteLike();
      window.location.reload();
    }
  };

  const deleteAlert = () => {
    if (Number(data) === post.authorId) {
      setEditModalIsOpen(true);
    } else {
      alert("自分の投稿以外は削除できません");
    }
  };

  const clickDelete = () => {
    if (Number(data) === post.authorId) {
      axios.delete(`/post/${post.id}`);
      window.location.reload();
    } else {
      alert("自分の投稿以外は削除できません");
    }
  };


  return (
    <>
      <div className="p-6 border-b-2">
        <div>
          <ul className="flex">
            <li className="mr-4">
              <img
                src={`${process.env.PUBLIC_URL}/profile.png`}
                alt="profile"
                className="w-10 rounded-full"
              />
            </li>
            <li className="mr-4">
              <Link to={`/profile/${post.authorId}`}>{post.username}</Link>
            </li>
            <li className="mr-4">@{post.userId}</li>
            <li>{dayjs(post.createdAt).fromNow()}</li>
          </ul>
        </div>
        <div>
          <div className="my-4">{post.desc}</div>
        </div>
        <div>
          <ul className="flex">
            <li className="w-32 items-center">
              <ChatBubbleOutline onClick={clickComment} />
              {post.comment.length}
            </li>
            <li className="w-32 items-center">
              <FavoriteBorder onClick={clickLike} />
              {post.likes.length}
              {liked.includes(userData.userId) ? <span className="text-xs ml-2 text-mypink"><Check /></span> : ""}
            </li>
            <li>
              <button
                onClick={deleteAlert}
                className="px-2 py-1 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
              >
                削除
              </button>
            </li>
            {editModalIsOpen ? (
              <DeleteModal
                clickDelete={clickDelete}
                editModalIsOpen={editModalIsOpen}
                setEditModalIsOpen={setEditModalIsOpen}
                isAdmin={isAdmin}
              />
            ) : (
              ""
            )}
          </ul>
        </div>
        {openComment ? <CommentPost post={post} userData={userData} /> : ""}
      </div>

    </>
  );
};

export default Post;
