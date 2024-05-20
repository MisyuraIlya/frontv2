import React from 'react'
import { AppBar, Grid, Toolbar } from '@mui/material'
import Center from './Center'
import CategoryNavBar from './CategoryNavBar'
import Right from './Right'
import Left from './Left'
import { useAuth } from '../../modules/Auth/store/useAuthStore'

const AppBarComponent = () => {
  const { isAdmin, isAgent } = useAuth()
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {isAdmin && <Right.AdminDrawver />}
            {isAgent && <Right.AgentMenu />}
            <Right.Logo />
          </Grid>
          <Grid item xs={3}>
            <Center />
          </Grid>
          <Grid item xs={3}>
            <Left.ProfileButton />
            {isAgent && <Left.ClientsButton />}
            <Left.CartButton />
            <Left.NotificationButton />
          </Grid>
        </Grid>
      </Toolbar>
      <CategoryNavBar />
    </AppBar>
  )
}

export default AppBarComponent
