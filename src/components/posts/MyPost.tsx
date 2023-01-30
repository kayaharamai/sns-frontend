import React from "react";
import { ChatBubbleOutline, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import MyPostComment from "./MyPostComment";
import { useState } from "react";
import dayjs, { locale, extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";
import DeleteModal from "../DeleteModal";
import { LikeId, PropsMyPost } from "../../types/Types";

const MyPost: React.FC<PropsMyPost> = (props) => {
  const { mypost, userData } = props;

  const [openComment, setOpenComment] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const myPost: boolean = true;
  const isAdmin: boolean = true;

  const data: string | null = localStorage.getItem("id");

  dayjs.locale("ja");
  extend(relativeTime);

  const liked = mypost.likes.map((like: LikeId) => like.likes)

  const likeId: LikeId[] = mypost.likes.filter((item: LikeId) =>
    item.likes === userData.userId
  );

  const myPostLike = () => {
    const likeItem = {
      likeId: mypost.id,
      userId: userData.userId,
      authorId: data
    };
    if (!liked.includes(userData.userId)) {
      const createLike = async () => {
        const response = await axios.post(`/post/${mypost.id}/like`, likeItem);
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
  }

  const deleteAlert = () => {
    if (Number(data) === mypost.authorId) {
      setEditModalIsOpen(true);
    } else {
      alert("自分の投稿以外は削除できません");
    }
  };

  const clickMyDelete = () => {
    if (Number(data) === mypost.authorId) {
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
          <li className="mr-4">{mypost.username}</li>
          <li className="mr-4">@{mypost.userId}</li>
          <li className="mr-4">{dayjs(mypost.createdAt).fromNow()}</li>
        </ul>
      </div>
      <div>
        <div className="my-4">{mypost.desc}</div>
      </div>
      <div>
        <ul className="flex">
          <li className="w-32">
            <ChatBubbleOutline onClick={clickComment} />
            {mypost.comment.length}
          </li>
          <li className="w-32">
            <FavoriteBorder onClick={myPostLike} />
            {mypost.likes.length}
            {liked.includes(userData.userId) ? <span className="text-xs ml-2 text-mypink">いいね済み</span> : ""}
          </li>
          <li>
            <button
              onClick={deleteAlert}
              className="px-2 py-1 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
            >
              削除
            </button>
            {editModalIsOpen ? (
              <DeleteModal
                // mypost={true} //削除
                // userDelete={"ok"}
                isAdmin={isAdmin}
                clickDelete={clickMyDelete}
                setEditModalIsOpen={setEditModalIsOpen}
                editModalIsOpen={editModalIsOpen}
              />
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
      {openComment ? <MyPostComment mypost={mypost} userData={userData} /> : ""}
    </div>
  );
};

export default MyPost;
