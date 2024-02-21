import React from 'react'
import MyCard from '../../../shared/MyCard'
import Loader from '../../../shared/Loader'
import { useAgentProfileStore } from '../store/agentProfile.store'
import Wrap from '../../../shared/Wrap'
import { useAuth } from '../../Auth/store/useAuthStore'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useModals } from '../../Modals/provider/ModalProvider'
const TargetList = () => {
  const { loading, targets } = useAgentProfileStore()
  const { isSuperAgent, isAdmin } = useAuth()
  const { setTargetModalItem } = useModals()

  const completedType = (item: IAgentTaget) => {
    let answer = ''
    let bg = 'primaryWrap'
    if (!item.targetValue || !item.currentValue) {
      bg = 'primaryWrap'
      answer = 'ממתין'
    } else {
      if (item.currentValue > item.targetValue) {
        bg = 'successWrap'
        answer = 'הגיע ליעד'
      } else {
        bg = 'errorWrap'
        answer = 'לא הגיע'
      }
    }
    return <Wrap bg={bg}>{answer}</Wrap>
  }

  return (
    <div className="TargetList">
      <div className="head myDesktop">
        <div className="flex-container">
          <div className="col-lg-2 col-1">
            <p>תאריך</p>
          </div>
          <div className="col-lg-2 col-2">
            <p>מחזור</p>
          </div>
          <div className="col-lg-2 col-3">
            <p>יעד</p>
          </div>
          <div className="col-lg-2 col-4">
            <p>מחזור</p>
          </div>
          <div className="col-lg-2 myCenterAlign col-5">
            <p>סטאטוס</p>
          </div>
          <div className="col-lg-1 myCenterAlign col-6">
            <p>פעולות</p>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="myCenterAlign loaderHeigth">
          <Loader />
        </div>
      ) : (
        <div>
          {targets.map((item, index) => {
            return (
              <MyCard key={index}>
                <div className="flex-container body">
                  <div className="col-lg-2 colMobile4 mobileAlign col-1">
                    <p>{item.month}</p>
                  </div>
                  <div className="col-lg-2 colMobile4 mobileAlign col-2">
                    <p>חודשי</p>
                  </div>
                  <div className="col-lg-2 colMobile6 mobileAlign col-3">
                    <p>{numberWithCommas(item.targetValue)}</p>
                  </div>
                  <div className="col-lg-2 colMobile6 mobileAlign col-4">
                    <p>{numberWithCommas(item.currentValue)}</p>
                  </div>
                  <div className="col-lg-2 myCenterAlign colMobile6 mobileAlign col-5">
                    {completedType(item)}
                  </div>
                  {(isSuperAgent || isAdmin) && (
                    <div
                      className="col-lg-1 myCenterAlign modalBtn colMobile6 mobileAlign col-6"
                      onClick={() => setTargetModalItem(item)}
                    >
                      <Wrap>
                        <span className="material-symbols-outlined">draw</span>
                      </Wrap>
                    </div>
                  )}
                </div>
              </MyCard>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TargetList
