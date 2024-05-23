import React from 'react'
import Loader from '../shared/Loader'
import { Container } from '@mui/material'
import useDataAgentClients from '../hooks/useAgentDataClients'
import PaginationUtil from '../utils/PaginationUtil'
import AgentClientsList from '../modules/Agent/components/agentClients/AgentClientsList'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import AgentClientsFilter from '../modules/Agent/components/agentClients/AgentClientsFilter'
import Agent from '../components/Agent'
const AgentClinets = () => {
  const { hydraPagination, isLoading } = useDataAgentClients()

  return (
    <Container maxWidth="lg">
      <BreadCrumbsUtil
        array={[
          {
            title: 'לקוחות שלי',
            link: '',
          },
        ]}
      />
      {/* {isLoading && <Loader />}
      <AgentClientsFilter />
      <AgentClientsList />
      {hydraPagination && <PaginationUtil hydraPagination={hydraPagination} />} */}
      <Agent.Clients.Filter />
      <Agent.Clients.List />
      <Agent.Clients.Pagination />
    </Container>
  )
}

export default AgentClinets
