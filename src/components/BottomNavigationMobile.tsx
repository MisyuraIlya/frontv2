import React, { useState } from 'react'
import {
  BottomNavigation,
  Box,
  Button,
  Drawer,
  ListItemIcon,
  ListItemText,
  MenuItem,
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
import { useAuth } from '../modules/Auth/store/useAuthStore'
import { useCart } from '../modules/Cart/store/cart.store'
import { agentURL, clientURL } from '../enums/url'
import { onAsk } from '../shared/MySweetAlert'
import { useNavigate } from 'react-router-dom'
import NotificationContainer from '../modules/PushNotifications/components/NotificationContainer/NotificationContainer'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { useModals } from '../modules/Modals/provider/ModalProvider'

const BottomNavigationMobile = () => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const { user, agent, logOut, isAgent } = useAuth()
  const { setOpenAuthModal } = useModals()
  const { selectedMode } = useCart()
  const [openDrawver, setOpenDrawver] = useState(false)
  const navigate = useNavigate()

  const beforeLogOut = async () => {
    const ask = await onAsk('האם אתה בטוח?', 'כל המוצרים בסל ימחקו')
    if (ask) {
      logOut()
    }
  }

  const handleClick = (value: IURL) => {
    if (value.LINK) {
      navigate(value.LINK)
    }

    if (value.LABEL === clientURL.NOTIFICATIONS.LABEL) {
      setOpenDrawver(true)
    }
    setOpen(false)
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
          {open && (
            <Paper
              elevation={4}
              sx={{
                position: 'fixed',
                left: '10px',
                bottom: '55px',
                zIndex: 101,
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
                <Typography
                  variant="body1"
                  color={'black'}
                  sx={{ margin: '5px 0' }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="body1"
                  color={'black'}
                  sx={{ margin: '5px 0' }}
                >
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
                <Button
                  variant="outlined"
                  fullWidth={true}
                  sx={{ margin: '15px 0' }}
                  onClick={() => beforeLogOut()}
                >
                  התנתק
                </Button>
                {agent && user?.role === 'ROLE_USER' && (
                  <Button
                    variant="outlined"
                    fullWidth={true}
                    onClick={() => beforeLogOut()}
                  >
                    התנתק מהלקוח
                  </Button>
                )}
              </Paper>
              <Box sx={{ margin: '25px 10px' }}>
                {Object.entries(clientURL).map(([key, value]) => {
                  if (value.SHOW_IN_PROFILE_MENU) {
                    return (
                      <MenuItem
                        onClick={() => handleClick(value)}
                        key={key}
                        className="hoveredProfile"
                        sx={{ marginTop: '10px' }}
                      >
                        <ListItemIcon>{value.ICON}</ListItemIcon>
                        <ListItemText>{value.LABEL}</ListItemText>
                      </MenuItem>
                    )
                  }
                })}
              </Box>
            </Paper>
          )}
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
