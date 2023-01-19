import { Favorite, Home, Person, Settings } from "@mui/icons-material";
import React from "react";
import { useNavigate,Link } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();
  const  data = localStorage.getItem('id');
  console.log(data);

  const clickLogout = () => {
    localStorage.removeItem("id")
    alert("ログアウトしました")
    navigate("/login");
  }

  const clickProfile = () => {
    navigate(`/profile/${data}`)
    window.location.reload();
  }

  return (
    <div class="bg-white basis-1/4 sticky top-0 left-0">
      <div class="content-around">
        <ul class="">
          <li class="m-8 bg-mygreen w-1/2 p-2 rounded-3xl shadow-md hover:shadow-none">
            <Home />
            <Link to="/home">
              <span class="">ホーム</span>
            </Link>
            </li>
          <li class="m-8 bg-mygreen w-1/2 p-2 rounded-3xl shadow-md hover:shadow-none">
            <Person />
            <span onClick={clickProfile} class="cursor-pointer">プロフィール</span>
          </li>
          {/* <li class="m-8 bg-mygreen w-1/2 p-2 rounded-3xl shadow-md hover:shadow-none">
            <Favorite />
            <Link to="/like">
              <span class="">いいね</span>
            </Link>
          </li> */}
          <li class="m-8 bg-mygreen w-1/2 p-2 rounded-3xl shadow-md hover:shadow-none">
            <Settings />
            <Link to="/setting">
              <span class="">設定</span>
            </Link>
          </li>
        </ul>
        <button class="px-2 py-1 m-8 bg-mypink text-white font-semibold rounded-full hover:opacity-80" onClick={clickLogout}>ログアウト</button>
      </div>
    </div>
  );
};

export default Sidebar;
