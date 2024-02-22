import React, { useState } from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useModals } from '../../../Modals/provider/ModalProvider'
import ProfileMenu from './components/ProfileMenu'
import { useCart } from '../../../Cart/store/cart.store'
import { Link, useNavigate } from 'react-router-dom'
import {
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'

import { clientURL } from '../../../../enums/url'
import NotificationContainer from '../../../PushNotifications/components/NotificationContainer/NotificationContainer'
import { themeColors } from '../../../../styles/mui'
const LeftComponent = () => {
  const { user, isAgent, setAction } = useAuth()
  const { cart, selectedMode } = useCart()
  const [openProfile, setOpenProfile] = useState<boolean>(false)
  const { setOpenAuthModal, leftSideBar, setLeftSideBar } = useModals()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [openDrawver, setOpenDrawver] = useState(false)

  const handleClose = (value: IURL) => {
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
        {user ? (
          Object.entries(clientURL).map(([key, value]) => {
            console.log(
              'value.FOR_AGENT && isAgent',
              value.LABEL,
              value.FOR_AGENT
            )
            if (value.SHOW_IN_HEADER) {
              if (value.FOR_AGENT && !isAgent) return
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
          })
        ) : (
          <IconButton
            sx={{
              height: '50px',
              width: '50px',
              backgroundColor: '#f3f5f9',
            }}
            onClick={() => {
              setOpenAuthModal(true)
              setAction('login')
            }}
          >
            <Tooltip title={clientURL.PROFILE.LABEL}>
              {clientURL.PROFILE.ICON}
            </Tooltip>
          </IconButton>
        )}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          marginTop: '50px',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Paper
          elevation={4}
          sx={{ margin: '5px 10px', padding: '10px', width: '180px' }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              background: themeColors.primary,
              padding: '4px',
            }}
          >
            לקוח
          </Typography>
          <Typography variant="body1" color={'black'} sx={{ margin: '5px 0' }}>
            {user?.name}
          </Typography>
          <Typography variant="body1" color={'black'} sx={{ margin: '5px 0' }}>
            {user?.extId}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              background: themeColors.secondary,
              padding: '4px',
            }}
          >
            {selectedMode == 'order' && 'הזמנה'}
            {selectedMode == 'quote' && 'ה.מחיר'}
            {selectedMode == 'return' && 'החזרה'}
          </Typography>
          <Button variant="outlined" fullWidth={true} sx={{ margin: '15px 0' }}>
            התנתק
          </Button>
        </Paper>
        <Box sx={{ marginTop: '25px' }}>
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
        </Box>
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
