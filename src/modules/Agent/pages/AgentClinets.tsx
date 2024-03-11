import React from 'react'
import Loader from '../../../shared/Loader'
import { Container } from '@mui/material'
import useDataAgentClients from '../hooks/useDataAgentClients'
import PaginationUtil from '../../../utils/pagination/PaginationUtil'
import FilterHead from '../components/FilterHead'
import AgentClientsList from '../components/agentClients/AgentClientsList'

const AgentClinets = () => {
  const { hydraPagination, isLoading } = useDataAgentClients()

  return (
    <Container maxWidth="lg">
      {isLoading && <Loader />}
      {/* <FilterHead /> */}
      <AgentClientsList />
      {hydraPagination && <PaginationUtil hydraPagination={hydraPagination} />}
    </Container>
  )
}

export default AgentClinets
