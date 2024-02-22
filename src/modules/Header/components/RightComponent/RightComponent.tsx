import React, { useState } from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useModals } from '../../../Modals/provider/ModalProvider'
import { Link, useNavigate } from 'react-router-dom'
import AgentMenu from './components/AgentMenu'
import {
  Badge,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { ContentCut } from '@mui/icons-material'

import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import WifiOffOutlinedIcon from '@mui/icons-material/WifiOffOutlined'
import { agentURL } from '../../../../enums/url'
const RightComponent = () => {
  const { user, isAgent, isAdmin } = useAuth()
  const {
    openSideBar,
    setOpenSideBar,
    adminRightSideBar,
    setAdminRightSideBar,
  } = useModals()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (LINK: string) => {
    if (typeof LINK === 'string') navigate(LINK)
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: 'flex', gap: '20px' }} className="centered">
      <Link to={'/'}>
        <img
          src={`${process.env.REACT_APP_MEDIA}/logo.png`}
          alt=""
          style={{ width: '80%' }}
        />
      </Link>
      {isAgent && (
        <IconButton
          onClick={handleClick}
          sx={{ height: '50px', width: '50px', backgroundColor: '#f3f5f9' }}
        >
          <MenuIcon sx={{ height: '30px', width: '30px' }} />
        </IconButton>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {Object.entries(agentURL).map(([key, value]) => (
          <MenuItem onClick={() => handleClose(value.LINK)} key={key}>
            <ListItemIcon>{value.ICON}</ListItemIcon>
            <ListItemText>{value.LABEL}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default RightComponent
