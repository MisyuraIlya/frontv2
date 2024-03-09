import React from 'react'
import ClientsFilter from '../components/Clients/ClientsFilter'
import ClientsList from '../components/Clients/ClientsList'
import { Container, Typography } from '@mui/material'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
import PaginationUtil from '../../../utils/pagination/PaginationUtil'
import Loader from '../../../shared/Loader'
import useDataClients from '../hooks/useDataClients'

const Clients = () => {
  const { hydraPagination, isLoading } = useDataClients()
  return (
    <Container maxWidth="lg">
      {isLoading && <Loader />}
      <BreadCrumbsUtil
        array={[
          {
            title: 'לקוחות',
            link: '/admin/clients?page=1',
          },
        ]}
      />
      <Typography variant="h5">{'לקוחות'}</Typography>
      <ClientsFilter />
      <ClientsList />
      {hydraPagination && <PaginationUtil hydraPagination={hydraPagination} />}
    </Container>
  )
}

export default Clients
