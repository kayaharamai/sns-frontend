import React, { useEffect,useState } from 'react'
import axios, { AxiosResponse } from "axios";
import { UserData } from '../types/Types';

const LikeContents = () => {

  const [myLike, setMylike] = useState<any>([]);

  useEffect(() => {
    const currentUser = async () => {
      const user = {
        userId: "tanaka_sns"
      }
      const response = await axios
        .post("/post/find",user)
        .then((responses: AxiosResponse<any>) => setMylike(responses.data));
    };
    currentUser();
  }, []);

  console.log(myLike)

  return (
    <div className='bg-white basis-2/4'>
    </div>
  )
}

export default LikeContents
