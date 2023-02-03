import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs, { locale, extend } from "dayjs";
import {
  ArrowBack,
  ChatBubbleOutline,
  Check,
  FavoriteBorder,
} from "@mui/icons-material";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LikeId } from "../types/Types";
import LikeComment from "./posts/LikeComment";

const LikeContents = (mylike:any) => {
  const [myuser, setMyUser] = useState<any>([]);
  const [openComment, setOpenComment] = useState<boolean>(false);
  // const {state} = useLocation();

  const navigate = useNavigate();
  const params = useParams();

  dayjs.locale("ja");
  extend(relativeTime);

  useEffect(() => {
    const myUser = async () => {
      const response = await axios.get(`/profile/${params.id}`).then((responses) => setMyUser(responses.data))
    }
    myUser();
  }, []);


  


  const likePost = mylike.mylike;


  const clickReturn = () => {
    navigate(`/profile/${params.id}`);
  };

  const clickComment = () => {
    if (openComment === false) {
      setOpenComment(true);
    } else {
      setOpenComment(false);
    }
  };

  const likeId: LikeId[] = likePost.likes?.filter((item: LikeId) =>
    item.likes === myuser.userId
  );
  // console.log(likeId,0)
  // const likePostId = likePost.map((like:any) => like.likes.filter((item:any) => item.likes === myuser.userId))

  const clickRemove = (index:any) => {
    const deleteLike = async () => {
      const response = await axios.delete(`/post/${likeId[0]?.id}/like`);
      return response.data;
    };
    deleteLike();
    window.location.reload();
  };

  // const postLikeId = likePost.likes?.map(
  //   (like: any) => like.id
  // );
  // console.log(postLikeId)

  // const liked = likePost.likes?.map((like: LikeId) => like.likes);
  console.log(mylike,0)

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
              <Link to={`/profile/${likePost.authorId}`}>{likePost.username}</Link>
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
              <ChatBubbleOutline onClick={clickComment}/>
              {likePost.comment.length}
            </li>
            <li className="w-32 items-center">
              <FavoriteBorder onClick={clickRemove} />
              {likePost.likes.length}
              <span className="text-xs ml-2 text-mypink"><Check /></span>
            </li>
          </ul>
        </div>
        {openComment ? <LikeComment mypost={likePost} userData={myuser} /> : ""}
      </div>
  );
};

export default LikeContents;
