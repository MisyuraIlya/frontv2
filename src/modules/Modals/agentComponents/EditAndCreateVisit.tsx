import React, { FC, useState } from 'react'
import ModalWrapper from '../components/ModalWrapper/ModalWrapper'
import MyInput from '../../../shared/MyInput'
import Select from 'react-select'
import {
  HEBREW_DAYS,
  ReactSelectOptionsOfFullHour,
} from '../../Agent/helpers/arrayOfMonths'
import { useForm, Controller } from 'react-hook-form'
import { useAgentProfileStore } from '../../Agent/store/agentProfile.store'
import UserSearchInput from '../../Auth/components/UserSearchInput/UserSearchInput'
import { useAuth } from '../../Auth/store/useAuthStore'
import moment from 'moment'

type EditAndCreateVisitProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

type EditAndCreateVisitForm = {
  week1: boolean
  week2: boolean
  week3: boolean
  week4: boolean
  day: { value: string; label: string }
  hourFrom: { value: string; label: string }
  hourTo: { value: string; label: string }
}

const EditAndCreateVisit: FC<EditAndCreateVisitProps> = ({
  active,
  setActive,
}) => {
  const { selectedVisit, setSelectedVisit, createVisit, updateVisit } =
    useAgentProfileStore()
  const [choosedClient, setChoosedClient] = useState<IUser | null>(null)
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditAndCreateVisitForm>()

  const handleClick = (data: EditAndCreateVisitForm) => {
    if (selectedVisit?.client?.name) {
      const updated = selectedVisit
      updated.week1 = data.week1 ?? selectedVisit.week1
      updated.week2 = data.week2 ?? selectedVisit.week2
      updated.week3 = data.week3 ?? selectedVisit.week3
      updated.week4 = data.week4 ?? selectedVisit.week4
      updated.choosedDay = data?.day?.value ?? selectedVisit.choosedDay
      updated.hourFrom = data?.hourFrom?.value ?? selectedVisit.hourFrom
      updated.hourTo = data?.hourTo?.value ?? selectedVisit.hourTo
      updateVisit(updated)
    } else {
      if (choosedClient && user) {
        let obj: IAgentObjective = {
          agent: user,
          client: choosedClient,
          isCompleted: false,
          completedAt: moment().format('YYYY-MM-DD'),
          title: '',
          description: '',
          week1: data.week1,
          week2: data.week2,
          week3: data.week3,
          week4: data.week4,
          hourFrom: data.hourFrom.value,
          hourTo: data.hourTo.value,
          choosedDay: data.day.value,
          date: moment().format('YYYY-MM-DD'),
          objectiveType: 'visit',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
          subTusk: [],
        }
        createVisit(obj)
      }
    }
    reset()
    setSelectedVisit(null)
    setActive(false)
  }

  const closePopUp = () => {
    setActive(false)
    reset()
    setSelectedVisit(null)
  }
  return (
    <>
      <ModalWrapper
        active={active}
        setActive={closePopUp}
        height={70}
        width={50}
      >
        <form className="flex-container" onSubmit={handleSubmit(handleClick)}>
          <div className="col-lg-12">
            <h3>עדכון ביקור</h3>
          </div>
          <div className="col-lg-12 ">
            <div className="myPadding">
              {selectedVisit && selectedVisit?.client?.name ? (
                <div className="MyInput">
                  <div className="flex-container myCenterAlign cardInput">
                    <div className="col-lg-10 input">
                      <input
                        type="text"
                        disabled
                        value={selectedVisit?.client.name}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <UserSearchInput onChoose={setChoosedClient} />
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="myPadding">
              <div className="myCenterAlign">
                <h4>שבוע</h4>
              </div>
              <div className="flex-container days-cont">
                <div className=" col-lg-3">
                  <div className="myCenterAlign">
                    <div>
                      <p className="myCenterAlign numCls">1</p>
                      <label className="switch">
                        <input
                          type="checkbox"
                          {...register('week1')}
                          defaultChecked={selectedVisit?.week1 || false}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className=" col-lg-3">
                  <div className="myCenterAlign">
                    <div>
                      <p className="myCenterAlign numCls">2</p>
                      <label className="switch">
                        <input
                          type="checkbox"
                          {...register('week2')}
                          defaultChecked={selectedVisit?.week2 || false}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className=" col-lg-3">
                  <div className="myCenterAlign">
                    <div>
                      <p className="myCenterAlign numCls">3</p>
                      <label className="switch">
                        <input
                          type="checkbox"
                          {...register('week3')}
                          defaultChecked={selectedVisit?.week3 || false}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className=" col-lg-3">
                  <div className="myCenterAlign">
                    <div>
                      <p className="myCenterAlign numCls">4</p>
                      <label className="switch">
                        <input
                          type="checkbox"
                          {...register('week4')}
                          defaultChecked={selectedVisit?.week4 || false}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 modalSelect">
            <div className="myPadding">
              <div className="myCenterAlign">
                <h4>יום בשבוע</h4>
              </div>
            </div>
            <div className="myPadding selectModal">
              <Controller
                name="day"
                control={control}
                render={({ field }) => (
                  <Select
                    options={HEBREW_DAYS}
                    defaultValue={{
                      value: selectedVisit?.choosedDay,
                      label: selectedVisit?.choosedDay,
                    }}
                    placeholder={'בחר..'}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="myPadding">
              <Controller
                name="hourFrom"
                control={control}
                render={({ field }) => (
                  <Select
                    options={ReactSelectOptionsOfFullHour}
                    defaultValue={{
                      value: selectedVisit?.hourFrom,
                      label: selectedVisit?.hourFrom,
                    }}
                    placeholder={'משעה'}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="myPadding">
              <Controller
                name="hourTo"
                control={control}
                render={({ field }) => (
                  <Select
                    options={ReactSelectOptionsOfFullHour}
                    defaultValue={{
                      value: selectedVisit?.hourTo,
                      label: selectedVisit?.hourTo,
                    }}
                    placeholder={'עד שעה'}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div
            style={{ position: 'absolute', bottom: '60px', left: '60px' }}
            className="MyButton"
          >
            <button>{selectedVisit?.client?.name ? 'עדכן' : 'ליצור'}</button>
          </div>
        </form>
      </ModalWrapper>
    </>
  )
}

export default EditAndCreateVisit
