import React, { useEffect,useState,useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchInput = () => {

  // const clickSearch = () => {
  //   const user = async () => {
  //     const response = await axios.get("/user");
  //   }
  // }

  const [userData, setUserData] = useState([]);
  const userId = useRef();


  useEffect(() => {

  },[])

  const clickSearch = () => {
    const searchItem = {
      userId: userId.current.value
    }
    const getUser = async () => {
      const response = await axios.post("/user",searchItem);
      return response.data;  
    }
    getUser().then((user) => setUserData(user))
  }
  console.log(userData[0])

  return (
    <div>
      <div class="m-5">
        <input
          type="text"
          placeholder="ユーザーIDを入力"
          class="rounded-3xl p-2"
          ref={userId}
        />
        <button onClick={clickSearch}>検索</button>
      </div>
      {userData[0] ? (<p><Link to={`/profile/${userData[0].id}`}>{userData[0].userId}</Link></p>):("")}
    </div>
  );
};

export default SearchInput;
