import { ArrowBack } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FollowItem } from "../../types/Types";

const Follow = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { state } = useLocation();
  const [followList, setfollowList] = useState<FollowItem[]>([]);

  useEffect(() => {
    setfollowList(state.state.followings);
  }, []);

  const clickReturn = () => {
    navigate(`/profile/${params.id}`);
  };

  console.log(followList)

  return (
    <div>
      <div>
        <button onClick={clickReturn}>
          <ArrowBack />
        </button>
      </div>
      <div>
        <ul>
          {followList?.map((followUser) => {
            return (
              <React.Fragment key={followUser.userId}>
                <li><Link to={`/profile/${followUser.followerId}`}>{followUser.userId}</Link></li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Follow;
