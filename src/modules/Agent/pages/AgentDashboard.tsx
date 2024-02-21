import React, { ReactNode, FC, useEffect } from 'react'
import AgentLayout from '../layout/AgentLayout'
import { useAuth } from '../../Auth/store/useAuthStore'
import AgentsList from '../components/AgentList'
import AgentPerformanceInfo from '../components/AgentPerformanceInfo'
import VisitsDashboard from '../components/VisitsDashboard'
import NearestObjectives from '../components/NearestObjectives'
import TargetsDashboard from '../components/TargetsDashboard'
import { useMobile } from '../../Mobile/store/mobile.store'
import AgentContainer from '../layout/AgentContainer'
import { useAgentProfileStore } from '../store/agentProfile.store'
import { useParams } from 'react-router-dom'

const AgentDashboard = () => {
  const { isMobile } = useMobile()
  const { fetchTaskToday } = useAgentProfileStore()
  const { id } = useParams()
  useEffect(() => {
    fetchTaskToday()
  }, [id])
  return (
    <div
      className={
        !isMobile
          ? 'page-container myMarginTop'
          : 'page-container myMarginTop openAgentListMob'
      }
    >
      <AgentContainer>
        <AgentLayout>
          <AgentPerformanceInfo />
          <VisitsDashboard />
          <NearestObjectives />
          <TargetsDashboard />
        </AgentLayout>
      </AgentContainer>
    </div>
  )
}

export default AgentDashboard
