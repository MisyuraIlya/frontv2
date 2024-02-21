import React, { FC, ReactNode, MouseEvent, useEffect } from 'react'
import AgentsList from '../components/AgentList'
import { useAuth } from '../../Auth/store/useAuthStore'
import { useAgentProfileStore } from '../store/agentProfile.store'

interface ContainerProps {
  children: ReactNode
}

const AgentContainer: FC<ContainerProps> = ({ children }) => {
  const { isSuperAgent, isAdmin } = useAuth()
  const { fetchAgentsList, agentsList } = useAgentProfileStore()
  useEffect(() => {
    if (agentsList.length == 0) {
      fetchAgentsList()
    }
  }, [])
  return (
    <div className={'container agent-container flex-container break-display'}>
      {(isSuperAgent || isAdmin) && <AgentsList />}
      {children}
    </div>
  )
}

export default AgentContainer
