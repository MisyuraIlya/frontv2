import React from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useModals } from '../../../Modals/provider/ModalProvider'
import { Link } from 'react-router-dom'
import AgentMenu from './components/AgentMenu'
import { Badge, Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
const RightComponent = () => {
  const { user, isAgent, isAdmin } = useAuth()
  const {
    openSideBar,
    setOpenSideBar,
    adminRightSideBar,
    setAdminRightSideBar,
  } = useModals()
  return (
    <>
      {/* <nav
      className={
        openSideBar
          ? 'header-right-cont-main-bigRes opened'
          : 'header-right-cont-main-bigRes closed'
      }
    >
      {isAdmin && (
        <div
          onClick={() => setAdminRightSideBar(!adminRightSideBar)}
          className="menu-new"
        >
          <span
            className="material-symbols-outlined googleIconHover"
            style={{ fontSize: '30px' }}
          >
            widgets
          </span>
        </div>
      )}
      <div className="header-right-cont">
        <nav className={false ? 'site-nav active' : 'site-nav'}>
          <div className="flex-container">
            <div className="reg-menu">
              <ul>
                <li>
                  <div className="img" style={{ cursor: 'pointer' }}>
                    <Link to={'/'}>
                      <img src={`${process.env.REACT_APP_MEDIA}/logo.png`} alt="" />
                    </Link>
                  </div>
                </li>
                {isAgent && (
                  <li className="about-li-hover ">
                    <AgentMenu />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </nav> */}
      <Box sx={{ display: 'flex', gap: '20px' }} className="centered">
        <Link to={'/'}>
          <img
            src={`${process.env.REACT_APP_MEDIA}/logo.png`}
            alt=""
            style={{ width: '80%' }}
          />
        </Link>
        <IconButton
          sx={{ height: '50px', width: '50px', backgroundColor: '#f3f5f9' }}
        >
          <Badge badgeContent={4} color="secondary">
            <MenuIcon sx={{ height: '30px', width: '30px' }} />
          </Badge>
        </IconButton>
      </Box>
    </>
  )
}

export default RightComponent
