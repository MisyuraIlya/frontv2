import React from 'react'
import { Box } from '@mui/material'
import useDataAgentClients from '../../hooks/useDataAgentClients'

const AgentClientsList = () => {
  const { data } = useDataAgentClients()
  return <Box></Box>
}

export default AgentClientsList
