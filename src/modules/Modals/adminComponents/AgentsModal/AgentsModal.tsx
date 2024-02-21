import React, { FC } from 'react'
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper'
import { useForm } from 'react-hook-form'
import { useClientStore } from '../../../Admin/store/ClientsStore'
import moment from 'moment'
import { onSuccessAlert } from '../../../../shared/MySweetAlert'
import { useAgentProfileStore } from '../../../Agent/store/agentProfile.store'

interface AgentsModalProps {
  active: boolean
  setActive: (value: boolean) => void
}

type AgentsModalForm = {
  extId: string
  username: string
  password: string
  name: string
  phone: string
  isAllowAllUsers: boolean
  isAllowOrder: boolean
}

const AgentsModal: FC<AgentsModalProps> = ({ active, setActive }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgentsModalForm>()
  const { updateClient, createClient } = useClientStore()
  const { selectedAgent, setSelectedAgent } = useClientStore()
  const { fetchAgentsList } = useAgentProfileStore()

  const handleClick = async (data: AgentsModalForm) => {
    if (selectedAgent?.id) {
      const updatedUser = selectedAgent
      updatedUser.extId = data.extId
      updatedUser.email = data.username
      updatedUser.passwordUnencrypted = data.password
      updatedUser.password = data.password
      updatedUser.name = data.name
      updatedUser.phone = data.phone
      updatedUser.isAllowAllClients = data.isAllowAllUsers
      updatedUser.isAllowOrder = data.isAllowOrder
      await updateClient(updatedUser)
    } else {
      let obj: IUser = {
        extId: data.extId,
        email: data.username,
        isRegistered: true,
        isBlocked: false,
        name: data.name,
        phone: data.phone,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD'),
        discount: 0,
        role: 'ROLE_AGENT',
        isAllowOrder: data.isAllowOrder,
        isAllowAllClients: data.isAllowAllUsers,
        passwordUnencrypted: data.password,
        password: data.password,
      }
      await createClient(obj)
    }
    onSuccessAlert('עודכן בהצלחה', '')
    await fetchAgentsList()
    handleClose()
  }

  const handleClose = () => {
    setActive(false)
    reset()
    setSelectedAgent(null)
  }
  return (
    <ModalWrapper
      active={active}
      setActive={handleClose}
      width={40}
      height={70}
    >
      <form className="flex-container" onSubmit={handleSubmit(handleClick)}>
        <div className="col-lg-12 myPadding">
          <h3>פרטי סוכן</h3>
        </div>
        <div className="col-lg-12 myPadding">
          <div className="search-cont">
            <input
              type={'text'}
              placeholder={'מס פנימי'}
              {...register('extId')}
              defaultValue={selectedAgent?.extId ?? ''}
            />
            <span className="material-symbols-outlined search-img">
              {'support_agent'}
            </span>
          </div>
        </div>
        <div className="col-lg-12 myPadding">
          <div className="search-cont">
            <input
              type={'text'}
              placeholder={'שם משתמש'}
              {...register('username')}
              defaultValue={selectedAgent?.email ?? ''}
            />
            <span className="material-symbols-outlined search-img">
              {'badge'}
            </span>
          </div>
        </div>
        <div className="col-lg-12 myPadding">
          <div className="search-cont">
            <input
              type={'text'}
              placeholder={'סיסמא'}
              {...register('password')}
              defaultValue={selectedAgent?.passwordUnencrypted ?? ''}
            />
            <span className="material-symbols-outlined search-img">
              {'lock'}
            </span>
          </div>
        </div>
        <div className="col-lg-12 myPadding">
          <div className="search-cont">
            <input
              type={'text'}
              placeholder={'שם סוכן'}
              {...register('name')}
              defaultValue={selectedAgent?.name ?? ''}
            />
            <span className="material-symbols-outlined search-img">
              {'accessibility'}
            </span>
          </div>
        </div>
        <div className="col-lg-12 myPadding">
          <div className="search-cont">
            <input
              type={'text'}
              placeholder={'נייד'}
              {...register('phone')}
              defaultValue={selectedAgent?.phone ?? ''}
            />
            <span className="material-symbols-outlined search-img">
              {'smartphone'}
            </span>
          </div>
        </div>
        <div className="col-lg-12 myPadding">
          <div className="myPadding">
            <div className="flex-container days-cont">
              <div className=" col-lg-6">
                <div className="myCenterAlign">
                  <div>
                    <p className="myCenterAlign numCls">אישור הזמנות</p>
                    <label className="switch">
                      <input
                        type="checkbox"
                        {...register('isAllowOrder')}
                        defaultChecked={selectedAgent?.isAllowOrder || false}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className=" col-lg-6">
                <div className="myCenterAlign">
                  <div>
                    <p className="myCenterAlign numCls">כל הלקוחות</p>
                    <label className="switch">
                      <input
                        type="checkbox"
                        {...register('isAllowAllUsers')}
                        defaultChecked={
                          selectedAgent?.isAllowAllClients || false
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
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
  )
}

export default AgentsModal
