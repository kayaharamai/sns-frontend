import React from 'react'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/Sidebar'
import ProfileContent from '../../components/ProfileContent'

const Profile = () => {
  return (
    <div class="flex w-full h-screen">
        <Sidebar />
        <ProfileContent />
        <Rightbar />
    </div>
  )
}

export default Profile





// import React, { useEffect,useState } from 'react'
// import { useParams } from 'react-router-dom';
// import axios from "axios";

// const UserProfile = () => {

//     const params = useParams();
//     console.log(params.id);

//     const [userData, setUserData] = useState([]);

//     useEffect(() => {
//         const user = async () => {
//             const response = await axios.get(`/profile/${params.id}`);
//             setUserData(response.data)
//         }
//         user();
//     },[])

//     console.log(userData)

//   return (
//     <div>UserProfile{userData.username}</div>
//   )
// }

// export default UserProfile
