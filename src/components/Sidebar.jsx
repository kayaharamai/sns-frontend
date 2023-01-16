import { Favorite, Home, Person, Settings } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();
  const  data = localStorage.getItem('id');
  console.log(data);

  const clickLogout = () => {
    localStorage.removeItem("id")
    alert("ログアウトしました")
    navigate("/login");
  }

  return (
    <div class="bg-blue-300 basis-1/4">
      <div class="content-around">
        <ul class="">
          <li class="m-8">
            <Home />
            <Link to="/">
              <span class="">ホーム</span>
            </Link>
          </li>
          <li class="m-8">
            <Person />
            <Link to={`/profile/${data}`}>
              <span class="">プロフィール</span>
            </Link>
          </li>
          <li class="m-8">
            <Favorite />
            <Link to="/like">
              <span class="">いいね</span>
            </Link>
          </li>
          <li class="m-8">
            <Settings />
            <Link to="/setting">
              <span class="">設定</span>
            </Link>
          </li>
        </ul>
        <button class="px-2 py-1 m-8 bg-blue-400 text-white font-semibold rounded-full hover:bg-blue-500" onClick={clickLogout}>ログアウト</button>
      </div>
    </div>
  );
};

export default Sidebar;
