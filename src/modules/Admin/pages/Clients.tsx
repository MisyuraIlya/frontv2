import React, { useEffect } from 'react'
import ClientsFilter from '../components/Clients/ClientsFilter'
import ClientsList from '../components/Clients/ClientsList'
import { useClientStore } from '../store/ClientsStore'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
import PaginationUtil from '../../../utils/pagination/PaginationUtil'
import { AdminClinetsService } from '../services/clients.service'
import useSWR from 'swr'
import Loader from '../../../shared/Loader'

const Clients = () => {
  const { hydraPagination, setSWR } = useClientStore()
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const page = urlSearchParams.get('page')
  const search = urlSearchParams.get('search')

  const fetchData = async () => {
    return await AdminClinetsService.getClients(page!, search!)
  }

  const { data, isLoading, mutate } = useSWR(
    `api/users?page=${page}`,
    fetchData
  )

  useEffect(() => {
    mutate()
    if (data) {
      setSWR(data)
    }
  }, [data, location.search])

  return (
    <Container maxWidth="lg">
      {isLoading && <Loader />}
      <BreadCrumbsUtil array={[]} />
      <Typography variant="h5">{'לקוחות'}</Typography>
      <ClientsFilter />
      <ClientsList />
      <PaginationUtil hydraPagination={hydraPagination} />
    </Container>
  )
}

export default Clients
