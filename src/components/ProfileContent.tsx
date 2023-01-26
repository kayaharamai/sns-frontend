import React, { useEffect, useState } from "react";
import MyPost from "./posts/MyPost";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modals from "./Modal";
import { FollowerItem, FollowItem, SearchItem } from "../types/Types";

const ProfileContent: React.FC = () => {
  const data: string | null = localStorage.getItem("id");
  const params = useParams();

  const [userData, setUserData] = useState<any>([]);
  const [loginUser, setLoginUser] = useState<any>([]);
  const [followers, setFollowers] = useState<any>();
  const [followings, setFollowings] = useState<any>();
  const [removeUser, setRemoveUser] = useState<any>([]);
  const [removerUser, setRemoverUser] = useState<any>([]);
  const [follow, setFollow] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
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

  // interface FollowerItem {
  //   followerId: number;
  //   userId: string;
  // }

  // interface FollowItem {
  //   followId: number;
  //   userId: string;
  // }

  // interface SearchItem {
  //   userId: string;
  //   id: number;
  // }

  const clickFollow = async () => {
    if (Number(data) !== userData.id && follow === false) {
      const followerItem: FollowerItem = {
        followerId: userData.id,
        userId: loginUser.userId,
      };
      const followItem: FollowItem = {
        followId: Number(data),
        userId: userData.userId,
      };
      console.log(followItem);
      await axios.post("/follower", followerItem);
      await axios.post("/following", followItem);
      alert("フォローしました");
      window.location.reload();
      setFollow(true);
    } else {
      alert("自分をフォローできません");
    }
  };

  const clickRemove = () => {
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

  console.log(userData);

  return (
    <div className="basis-2/4">
      <div className="mt-5 border-b-4">
        <div className="flex p-3">
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/profile.png`}
              alt="profile"
              className="w-20 rounded-full mr-5"
            />
          </div>
          <ul className="flex items-center ">
            <li className="mr-4 font-semibold text-lg">{userData.username}</li>
            <li className="font-semibold text-lg">@{userData.userId}</li>
          </ul>
        </div>
        <div className="m-5">
          <ul className="flex my-5">
            <li>{userData.desc}</li>
          </ul>
          <div>
            <ul className="flex mb-2">
              <li className="mr-5">{followings}フォロー</li>
              <li>{followers}フォロワー</li>
            </ul>
            <button
              onClick={clickFollow}
              className="mr-5 px-2 py-1 bg-mypink font-semibold text-sm text-white rounded-full hover:opacity-80"
            >
              フォローする
            </button>
            <button
              onClick={clickRemove}
              className="px-2 py-1 bg-mypink font-semibold text-sm text-white rounded-full hover:opacity-80"
            >
              フォローを外す
            </button>
          </div>
        </div>
        <Modals
          remove={remove}
          editModalIsOpen={editModalIsOpen}
          setEditModalIsOpen={setEditModalIsOpen}
        />
      </div>
      {userData.posts?.map((mypost: any) => {
        return <MyPost mypost={mypost} key={mypost.id} userData={userData} />;
      })}
    </div>
  );
};

export default ProfileContent;
