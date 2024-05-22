import React from 'react'
import { AppBar, Grid, Toolbar } from '@mui/material'
import Center from './Center'
import CategoryNavBar from './CategoryNavBar'
import Right from './Right'
import Left from './Left'
import { useAuth } from '../../store/useAuthStore'

const AppBarComponent = () => {
  const { isAdmin, isAgent } = useAuth()
  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          height: '80px',
          alignContent: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={2} maxWidth={'xl'}>
          <Grid
            item
            xs={3}
            sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}
          >
            {isAdmin && <Right.AdminDrawver />}
            <Right.Logo />
            {isAgent && <Right.AgentMenu />}
          </Grid>
          <Grid item xs={6}>
            <Center />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'end',
            }}
          >
            <Left.ProfileButton />
            {isAgent || (isAdmin && <Left.ClientsButton />)}
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
