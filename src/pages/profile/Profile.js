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
