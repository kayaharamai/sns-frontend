import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchInput = () => {
  const [userData, setUserData] = useState([]);
  const [alertMessage, setAlertMessage] = useState(false);
  const userId = useRef();

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
      setAlertMessage(false);
    } else {
      setAlertMessage(true);
    }
  };

  return (
    <div class="my-8 pb-2">
      <div class="mt-8 pt-2">
        <p class="m-6 text-sm">ユーザーIDを入力して検索</p>
      </div>
      <div class="m-5">
        <input
          type="text"
          placeholder="ユーザーIDを入力"
          class="rounded-3xl p-2 mr-2"
          ref={userId}
        />
        <button
          class="px-2 py-1 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
          onClick={clickSearch}
        >
          検索
        </button>
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
        {alertMessage ? (
          <p class="text-red-500 text-sm ml-6">1文字以上入力してください</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SearchInput;
