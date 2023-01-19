import React, { useEffect, useState } from "react";
import MyPost from "./posts/MyPost";
import { MyPosts } from "../DummyData";
import axios from "axios";
import { useParams } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Modals from "./Modal";
import { Button, Container } from "@mui/material";

const ProfileContent = () => {
  const data = localStorage.getItem("id");
  const params = useParams();

  const [userData, setUserData] = useState([]);
  const [loginUser, setLoginUser] = useState([]);
  const [followers, setFollowers] = useState();
  const [followings, setFollowings] = useState();
  const [removeUser, setRemoveUser] = useState([]);
  const [removerUser, setRemoverUser] = useState([]);
  const [follow, setFollow] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

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

  const clickFollow = async () => {
    if (Number(data) !== userData.id && follow === false) {
      const followerItem = {
        followerId: userData.id,
        userId: loginUser.userId,
      };
      const followItem = {
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
  console.log(userData, "ha");
  console.log(follow, "js");

  const clickRemove = () => {
    setEditModalIsOpen(true);
    const searchItem = {
      userId: userData.userId,
      id: Number(data),
    };
    const remove = async () => {
      const response = await axios.post("/following/search", searchItem);
      return response.data;
    };
    remove().then((user) => setRemoveUser(user));
    console.log(removeUser[0], "e");

    const searchItem2 = {
      userId: loginUser.userId,
      id: Number(params.id),
    };
    const remover = async () => {
      const response = await axios.post("/follower/search", searchItem2);
      return response.data;
    };
    remover().then((user) => setRemoverUser(user));
    console.log(removerUser[0], "r");
  };

  const remove = () => {
    const userRemove = async () => {
      const response = await axios.delete(
        `/followings/${Number(removeUser[0].id)}`
      );
      return response.data;
      // console.log(response.data)
    };
    userRemove().then((response) => console.log(response));
    // alert("フォロー解除しました")

    const userRemover = async () => {
      const response = await axios.delete(`/follower/${removerUser[0].id}`);
      return response.data;
    };
    userRemover().then((response) => console.log(response));
    setEditModalIsOpen(false);
    window.location.reload();
  };

  console.log(userData);
  // console.log(followers,followings)

  return (
    <div class="basis-2/4">
      {/* <div class="w-full h-52 bg-red-100">coverpicture</div> */}
        <div class="mt-5 border-b-4">
          <div class="flex p-3">
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/profile.png`}
                alt="profile"
                class="w-20 rounded-full mr-5"
              />
            </div>
            <ul class="flex items-center ">
              <li class="mr-4">{userData.username}</li>
              <li>@{userData.userId}</li>
            </ul>
          </div>
          <div class="m-5">
            <ul class="flex mb-2">
              <li>{userData.desc}aaa</li>
              <li>
                <button>編集</button>
              </li>
            </ul>
            <div>
              <ul class="flex mb-2">
                <li class="mr-5">{followings}フォロー</li>
                <li>{followers}フォロワー</li>
              </ul>
              <button onClick={clickFollow} class="mr-5">フォローする</button>
              <button onClick={clickRemove}>フォローを外す</button>
            </div>
        </div>
        {/* <div>
          <p>本当に解除しますか？</p>
          <button onClick={remove}>解除</button>
        </div> */}
        <Modals
          remove={remove}
          editModalIsOpen={editModalIsOpen}
          setEditModalIsOpen={setEditModalIsOpen}
        />
      </div>
      {userData.posts?.map((mypost) => {
        return <MyPost mypost={mypost} key={mypost.id} userData={userData}/>;
      })}
    </div>
  );
};

export default ProfileContent;
