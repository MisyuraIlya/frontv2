import React, { useState } from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useModals } from '../../../Modals/provider/ModalProvider'
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
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { clientURL } from '../../../../enums/url'
import NotificationContainer from '../../../PushNotifications/components/NotificationContainer/NotificationContainer'
import { themeColors } from '../../../../styles/mui'
import { onAsk } from '../../../../shared/MySweetAlert'
import useDataNotificationUser from '../../../PushNotifications/hooks/useDataNotificationUser'
import ProfileMenu from './components/ProfileMenu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import NotificationsIcon from '@mui/icons-material/Notifications'
import StorefrontIcon from '@mui/icons-material/Storefront'

const LeftComponent = () => {
  const { user, isAgent, agent, setAction, logOut, setUser } = useAuth()
  const { cart, selectedMode } = useCart()
  const { data: notificationData } = useDataNotificationUser()
  const [openProfile, setOpenProfile] = useState<boolean>(false)
  const { setOpenAuthModal } = useModals()
  const navigate = useNavigate()

  const [openDrawver, setOpenDrawver] = useState(false)

  const handleClick = () => {
    if (!user) {
      setOpenAuthModal(true)
      setAction('login')
    } else {
      navigate('/profile')
    }
  }

  return (
    <>
      <Box
        sx={{ display: 'flex', gap: '10px', position: 'relative' }}
        onMouseLeave={() => setOpenProfile(false)}
      >
        <IconButton
          sx={{
            height: '50px',
            border: '1px solid #E0E0E0',
            borderRadius: '100px',
            padding: '0 12px',
            gap: '6px',
          }}
          onClick={() => handleClick()}
          onMouseEnter={() => setOpenProfile(true)}
        >
          <PersonIcon />
          <Typography
            sx={{ fontSize: '14px', fontWeight: 600, lineHeight: '18px' }}
          >
            ה.מחיר
          </Typography>
        </IconButton>

        <IconButton
          sx={{
            height: '50px',
            width: '50px',
            border: '1px solid #E0E0E0',
          }}
          onClick={() => {
            setOpenAuthModal(true)
            setAction('login')
          }}
        >
          <Tooltip title={clientURL.PROFILE.LABEL}>
            <StorefrontIcon />
          </Tooltip>
        </IconButton>

        <Badge badgeContent={cart.length ?? 0}>
          <IconButton
            sx={{
              height: '50px',
              width: '50px',
              border: '1px solid #E0E0E0',
            }}
            onClick={() => {
              setOpenAuthModal(true)
              setAction('login')
            }}
          >
            <Tooltip title={clientURL.PROFILE.LABEL}>
              <ShoppingCartIcon />
            </Tooltip>
          </IconButton>
        </Badge>

        <Badge badgeContent={cart.length ?? 0}>
          <IconButton
            sx={{
              height: '50px',
              width: '50px',
              border: '1px solid #E0E0E0',
            }}
            onClick={() => {
              setOpenAuthModal(true)
              setAction('login')
            }}
          >
            <Tooltip title={clientURL.PROFILE.LABEL}>
              <NotificationsIcon />
            </Tooltip>
          </IconButton>
        </Badge>

        {openProfile && (
          <Paper
            elevation={4}
            sx={{
              position: 'absolute',
              width: '300px',
              left: '-70px',
              top: '50px',
              zIndex: 10,
            }}
          >
            <ProfileMenu />
          </Paper>
        )}
      </Box>

      <Drawer
        anchor="right"
        open={openDrawver}
        onClose={() => setOpenDrawver(false)}
      >
        <Box sx={{ minWidth: '350px' }} className="centered">
          <Box sx={{ width: '90%' }}>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: themeColors.primary,
                marginTop: '20px',
              }}
            >
              הודעות
            </Typography>
            <NotificationContainer />
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default LeftComponent
