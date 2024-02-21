import React, { useEffect } from 'react'
import AgentLayout from '../layout/AgentLayout'
import MyCard from '../../../shared/MyCard'
import YearSelectorBanner from '../components/YearSelectorBanner'
import TargetList from '../components/TargetList'
import AgentContainer from '../layout/AgentContainer'
import { useAgentProfileStore } from '../store/agentProfile.store'
import { useAuth } from '../../Auth/store/useAuthStore'
import { useParams } from 'react-router-dom'

const Target = () => {
  const { getTargets } = useAgentProfileStore()
  const { user } = useAuth()
  const { id } = useParams()
  useEffect(() => {
    if (user?.id) {
      getTargets()
    }
  }, [id])
  return (
    <div className="page-container myMarginTop targetPageCls myMarginBottom agentTargetPage">
      <AgentContainer>
        <AgentLayout>
          <div className="myMarginTop">
            <MyCard>
              <YearSelectorBanner isDashborad={false} />
            </MyCard>
          </div>
          <div className="myMarginTop">
            <MyCard>
              <div className="TargetListCont">
                <TargetList />
              </div>
            </MyCard>
          </div>
        </AgentLayout>
      </AgentContainer>
    </div>
  )
}

export default Target
