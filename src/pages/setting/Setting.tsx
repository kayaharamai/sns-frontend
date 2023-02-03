import React from 'react'
import SettingItem from '../../components/setting/SettingItem'
import Sidebar from '../../components/Sidebar'

const Setting: React.FC = () => {
  return (
    <div className="flex w-full h-screen">
        <Sidebar />
        <SettingItem />
    </div>
  )
}

export default Setting
