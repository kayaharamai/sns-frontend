import React from 'react'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/Sidebar'
import ProfileContent from '../../components/profile/ProfileContent'

const Profile: React.FC = () => {
  return (
    <div className="flex w-full h-screen">
        <Sidebar />
        <ProfileContent />
        <Rightbar />
    </div>
  )
}

export default Profile
