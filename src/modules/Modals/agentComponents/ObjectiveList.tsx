import React, { FC, useState } from 'react'
import MyCard from '../../../shared/MyCard'
import ModalWrapper from '../components/ModalWrapper/ModalWrapper'
import moment from 'moment'
import { useMyScheduleCalendar } from '../../Agent/store/ScheduleCalendar.store'
import BigButton from '../../../shared/BigButton'
import { useModals } from '../provider/ModalProvider'

type ObjectiveListProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const ObjectiveList: FC<ObjectiveListProps> = ({ active, setActive }) => {
  const { selectedObjectItem, handleStatus } = useMyScheduleCalendar()
  const [previousSelected, setPreviousSelected] =
    useState<IAgentObjective | null>(null)
  const { setObjectItemModal } = useModals()

  const handleSelectFromList = (item: IAgentObjective) => {
    setPreviousSelected(selectedObjectItem)
    setObjectItemModal(item)
  }

  const handleGoBack = () => {
    if (previousSelected) {
      setObjectItemModal(previousSelected)
      setPreviousSelected(null)
    }
  }

  const handleClose = () => {
    setActive(false)
    setPreviousSelected(null)
  }

  const handleStatusFunc = (id: number, value: boolean) => {
    handleStatus(id, value)
    handleClose()
  }
  return (
    <ModalWrapper
      active={active}
      setActive={handleClose}
      height={60}
      width={40}
    >
      {selectedObjectItem && selectedObjectItem?.subTusk?.length > 0 ? (
        <div className="taskList">
          <div className="myCenterAlign">
            <h3>
              בחר משימה - יום {selectedObjectItem?.choosedDay} בין השעות{' '}
              {moment(selectedObjectItem?.hourFrom).format('HH')} -{' '}
              {moment(selectedObjectItem?.hourTo).format('HH')}
            </h3>
          </div>
          <div>
            <div className="list ">
              {selectedObjectItem?.subTusk?.map((item, index) => {
                return (
                  <>
                    <div className="myPadding">
                      <MyCard>
                        <div
                          className=" pointer"
                          key={index}
                          onClick={() => handleSelectFromList(item)}
                        >
                          <div className="col-lg-2 myCenterAlign">
                            <div className="myPadding type">
                              <span>{item?.objectiveType}</span>
                            </div>
                          </div>
                          <div className="col-lg-2 myCenterAlign">
                            <div className="myPadding">
                              <span>
                                {moment(item?.hourFrom).format('HH')} -{' '}
                                {moment(item?.hourTo).format('HH')}
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-3 myCenterAlign">
                            <div className="myPadding">
                              <span>
                                {item?.title} {item?.description}
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-3 myCenterAlign">
                            <div className="myPadding">
                              <span>
                                {item?.isCompleted
                                  ? moment(item?.completedAt)
                                      .locale('he')
                                      .format('LLLL')
                                  : 'ממתין'}{' '}
                              </span>
                            </div>
                          </div>
                        </div>
                      </MyCard>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex-container hours-cont">
            <h3 className="myMarginBottom">
              {selectedObjectItem?.objectiveType == 'task' ? 'משימה' : 'ביקור'}
            </h3>
            <div className="hours-box col-lg-12 myMarginBottom">
              <div className="flex-container flex">
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
                <span>תאריך</span>
                <span>
                  {moment(selectedObjectItem?.date).format('DD-MM-YYYY')}
                </span>
              </div>
            </div>
            <div className="hours-box">
              <div className="flex-container flex">
                <span className="material-symbols-outlined">schedule</span>
                <span>משעה</span>
                <span>{moment(selectedObjectItem?.hourFrom).format('HH')}</span>
              </div>
            </div>
            <div className="hours-box myMarginBottom">
              <div className="flex-container flex">
                <span className="material-symbols-outlined">schedule</span>
                <span>עד שעה</span>
                <span>{moment(selectedObjectItem?.hourTo).format('HH')}</span>
              </div>
            </div>
          </div>
          <div className="MyDivider"></div>
          <div className="flex-container myMarginTop">
            <div className="col-lg-12">
              <div className="flex-container flex">
                <span className="material-symbols-outlined">event_note</span>
                <div className="myPadding">
                  <span>{selectedObjectItem?.description}</span>
                </div>
              </div>
            </div>
          </div>
          {selectedObjectItem?.completedAt ? (
            <div>
              {selectedObjectItem?.isCompleted ? (
                <div>
                  <div className="myCenterAlign">
                    <h4>המשימה הושלמה</h4>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="myCenterAlign">
                    <h4>המשימה לא הושלמה</h4>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="myCenterAlign">
              <div className="modal-mark-cont">
                <div className="myCenterAlign">
                  <h4>המשימה הושלמה?</h4>
                </div>
                <div className="flex-container">
                  <div></div>
                  {selectedObjectItem?.id !== undefined && (
                    <>
                      <div className="myPadding">
                        <BigButton
                          googleIcon="check_circle"
                          imgLink={`${process.env.REACT_APP_MEDIA}/agentApp/VIcon.png`}
                          color={'suc'}
                          onClickBtn={() =>
                            handleStatusFunc(selectedObjectItem!.id!, true)
                          }
                        />
                      </div>
                      <div className="myPadding">
                        <BigButton
                          googleIcon="block"
                          imgLink={`${process.env.REACT_APP_MEDIA}/agentApp/+Icon.png`}
                          color={'fal'}
                          onClickBtn={() =>
                            handleStatusFunc(selectedObjectItem!.id!, false)
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {previousSelected?.id && (
            <div className="close_btn" onClick={() => handleGoBack()}>
              <span className="material-symbols-outlined">
                keyboard_backspace
              </span>
            </div>
          )}
        </div>
      )}
    </ModalWrapper>
  )
}

export default ObjectiveList
