import React, { useState } from 'react'
import {
  BottomNavigation,
  Box,
  Drawer,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { themeColors } from '../styles/mui'
import { useAuth } from '../store/auth.store'
import { onAsk } from '../utils/MySweetAlert'
import { useNavigate } from 'react-router-dom'
import NotificationContainer from './NotificationContainer'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { useModals } from '../provider/ModalProvider'

const BottomNavigationMobile = () => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const { user, logOut, isAgent } = useAuth()
  const { setOpenAuthModal } = useModals()
  const [openDrawver, setOpenDrawver] = useState(false)
  const navigate = useNavigate()

  const beforeLogOut = async () => {
    const ask = await onAsk('האם אתה בטוח?', 'כל המוצרים בסל ימחקו')
    if (ask) {
      logOut()
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    if (newValue == '2') {
      if (user) {
        setOpen(!open)
      } else {
        setOpenAuthModal(true)
      }
    }

    if (newValue == '1') {
      beforeLogOut()
    }
    if (newValue == '3') {
      navigate('/cart')
    }

    if (newValue == '4') {
      setOpenDrawver(true)
    }

    if (newValue == '5') {
      navigate(`/agentClients/${user?.id}?page=1`)
    }
  }

  const isMobile = useMediaQuery('(max-width:800px)')

  return (
    <>
      {isMobile && (
        <>
          <Paper
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 100,
            }}
            elevation={10}
          >
            <BottomNavigation value={value} onChange={handleChange}>
              {user && (
                <BottomNavigationAction
                  label="יציאה"
                  value="1"
                  icon={<ExitToAppIcon />}
                />
              )}
              <BottomNavigationAction
                label="פרופיל"
                value="2"
                icon={<PermIdentityIcon />}
              />

              {isAgent && (
                <BottomNavigationAction
                  label="לקוחות"
                  value="5"
                  icon={<StorefrontIcon />}
                />
              )}
              {user && (
                <BottomNavigationAction
                  label="עגלה"
                  value="3"
                  icon={<ShoppingCartIcon />}
                />
              )}
              {user && (
                <BottomNavigationAction
                  label="הודעות"
                  value="4"
                  icon={<NotificationsActiveIcon />}
                />
              )}
            </BottomNavigation>
            {/* {agent && agent.id !== user?.id && (
              <Box
                className="centered"
                sx={{
                  background: themeColors.primary,
                  color: 'white',
                  padding: '5px 0',
                }}
              >
                <Typography variant="body1">
                  {user?.extId} - {user?.name}
                </Typography>
              </Box>
            )} */}
          </Paper>
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
      )}
    </>
  )
}

export default BottomNavigationMobile
