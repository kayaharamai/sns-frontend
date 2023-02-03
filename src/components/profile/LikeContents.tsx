import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import dayjs, { locale, extend } from "dayjs";
import { ChatBubbleOutline, Check, FavoriteBorder } from "@mui/icons-material";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams } from "react-router-dom";
import { LikeId, Posts, UserData } from "../../types/Types";
import LikeComment from "../posts/LikeComment";

const LikeContents = (mylike:any) => {
  const [myuser, setMyUser] = useState<any>([]);
  const [openComment, setOpenComment] = useState<boolean>(false);

  const params = useParams();

  dayjs.locale("ja");
  extend(relativeTime);

  useEffect(() => {
    const myUser = async () => {
      const response = await axios
        .get(`/profile/${params.id}`)
        .then((responses: AxiosResponse<UserData[]>) =>
          setMyUser(responses.data)
        );
    };
    myUser();
  }, []);

  const likePost = mylike.mylike;

  const clickComment = () => {
    if (openComment === false) {
      setOpenComment(true);
    } else {
      setOpenComment(false);
    }
  };

  //投稿のいいねに自分のuserIdがあるか
  const likeId: LikeId[] = likePost.likes?.filter(
    (item: LikeId) => item.likes === myuser.userId
  );

  const clickRemove = () => {
    const deleteLike = async () => {
      const response = await axios.delete(`/post/${likeId[0]?.id}/like`);
      return response.data;
    };
    deleteLike();
    window.location.reload();
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
          <li className="mr-4">
            <Link to={`/profile/${likePost.authorId}`}>
              {likePost.username}
            </Link>
          </li>
          <li className="mr-4">@{likePost.userId}</li>
          <li>{dayjs(likePost.createdAt).fromNow()}</li>
        </ul>
      </div>
      <div>
        <div className="my-4">{likePost.desc}</div>
      </div>
      <div>
        <ul className="flex">
          <li className="w-32 items-center">
            <ChatBubbleOutline onClick={clickComment} />
            {likePost.comment.length}
          </li>
          <li className="w-32 items-center">
            <FavoriteBorder onClick={clickRemove} />
            {likePost.likes.length}
            <span className="text-xs ml-2 text-mypink">
              <Check />
            </span>
          </li>
        </ul>
      </div>
      {openComment ? <LikeComment mypost={likePost} userData={myuser} /> : ""}
    </div>
  );
};

export default LikeContents;
