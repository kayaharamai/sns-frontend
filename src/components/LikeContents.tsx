import React, { useEffect,useState } from 'react'
import axios, { AxiosResponse } from "axios";
import { UserData } from '../types/Types';

const LikeContents = () => {

  const [myLike, setMylike] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]); //UserData
  const data: string | null = localStorage.getItem("id");

  useEffect(() => {
    const currentUser = async () => {
      const response = await axios
        .get(`/profile/${data}`)
        .then((responses: AxiosResponse<UserData[]>) =>
          setUserData(responses.data)
        );
    };
    currentUser();
  },[])

  useEffect(() => {
    const postLike = async () => {
      const user = {
        userId: userData.userId
      }
      const response = await axios
        .post("/post/find",user)
        .then((responses: AxiosResponse<any>) => setMylike(responses.data));
    };
    postLike();
  }, []);

  console.log(myLike,90)

  return (
    <div className='bg-white basis-2/4'>
      
    </div>
  )
}

export default LikeContents
