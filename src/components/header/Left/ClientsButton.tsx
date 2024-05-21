import React from 'react'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { IconButton, Tooltip } from '@mui/material'

const ClientsButton = () => {
  return (
    <IconButton
      sx={{
        height: '50px',
        width: '50px',
        border: '1px solid #E0E0E0',
      }}
    >
      <Tooltip title={'לקוחות'}>
        <StorefrontIcon />
      </Tooltip>
    </IconButton>
  )
}

export default ClientsButton
