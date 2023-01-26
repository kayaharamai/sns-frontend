import React, { useState } from "react";
import { useEffect } from "react";
import Post from "./posts/Post";
import Share from "./posts/Share";
import axios, { AxiosResponse } from "axios";
import { Posts } from "../types/Types";

const Timeline: React.FC = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [userData, setUserData] = useState<any>([]);

  const data: string | null = localStorage.getItem("id");

  // interface Posts {
  //   authorId: number;
  //   comment: [];
  //   createdAt: string;
  //   desc: string;
  //   id: number;
  //   img: null;
  //   likes: [];
  //   userId: string;
  //   username: string;
  // }

  // interface UserData {
  //   desc: string;
  //   email: string;
  //   followers: [];
  //   followings: [];
  //   id: number;
  //   isAdmin: boolean;
  //   password: string;
  //   posts: [];
  //   profilePicture: string;
  //   userId: string;
  //   username: string;
  // }

  // interface Followings {
  //   id: number;
  //   followerId: number;
  //   userId: string;
  // }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios
        .get("/post")
        .then((responses: AxiosResponse<Posts[]>) => setPosts(responses.data));
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const currentUser = async () => {
      const response = await axios
        .get(`/profile/${data}`)
        .then((responses: AxiosResponse<any[]>) => setUserData(responses.data));
    };
    currentUser();
  }, [posts]);

  const followUser: string[] = userData.followings?.map(
    (user: any) => user.userId
  );

  followUser?.push(userData.userId);

  const newPost: Posts[] = posts.filter((item: Posts) =>
    followUser?.includes(item.userId)
  );

  return (
    <div className="bg-white basis-2/4">
      <Share userData={userData} />
      {newPost.map((followpost: Posts) => {
        return (
          <Post post={followpost} key={followpost.id} userData={userData} />
        );
      })}
    </div>
  );
};

export default Timeline;
