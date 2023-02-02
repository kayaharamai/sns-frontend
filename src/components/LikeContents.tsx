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

const LikeContents = () => {
  const [mylike, setMylike] = useState<any>([]);
  const { state } = useLocation();

  const navigate = useNavigate();
  const params = useParams();

  dayjs.locale("ja");
  extend(relativeTime);

  useEffect(() => {
    setMylike(state.state);
  }, []);

  const clickReturn = () => {
    navigate(`/profile/${params.id}`);
  };

  const clikeRemove = () => {
    const deleteLike = async () => {
      const response = await axios.delete(`/post/${params}/like`);
      return response.data;
    };
    deleteLike();
  };

  const likePost = mylike.map((like: any) =>
    // eslint-disable-next-line array-callback-return
    like.likes.map((item: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return item
    })
  );
  return (
    <div>
      <button onClick={clickReturn}>
        <ArrowBack />
      </button>
      <div className="p-6 border-b-2">
        <div>
          {mylike.map((like: any) => {
            return (
              <>
                <ul className="flex">
                  <li className="mr-4">
                    <img
                      src={`${process.env.PUBLIC_URL}/profile.png`}
                      alt="profile"
                      className="w-10 rounded-full"
                    />
                  </li>
                  <li className="mr-4">
                    <Link to={`/profile/${like.authorId}`}>
                      {like.username}
                    </Link>
                  </li>
                  <li className="mr-4">@{like.userId}</li>
                  <li className="mr-4">{dayjs(like.createdAt).fromNow()}</li>
                </ul>
                <div>
                  <div className="my-4">{like.desc}</div>
                  <div>{like.id}</div>
                </div>
                <div>
                  <ul className="flex">
                    <li className="w-32 items-center">
                      <ChatBubbleOutline />
                      {like.comment.length}
                    </li>
                    <li className="w-32 items-center">
                      <FavoriteBorder
                        onClick={() => {
                          const deleteLike = async () => {
                            const response = await axios.delete(
                              `/post/${Number(like.id)}/like`
                            );
                            return response.data;
                          };
                          deleteLike();
                        }}
                      />
                      {like.likes.length}
                    </li>
                  </ul>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LikeContents;
