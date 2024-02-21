import React, { useState } from 'react'
import LeftComponent from './components/LeftComponent/LeftComponent'
import { useAuth } from '../Auth/store/useAuthStore'
import MobileHeader from './components/MobileHeader/MobileHeader'
import RightComponent from './components/RightComponent/RightComponent'
import CenterComponent from './components/CenterComponent/CenterComponent'
import CategoryNavBar from './components/CategoryNavBar/CategoryNavBar'

import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Header = () => {
  const { user, isAgent, isAdmin } = useAuth()
  const [mobileSearchOn, setMobileSearchOn] = useState(false)
  return (
    <>
      {/* <header id="header">
      <div className={'header-wrapper' }>
        <div className="header-wrapper-subcont flex-container">
          <div
            className={
              mobileSearchOn
                ? 'main-menu col-lg-3 closed'
                : 'main-menu col-lg-3 opened'
            }
          >
            <MobileHeader
              mobileSearchOn={mobileSearchOn}
              setMobileSearchOn={setMobileSearchOn}
            />
            <RightComponent />
          </div>
          <div
            className={
              !mobileSearchOn
                ? 'search-li col-lg-6 hide-mob'
                : 'search-li col-lg-6 show-mob'
            }
          >
            <CenterComponent />
          </div>
          <div className="actions col-lg-3">
            <LeftComponent />
          </div>
        </div>
        <CategoryNavBar />
      </div>
    </header> */}
      <AppBar position="static">
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
      </AppBar>
    </>
  )
}

export default Header
