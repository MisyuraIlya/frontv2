import { TableCell, TableHead, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

type RouteParams = {
  userRole: ROLE_TYPES
}

const HeadUser = () => {
  const { userRole } = useParams<RouteParams>()
  const isUser = userRole === 'ROLE_USER'
  const isAgent = userRole === 'ROLE_AGENT'
  return (
    <TableHead>
      <TableCell></TableCell>
      <TableCell>
        <Typography variant="subtitle2">מס'</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{isUser ? 'לקוח' : 'סוכן'}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">סטאטוס</Typography>
      </TableCell>
      <TableCell></TableCell>
      {isAgent && (
        <TableCell>
          <Typography variant="subtitle2">מאסטר</Typography>
        </TableCell>
      )}
    </TableHead>
  )
}

export default HeadUser
