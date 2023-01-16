import React from 'react'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/Sidebar'
import LikeContent from '../../components/LikeContent'

const Like = () => {
  return (
    <div class="flex w-full h-screen">
        <Sidebar />
        <LikeContent />
        <Rightbar />
    </div>
  )
}

export default Like
