import React from 'react'
import MyProfile from '../components/MyProfile/MyProfile'
import AgentMyProfile from '../components/AgentMyProfile/AgentMyProfile'
import { useAuth } from '../store/useAuthStore'
import ClientFinance from '../components/ClientFinance/ClientFinance'
import AgentActions from '../../Agent/components/AgentActions'
import AtarimProfile from '../components/AtarimProfile/AtarimProfile'
import UserDocuments from '../components/UserDocuments/UserDocuments'
const ProfilePage = () => {
  const { isAgent } = useAuth()
  return (
    <div className="page-container Profile-page">
      <div className="Profile-page-subcont">
        <MyProfile />
        {/* {isAgent &&  */}
        <AgentMyProfile />
        {/* } */}
        <AgentActions colsNumber={3} />
        <AtarimProfile />
        <UserDocuments />

        <ClientFinance />
      </div>
    </div>
  )
}

export default ProfilePage
