import React, { useState } from 'react'
import {
  Box,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { URLS } from '../../../enums/urls'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/useAuthStore'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import { useModals } from '../../../provider/ModalProvider'
import { useCart } from '../../../store/cart.store'
import { onAsk } from '../../../shared/MySweetAlert'

const clientURL = {
  PROFILE: {
    LINK: URLS.PROFILE.LINK,
    LABEL: URLS.PROFILE.LABEL,
    ICON: <PersonIcon />,
  },
  DOCUMENTS: {
    LINK: URLS.DOCUMENTS.LINK,
    LABEL: URLS.DOCUMENTS.LABEL,
    ICON: <PersonIcon />,
  },
}

const ProfileButton = () => {
  const { client, user, logOut } = useAuth()
  const { setOpenAuthModal } = useModals()
  const { modes, selectedMode, setSelectedMode } = useCart()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const open = Boolean(anchorEl)

  const handleLogOut = async () => {
    setAnchorEl(null)
    const ask = await onAsk('בטוח תרצה לצאת?', '')
    if (ask) {
      logOut()
    }
  }

  return (
    <Box>
      <IconButton
        onClick={(event) => {
          user ? setAnchorEl(event.currentTarget) : setOpenAuthModal(true)
        }}
        sx={{
          height: '50px',
          border: '1px solid #E0E0E0',
          borderRadius: '100px',
          padding: '0 12px',
          gap: '6px',
        }}
      >
        <PersonIcon />
        <Typography
          sx={{ fontSize: '14px', fontWeight: 600, lineHeight: '18px' }}
        >
          ה.מחיר
        </Typography>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ borderRadius: '8px' }}
      >
        <Box sx={{ padding: '4px 12px', width: '312px' }}>
          <Box sx={{ display: 'flex' }}>
            <Box>
              <Typography variant="h5">{user?.name}</Typography>
              <Typography variant="caption">{user?.extId}</Typography>
            </Box>
            {client && <Chip label="לקוח" variant="outlined" color="info" />}
          </Box>

          <Select
            fullWidth
            value={selectedMode}
            sx={{ marginTop: '12px' }}
            onChange={(e) => setSelectedMode(e.target.value as IDocumentType)}
          >
            {modes?.map((item, index) => (
              <MenuItem value={item.value} key={index}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
          {client && (
            <MenuItem sx={{ marginTop: '8px' }}>
              <ListItemIcon>
                <TransferWithinAStationIcon color="error" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6" color={'error'}>
                  {'התנתק מהלקוח'}
                </Typography>
              </ListItemText>
            </MenuItem>
          )}
          <Box sx={{ padding: '16px 0' }}>
            <Divider />
          </Box>
          {Object.entries(clientURL).map(([key, value]) => (
            <MenuItem key={key} onClick={() => navigate(value.LINK)}>
              <ListItemIcon>{value.ICON}</ListItemIcon>
              <ListItemText>
                <Typography variant="h6">{value.LABEL}</Typography>
              </ListItemText>
            </MenuItem>
          ))}
          <Box sx={{ padding: '16px 0' }}>
            <Divider />
          </Box>
          <MenuItem onClick={() => handleLogOut()}>
            <ListItemIcon>
              <ExitToAppIcon color="error" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6" color={'error'}>
                {'התנתק'}
              </Typography>
            </ListItemText>
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  )
}

export default ProfileButton
