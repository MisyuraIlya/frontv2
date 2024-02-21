import React, { FC, useEffect } from 'react'
import ModalWrapper from '../components/ModalWrapper/ModalWrapper'
import MyInput from '../../../shared/MyInput'
import { useForm } from 'react-hook-form'
import { useAgentProfileStore } from '../../Agent/store/agentProfile.store'

type EditTargetProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

type EditTargetForm = {
  target: number
}

const EditTarget: FC<EditTargetProps> = ({ active, setActive }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EditTargetForm>()

  const { selectedTarget, createTarget, updateTarget } = useAgentProfileStore()
  const handleClick = (data: EditTargetForm) => {
    if (selectedTarget) {
      if (selectedTarget?.id) {
        selectedTarget.targetValue = +data.target
        updateTarget(selectedTarget)
      } else {
        selectedTarget.targetValue = +data.target
        createTarget(selectedTarget)
      }
    }
    reset()
  }

  useEffect(() => {
    if (selectedTarget?.targetValue) {
      setValue('target', +selectedTarget?.targetValue)
    } else {
      setValue('target', 0)
    }
  }, [selectedTarget])
  return (
    <>
      <ModalWrapper
        active={active}
        setActive={setActive}
        height={30}
        width={50}
      >
        <form className="flex-container" onSubmit={handleSubmit(handleClick)}>
          <div className="col-lg-12">
            <h3>עדכון יעד</h3>
          </div>
          <div className="col-lg-6 ">
            <div className="myPadding">
              <div className="clientsAgentSearchWrapper">
                <div className="search-cont">
                  <input
                    type={'text'}
                    placeholder={'סוכן'}
                    disabled={true}
                    value={selectedTarget?.agent?.name ?? ''}
                  />
                  <span className="material-symbols-outlined search-img">
                    {'support_agent'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="myPadding">
              <div className="clientsAgentSearchWrapper">
                <div className="search-cont">
                  <input
                    type={'text'}
                    placeholder={'תאריך'}
                    disabled={true}
                    value={selectedTarget?.month ?? ''}
                  />
                  <span className="material-symbols-outlined search-img">
                    {'calendar_month'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="myPadding">
              <div className="clientsAgentSearchWrapper">
                <div className="search-cont">
                  <input
                    type={'number'}
                    {...register('target')}
                    placeholder={'יעד'}
                  />
                  <span className="material-symbols-outlined search-img">
                    {'paid'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ position: 'absolute', bottom: '60px', left: '60px' }}
            className="MyButton"
          >
            <button>{'עדכן'}</button>
          </div>
        </form>
      </ModalWrapper>
    </>
  )
}

export default EditTarget
