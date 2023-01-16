import React, { useEffect, useState } from "react";
import MyPost from "./posts/MyPost";
import { MyPosts } from "../DummyData";
import axios from "axios";
import { useParams } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const ProfileContent = () => {
  const data = localStorage.getItem("id");
  const params = useParams();

  const [userData, setUserData] = useState([]);
  const [followers,setFollowers] = useState();
  const [followings,setFollowings] = useState();

  useEffect(() => {
    const currentUser = async () => {
      const response = await axios.get(`/profile/${params.id}`);
      setUserData(response.data);
      setFollowers(Object.keys(response.data.followers).length) 
      setFollowings(Object.keys(response.data.followings).length)
    };
    currentUser();
  }, []);

  const clickFollow = async () => {
    if(Number(data) !== userData.id){
      const followerItem = {
        followerId: userData.id,
        userId: "tanaka_sns"
      }
      const followItem = {
        followId: Number(data),
        userId: userData.userId
      }
      console.log(followItem)
      await axios.post("/follower",followerItem)
      await axios.post("/following",followItem)
      alert("フォローしました")
    } else {
      alert("自分をフォローできません")
    }
}

  console.log(userData)
  // console.log(followers,followings)

  return (
    <div class="bg-purple-300 basis-2/4">
      <div class="w-full h-52 bg-red-100">coverpicture</div>
      <div>
        <div class="m-5">
          <div>画像</div>
          <ul class="flex">
            <li>{userData.username}</li>
            <li>@{userData.userId}</li>
          </ul>
          <ul class="flex">
            <li>{userData.desc}aaa</li>
            <li>
              <button>編集</button>
            </li>
          </ul>
          <div>
          <ul class="flex">
            <li>{followings}フォロー</li>
            <li>{followers}フォロワー</li>
          </ul>
          <button onClick={clickFollow}>フォローする</button>
          </div>
        </div>
      </div>
      {userData.posts?.map((mypost) => {
        return <MyPost mypost={mypost} key={mypost.id} />;
      })}
    </div>
  );
};

export default ProfileContent;
