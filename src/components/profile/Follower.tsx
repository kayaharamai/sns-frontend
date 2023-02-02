import { ArrowBack } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { FollowerItem } from "../../types/Types";

const Follower = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { state } = useLocation();
  const [followerList, setfollowerList] = useState<FollowerItem[]>([]);

  const clickReturn = () => {
    navigate(`/profile/${params.id}`);
  };

  useEffect(() => {
    setfollowerList(state.state.followers);
  }, []);
console.log(followerList)
  return (
    <div>
      <div>
        <button onClick={clickReturn}>
          <ArrowBack />
        </button>
      </div>
      <div>
        <ul>
          {followerList?.map((followerUser) => {
            return (
              <React.Fragment key={followerUser.userId}>
                <li><Link to={`/profile/${followerUser.followId}`}>{followerUser.userId}</Link></li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Follower;
