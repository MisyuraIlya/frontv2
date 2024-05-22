import React from 'react'
import Loader from '../shared/Loader'
import { Container } from '@mui/material'
import useDataAgentClients from '../hooks/useDataAgentClients'
import PaginationUtil from '../utils/pagination/PaginationUtil'
import AgentClientsList from '../modules/Agent/components/agentClients/AgentClientsList'
import BreadCrumbsUtil from '../utils/BreadCrumbs/BreadCrumbsUtil'
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
