import React from "react";
import { ChatBubbleOutline } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import CommentPost from "./CommentPost";
import { Link } from "react-router-dom";
import dayjs, { locale, extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";
import DeleteModal from "../DeleteModal";
import { PropsPost } from "../../types/Types";

const Post: React.FC<PropsPost> = (props) => {
  const { post, userData } = props;
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const isAdmin: boolean = true;
  const data: string | null = localStorage.getItem("id");

  dayjs.locale("ja");
  extend(relativeTime);

  const clickComment = () => {
    if (openComment === false) {
      setOpenComment(true);
    } else {
      setOpenComment(false);
    }
  };

  let postArray = [];
  postArray.push(post);

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
                // userDelete={"ok"}
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
