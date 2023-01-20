import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [userData, setUserData] = useState([]);
  const [alertMessage, setAlertMessage] = useState(false);
  const userId = useRef();

  console.log(alertMessage,89)

  const clickSearch = () => {
    console.log(userId.current.value.length);
    const searchItem = {
      userId: userId.current.value,
    };

    if (userId.current.value.length !== 0) {
      const getUser = async () => {
        const response = await axios.post("/user/find", searchItem);
        return response.data;
      };
      getUser().then((user) => setUserData(user));
      setAlertMessage(false)
    } else {
      setAlertMessage(true);
    }
  };
  console.log(userData, 789);
  console.log(userData.map((user) => console.log(user.username)));

  return (
    <div>
      <div class="mt-8 pt-2">
        <p class="m-5">ユーザーIDを入力して検索</p>
      </div>
      <div class="m-5">
        <input
          type="text"
          placeholder="ユーザーIDを入力"
          class="rounded-3xl p-2 mr-2"
          ref={userId}
        />
        <button class="px-2 py-1 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80" onClick={clickSearch}>検索</button>
      </div>
      <div>
        {userData.map((user) => {
          return (
            <p class="m-8" onClick={() => window.location.reload()}>
              {Object.keys(userData).length > 0 ? (
                <Link to={`/profile/${user.id}`}>{user.userId}</Link>
              ) : (
                "ユーザーが見つかりません"
              )}
            </p>
          );
        })}
        {/* {userData[0] ? (<p class="m-8"><Link to={`/profile/${searchId}`}>{searchUserId}</Link></p>):("")} */}
        {alertMessage ? (<p class="m-6">1文字以上入力してください</p>) : ("")} 
      </div>
    </div>
  );
};

export default SearchInput;
