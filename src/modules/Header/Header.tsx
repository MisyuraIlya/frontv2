import React, { useState } from 'react'
import LeftComponent from './components/LeftComponent/LeftComponent'
import { useAuth } from '../Auth/store/useAuthStore'
import RightComponent from './components/RightComponent/RightComponent'
import CenterComponent from './components/CenterComponent/CenterComponent'
import CategoryNavBar from './components/CategoryNavBar/CategoryNavBar'

import { AppBar, Grid, Toolbar } from '@mui/material'

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={4} className="centered">
            <RightComponent />
          </Grid>
          <Grid item xs={5} className="centered">
            <CenterComponent />
          </Grid>
          <Grid item xs={3} className="centered">
            <LeftComponent />
          </Grid>
        </Grid>
      </Toolbar>
      <CategoryNavBar />
    </AppBar>
  )
}

export default Header
