import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,useLocation,Link } from "react-router-dom";

const UserSearch = () => {
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const userIdData = user.map((user) => user.id)

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("/users/all");
      setUser(response.data);
    };
    fetchUser();
  }, []);


  const click = () => {
    window.location.reload();
  }

  return (
    <div>
      <ul>
        {user.map((userData) => {
          return (
            <li class="m-3">
              {userData.username}：
              <span class="mr-1" onClick={click}>
                <Link to={`/profile/${userData.id}`}>{userData.userId}</Link>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserSearch;
