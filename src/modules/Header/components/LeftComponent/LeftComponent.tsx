import React, { useState } from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useModals } from '../../../Modals/provider/ModalProvider'
import ProfileMenu from './components/ProfileMenu'
import { useCart } from '../../../Cart/store/cart.store'
import { Link, useNavigate } from 'react-router-dom'
import {
  Badge,
  Box,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'

import { clientURL } from '../../../../enums/url'
import NotificationContainer from '../../../PushNotifications/components/NotificationContainer/NotificationContainer'
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [openDrawver, setOpenDrawver] = useState(false)

  const handleClose = (value: IURL) => {
    if (!user && value.LABEL === clientURL.PROFILE.LABEL) {
      setOpenAuthModal(true)
    }
    if (typeof value.LINK === 'string') navigate(value.LINK)
    setAnchorEl(null)
  }

  const handleOnMouseOver = (
    value: IURL,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (value.LABEL === clientURL.PROFILE.LABEL) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClick = (value: IURL) => {
    if (value.LINK) {
      navigate(value.LINK)
    }

    if (value.LABEL === clientURL.NOTIFICATIONS.LABEL) {
      setOpenDrawver(true)
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        {Object.entries(clientURL).map(([key, value]) => {
          if (value.SHOW_IN_HEADER) {
            return (
              <IconButton
                key={key}
                sx={{
                  height: '50px',
                  width: '50px',
                  backgroundColor: '#f3f5f9',
                }}
                onClick={() => handleClick(value)}
                onMouseEnter={(e) => handleOnMouseOver(value, e)}
              >
                {value.WITH_BADGE ? (
                  <Tooltip title={value.LABEL}>
                    <Badge badgeContent={4} color="secondary">
                      {value.ICON}
                    </Badge>
                  </Tooltip>
                ) : (
                  <Tooltip title={value.LABEL}>{value.ICON}</Tooltip>
                )}
              </IconButton>
            )
          }
        })}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {Object.entries(clientURL).map(([key, value]) => {
          if (value.SHOW_IN_PROFILE_MENU) {
            return (
              <MenuItem onClick={() => handleClose(value)} key={key}>
                <ListItemIcon>{value.ICON}</ListItemIcon>
                <ListItemText>{value.LABEL}</ListItemText>
              </MenuItem>
            )
          }
        })}
      </Menu>
      <Drawer
        anchor="right"
        open={openDrawver}
        onClose={() => setOpenDrawver(false)}
      >
        <Box sx={{ minWidth: '310px' }} className="centered">
          <Box>
            <Typography variant="h6">הודעות</Typography>
            <NotificationContainer />
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default LeftComponent
