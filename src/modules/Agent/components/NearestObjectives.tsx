import React, { useEffect } from 'react'
import Container from '../layout/AgentContainer'
import Loader from '../../../shared/Loader'
import MyCard from '../../../shared/MyCard'
import { useAgentProfileStore } from '../store/agentProfile.store'
import { useModals } from '../../Modals/provider/ModalProvider'
import BigButton from '../../../shared/BigButton'
import moment from 'moment'
import { useMyScheduleCalendar } from '../store/ScheduleCalendar.store'
const NearestObjectives = () => {
  const { taskToday, fetchTaskToday } = useAgentProfileStore()
  const { setTaskModal } = useModals()
  const { handleStatus } = useMyScheduleCalendar()

  const handleStatusLocal = async (id: number, value: boolean) => {
    await handleStatus(id, value)
    await fetchTaskToday()
  }
  return (
    <div className="myMarginTop">
      <MyCard>
        <div className="container objectives-cont">
          <div className="">
            <h4>המשימות שלך להיום</h4>
            {false ? (
              <div className="myCenterAlign loaderHeightMin">
                <Loader />
              </div>
            ) : (
              <div>
                {taskToday?.map((item, index) => {
                  return (
                    <div key={index}>
                      <MyCard>
                        <div className="flex-container pointer">
                          <div
                            className="col-lg-1 colMobile1 myCenterAlign"
                            onClick={() => setTaskModal(true)}
                          >
                            {item.objectiveType === 'visit' && (
                              <span className="material-symbols-outlined">
                                location_on
                              </span>
                            )}
                            {item.objectiveType === 'task' && (
                              <span className="material-symbols-outlined">
                                task
                              </span>
                            )}
                          </div>
                          <div
                            className="col-lg-1 colMobile2"
                            onClick={() => setTaskModal(true)}
                          >
                            <p>
                              {item.objectiveType == 'task'
                                ? 'משישמה'
                                : 'ביקור'}
                            </p>
                          </div>
                          <div
                            className="col-lg-4 colMobile4 long-text"
                            onClick={() => setTaskModal(true)}
                          >
                            <p>
                              {item.description} {item.client?.name}
                            </p>
                          </div>
                          <div
                            className="col-lg-1 colMobile6 myCenterAlign"
                            onClick={() => setTaskModal(true)}
                          >
                            <p>{moment(item.hourFrom).format('HH')}</p>
                          </div>
                          <div
                            className="col-lg-1 colMobile6 myCenterAlign"
                            onClick={() => setTaskModal(true)}
                          >
                            <p>{moment(item.hourTo).format('HH')}</p>
                          </div>
                          <div className="col-lg-3 colMobile6 myCenterAlign btns">
                            {item.completedAt ? (
                              <div>
                                {item.isCompleted ? (
                                  <div className="myCenterAlign">
                                    <p>בוצע</p>
                                  </div>
                                ) : (
                                  <div className="myCenterAlign">
                                    <p>לא בוצע</p>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                <div>
                                  <div className="flex-container">
                                    <div className="BigButton-cont">
                                      <BigButton
                                        googleIcon="check_circle"
                                        imgLink={`${process.env.REACT_APP_MEDIA}/icon/VIcon.png`}
                                        color={'suc'}
                                        onClickBtn={() =>
                                          handleStatusLocal(item.id!, true)
                                        }
                                      />
                                    </div>
                                    <div className="BigButton-cont">
                                      <BigButton
                                        googleIcon="block"
                                        imgLink={`${process.env.REACT_APP_MEDIA}/icon/+Icon.png`}
                                        color={'fal'}
                                        onClickBtn={() =>
                                          handleStatusLocal(item.id!, false)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </MyCard>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </MyCard>
    </div>
  )
}

export default NearestObjectives
