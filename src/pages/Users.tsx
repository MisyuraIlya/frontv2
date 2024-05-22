import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import BreadCrumbsUtil from '../utils/BreadCrumbs/BreadCrumbsUtil'
import PaginationUtil from '../utils/pagination/PaginationUtil'
import Loader from '../shared/Loader'
import useDataClients from '../hooks/useAdminDataUsers'
import { useParams } from 'react-router-dom'
import UserList from '../modules/Admin/components/Clients/UserList'
import UserFilter from '../modules/Admin/components/Clients/UserFilter'

type RouteParams = {
  userRole: ROLE_TYPES
}
const Users = () => {
  const { hydraPagination, isLoading } = useDataClients()
  const { userRole } = useParams<RouteParams>()

  let componentToRender: React.ReactNode

  switch (userRole) {
    case 'ROLE_USER':
    case 'ROLE_AGENT':
    case 'ROLE_SUPER_AGENT':
      componentToRender = <UserList />
      break
    default:
      componentToRender = <Box>{'לא נמצא סוג לקוח כזה'}</Box>
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
      {isLoading && <Loader />}
      <BreadCrumbsUtil
        array={[
          {
            title: userRole == 'ROLE_AGENT' ? 'סוכנים' : 'לקוחות',
            link: '',
          },
        ]}
      />

      <UserFilter />
      {componentToRender}
      {hydraPagination && <PaginationUtil hydraPagination={hydraPagination} />}
    </Container>
  )
}

export default Users
