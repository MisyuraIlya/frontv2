import React, { useEffect } from 'react'
import AgentsFilter from '../components/AgentsPage/AgentsFilter'
import AgentsList from '../components/AgentsPage/AgentsList'
import { useAgentProfileStore } from '../../Agent/store/agentProfile.store'

const AgentsPage = () => {
  const { fetchAgentsList } = useAgentProfileStore()
  useEffect(() => {
    fetchAgentsList()
  }, [])
  return (
    <div className="page-container history admin-history docs">
      <div className="docs-sub-cont">
        <AgentsFilter />
        <AgentsList />
      </div>
    </div>
  )
}

export default AgentsPage
