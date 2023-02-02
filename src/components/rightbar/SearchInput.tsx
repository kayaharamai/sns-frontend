import React, { useState, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { SearchUser, SearchUserData } from "../../types/Types";

const SearchInput: React.FC = () => {
  const [userData, setUserData] = useState<SearchUserData[]>([]);
  const [alertMessage, setAlertMessage] = useState<boolean>(false);
  const userId = useRef<HTMLInputElement>(null!);

  const clickSearch = () => {
    console.log(userId.current.value.length);
    const searchItem: SearchUser = {
      userId: userId.current.value,
    };

    if (userId.current.value.length !== 0) {
      const getUser = async () => {
        const response = await axios
          .post("/user/find", searchItem)
          .then((responses: AxiosResponse<SearchUserData[]>) =>
            setUserData(responses.data)
          );
        // return response.data;
      };
      getUser();
      setAlertMessage(false);
    } else {
      setAlertMessage(true);
    }
  };

  console.log(Object.keys(userData).length === 0,9);

  return (
    <div className="my-8 pb-2">
      <div className="mt-8 pt-2">
        <p className="m-6 text-sm">ユーザーIDを入力して検索</p>
      </div>
      <div className="m-5">
        <input
          type="text"
          placeholder="ユーザーIDを入力"
          className="rounded-3xl p-2 mr-2"
          ref={userId}
        />
        <button
          className="px-2 py-1 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
          onClick={clickSearch}
        >
          検索
        </button>
      </div>
      <div>
        {userData.map((user: SearchUserData) => {
          return (
            <React.Fragment key={user.id}>
              <p className="m-8" onClick={() => window.location.reload()}>
                {Object.keys(userData).length !== 0 ? (
                  <Link to={`/profile/${user.id}`}>{user.userId}</Link>
                ) : (
                  <p>ユーザーが見つかりません</p>
                )}
              </p>
            </React.Fragment>
          );
        })}
        {alertMessage ? (
          <p className="text-red-500 text-sm ml-6">1文字以上入力してください</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SearchInput;
