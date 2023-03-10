import React, { useEffect, useState } from "react";
import MyPost from "../posts/MyPost";
import axios, { AxiosResponse } from "axios";
import { Link, useParams } from "react-router-dom";
import Modals from "../deleteModal/Modal";
import {
  Follower,
  FollowerItem,
  Followings,
  FollowItem,
  Posts,
  SearchItem,
} from "../../types/Types";
import LikeContents from "./LikeContents";

const ProfileContent: React.FC = () => {
  const data: string | null = localStorage.getItem("id");
  const params = useParams();

  const [userData, setUserData] = useState<any>([]);
  const [mylike, setMylike] = useState<Posts[]>([]);
  const [loginUser, setLoginUser] = useState<any>([]);
  const [followers, setFollowers] = useState<number>();
  const [followings, setFollowings] = useState<number>();
  const [removeUser, setRemoveUser] = useState<Follower[]>([]);
  const [removerUser, setRemoverUser] = useState<Followings[]>([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [likeConfirm, setLikeConfirm] = useState<boolean>(false);


  useEffect(() => {
    //ログインユーザーの取得
    const currentUser = async () => {
      const response = await axios.get(`/profile/${params.id}`);
      setUserData(response.data);
      setFollowers(Object.keys(response.data.followers).length);
      setFollowings(Object.keys(response.data.followings).length);
    };
    currentUser();

    const loginUser = async () => {
      const response = await axios.get(`/profile/${data}`);
      setLoginUser(response.data);
    };
    loginUser();
  }, []);

  useEffect(() => {
    //いいね済みの投稿を取得してコンポーネント受け渡し
    const postLike = async () => {
      const user = {
        authorId: params.id,
      };
      const response = await axios
        .post("/post/find", user)
        .then((responses: AxiosResponse<any>) => setMylike(responses.data));
    };
    postLike();
  }, []);

  const followArray = userData.followers?.map((item: any) => item.userId);

  //フォロー確認（フォロワー内のログインユーザーID確認）
  const followUser = followArray?.includes(loginUser.userId);

  const clickFollow = async () => {
    if (Number(data) === userData.id) {
      alert("自分をフォローできません");
    } else {
      if (Number(data) !== userData.id && !followUser) {
        const followerItem: FollowerItem = {
          followerId: userData.id,
          userId: loginUser.userId,
          followId: Number(data),
        };
        const followItem: FollowItem = {
          followId: Number(data),
          userId: userData.userId,
          followerId: userData.id,
        };
        console.log(followItem);
        await axios.post("/follower", followerItem);
        await axios.post("/following", followItem);
        alert("フォローしました");
        window.location.reload();
      } else {
        alert("すでにフォロー済みです");
      }
    }
  };

  const clickRemove = () => {
    //フォロー解除に必要な情報をバックエンド側で絞り込んで取得
    if (Number(data) !== userData.id) {
      setEditModalIsOpen(true);
      const searchItem: SearchItem = {
        userId: userData.userId,
        id: Number(data),
      };
      const remove = async () => {
        const response = await axios.post("/following/search", searchItem);
        return response.data;
      };
      remove().then((user) => setRemoveUser(user));
    } else {
      alert("自分のフォローを解除できません");
    }

    const searchItem2: SearchItem = {
      userId: loginUser.userId,
      id: Number(params.id),
    };
    const remover = async () => {
      const response = await axios.post("/follower/search", searchItem2);
      return response.data;
    };
    remover().then((user) => setRemoverUser(user));
  };

  const remove = () => {
    //フォロー済みユーザーの削除、削除モーダルへ受け渡して処理
    const userRemove = async () => {
      const response = await axios.delete(
        `/followings/${Number(removeUser[0].id)}`
      );
      return response.data;
    };
    userRemove().then((response) => console.log(response));

    const userRemover = async () => {
      const response = await axios.delete(`/follower/${removerUser[0].id}`);
      return response.data;
    };
    userRemover().then((response) => console.log(response));
    setEditModalIsOpen(false);
    window.location.reload();
  };

  const likePost = () => {
    if (likeConfirm === false) {
      setLikeConfirm(true);
    } else {
      setLikeConfirm(false);
    }
  };

  return (
    <div className="basis-2/4 max-h-screen overflow-scroll">
      <div className="mt-5 border-b-4">
        <div className="flex p-3">
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/profile.png`}
              alt="profile"
              className="w-20 rounded-full mr-5"
            />
          </div>
          <ul className="flex items-center">
            <li className="mr-4 font-semibold text-lg">{userData.username}</li>
            <li className="font-semibold text-lg">@{userData.userId}</li>
            <li>
              {followUser ? (
                <span className="text-xs ml-5 text-mypink">フォロー中</span>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
        <div className="m-5">
          <ul className="flex my-5">
            <li>{userData.desc}</li>
          </ul>
          <div>
            <ul className="flex mb-5">
              <li className="mr-5">
                <Link
                  to={`/profile/${params.id}/following`}
                  state={{ state: userData }}
                >
                  {followings}フォロー
                </Link>
              </li>
              <li>
                <Link
                  to={`/profile/${params.id}/follower`}
                  state={{ state: userData }}
                >
                  {followers}フォロワー
                </Link>
              </li>
            </ul>
            <button
              onClick={clickFollow}
              className="mr-5 px-2 py-1 bg-mypink font-semibold text-sm text-white rounded-full hover:opacity-80"
            >
              フォローする
            </button>
            {followUser ? (
              <button
                onClick={clickRemove}
                className="px-2 py-1 bg-mypink font-semibold text-sm text-white rounded-full hover:opacity-80"
              >
                フォローを外す
              </button>
            ) : (
              ""
            )}

            <button
              onClick={likePost}
              className="ml-5 px-2 py-1 bg-mypink font-semibold text-sm text-white rounded-full hover:opacity-80"
            >
              いいね
            </button>
          </div>
        </div>
        <Modals
          remove={remove}
          appElement={document.getElementById("app")}
          editModalIsOpen={editModalIsOpen}
          setEditModalIsOpen={setEditModalIsOpen}
        />
      </div>

      {likeConfirm ? (
        <ul>
          <li className="m-5 font-semibold text-lg border-double border-b-2 border-mypink inline-block">
            All Likes
          </li>
          {mylike.map((mylikePost: any) => {
            return (
              <li key={mylikePost.id}>
                <LikeContents mylike={mylikePost} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          <p　className="m-5 font-semibold text-lg border-double border-b-2 border-mypink inline-block">All Posts</p>
          {userData.posts?.map((mypost: Posts) => {
            return (
              <React.Fragment key={mypost.id}>
                <MyPost mypost={mypost} key={mypost.id} userData={userData} />
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
