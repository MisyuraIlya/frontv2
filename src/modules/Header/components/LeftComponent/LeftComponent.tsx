import React, { useState } from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useModals } from '../../../Modals/provider/ModalProvider'
import ProfileMenu from './components/ProfileMenu'
import { useCart } from '../../../Cart/store/cart.store'
import { Link, useNavigate } from 'react-router-dom'
import { Badge, Box, IconButton } from '@mui/material'

import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CampaignIcon from '@mui/icons-material/Campaign'
import StorefrontIcon from '@mui/icons-material/Storefront'
const LeftComponent = () => {
  const { user, isAgent, setAction } = useAuth()
  const { cart } = useCart()
  const [openProfile, setOpenProfile] = useState<boolean>(false)
  const { setOpenAuthModal, leftSideBar, setLeftSideBar } = useModals()
  const navigate = useNavigate()
  const handleProfileClick = (e: any) => {
    e.stopPropagation()
    // setOpenProfile(!openProfile);
    setAction('login')
  }

  return (
    <>
      {/* <ul className={!user ? 'prelogIn' : 'afterLog'}>
        <li
          id="my-profile-cont"
          className={
            !openProfile ? 'my-profile-cont close' : 'my-profile-cont open'
          }
          onMouseEnter={() => setOpenProfile(true)}
          onMouseLeave={() => setOpenProfile(false)}
          onClick={handleProfileClick}
        >
          {user ? (
            <>
              {window.innerWidth > 1150 ? (
                <div className="img icon" onClick={() => navigate('/profile')}>
                  <span className="material-symbols-outlined">person</span>
                  {isAgent ? <p className="agent-title">סוכן</p> : null}
                </div>
              ) : (
                <div className="img icon" onClick={() => navigate('/profile')}>
                  <span className="material-symbols-outlined">person</span>
                  {isAgent ? <p className="agent-title">סוכן</p> : null}
                </div>
              )}
            </>
          ) : (
            <div className="img icon" onClick={() => setOpenAuthModal(true)}>
              <span className="material-symbols-outlined">person</span>
            </div>
          )}
          {user && <ProfileMenu setOpenProfile={setOpenProfile} />}
        </li>

        {isAgent ? (
          <li className={'left'}>
            <Link to={'/agentClients'}>
              <span className="material-symbols-outlined">StoreFront</span>
            </Link>
          </li>
        ) : null}
        {user && (
          <li>
            <Link to={'/cart'}>
              <button className="icon">
                {cart.length > 0 && (
                  <div className="cart-counter">{cart.length}</div>
                )}
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </Link>
          </li>
        )}

        {leftSideBar && (
          <div
            onClick={() => setLeftSideBar(false)}
            className="fake-notification"
          ></div>
        )}

        {user && (
          <li className={'left'}>
            <button className="icon" onClick={() => setLeftSideBar(true)}>
              <span className="material-symbols-outlined">campaign</span>
            </button>
          </li>
        )}
      </ul> */}
      {/* <IdentifyCont/> */}
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <IconButton
          sx={{ height: '50px', width: '50px', backgroundColor: '#f3f5f9' }}
        >
          <PersonIcon sx={{ height: '30px', width: '30px' }} />
        </IconButton>
        <IconButton
          sx={{ height: '50px', width: '50px', backgroundColor: '#f3f5f9' }}
        >
          <StorefrontIcon sx={{ height: '30px', width: '30px' }} />
        </IconButton>
        <IconButton
          sx={{ height: '50px', width: '50px', backgroundColor: '#f3f5f9' }}
        >
          <Badge badgeContent={4} color="secondary">
            <ShoppingCartIcon sx={{ height: '30px', width: '30px' }} />
          </Badge>
        </IconButton>
        <IconButton
          sx={{ height: '50px', width: '50px', backgroundColor: '#f3f5f9' }}
        >
          <Badge badgeContent={4} color="secondary">
            <CampaignIcon sx={{ height: '30px', width: '30px' }} />
          </Badge>
        </IconButton>
      </Box>
    </>
  )
}

export default LeftComponent
