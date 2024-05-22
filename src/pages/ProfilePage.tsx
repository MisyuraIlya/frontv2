import React from 'react'
import MyProfile from '../modules/Auth/components/MyProfile/MyProfile'
import AgentMyProfile from '../modules/Auth/components/AgentMyProfile/AgentMyProfile'
import AgentActions from '../modules/Agent/components/AgentActions'
import { Container } from '@mui/material'
import BreadCrumbsUtil from '../utils/BreadCrumbs/BreadCrumbsUtil'
import Profile from '../components/Profile'
const ProfilePage = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
      {/* <BreadCrumbsUtil
        array={[
          {
            title: 'פרופיל',
            link: '',
          },
        ]}
      />
      <MyProfile />
      <AgentMyProfile />
      <AgentActions colsNumber={3} /> */}
      <Profile.Info />
      <Profile.Money />
      <Profile.Actions />
    </Container>
  )
}

export default ProfilePage
