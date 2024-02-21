import React, { FC } from 'react'
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper'
import { useForm } from 'react-hook-form'
import { useClientStore } from '../../../Admin/store/ClientsStore'
import MyInput from '../../../../shared/MyInput'

type ClientOptionsProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

type ClientOptionsForm = {
  password: string
  username: string
  passwordSecond: string
}

const ClientOptions: FC<ClientOptionsProps> = ({ active, setActive }) => {
  const { selectedClient, updateClient } = useClientStore()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientOptionsForm>()

  const handleClock = async (data: ClientOptionsForm) => {
    if (data.passwordSecond) {
      if (selectedClient) {
        const updated = selectedClient
        updated.email = data.username
        updated.passwordUnencrypted = data.passwordSecond
        await updateClient(updated)
      }
    } else {
      if (selectedClient) {
        const updated = selectedClient
        updated.passwordUnencrypted = data.password
        await updateClient(updated)
      }
    }
    setActive(false)
    reset()
  }

  const handleBlocked = async () => {
    let newUser = selectedClient
    if (newUser && selectedClient) {
      newUser.isBlocked = !selectedClient.isBlocked
      await updateClient(newUser)
    }
  }

  const handleNewPassword = async () => {
    let newUser = selectedClient
    if (newUser && selectedClient) {
      newUser.isRegistered = false
      newUser.passwordUnencrypted = null
      newUser.email = null
      await updateClient(newUser)
    }
  }

  return (
    <ModalWrapper active={active} setActive={setActive} width={40} height={63}>
      <div className="flex-container">
        <div className="col-lg-6">
          <div
            className="buttonAdminIcon flex-container MyCenetred"
            onClick={() => handleBlocked()}
          >
            <div className="col-lg-4 MyCenetred">
              {selectedClient?.isBlocked ? (
                <span className="material-symbols-outlined">person_off</span>
              ) : (
                <span className="material-symbols-outlined">person</span>
              )}
            </div>
            <div className="col-lg-8">
              {selectedClient?.isBlocked ? (
                <p>הפעלת לקוח</p>
              ) : (
                <p>חסימת לקוח</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div
            className="buttonAdminIcon flex-container MyCenetred"
            onClick={() => handleNewPassword()}
          >
            <div className="col-lg-4 MyCenetred">
              <span className="material-symbols-outlined">lock_open</span>
            </div>
            <div className="col-lg-8">
              <p>איפוס לקוח</p>
            </div>
          </div>
        </div>
      </div>
      <form className="pass" onSubmit={handleSubmit(handleClock)}>
        <div className="user-info-wrapp">
          <div className="popup-contant">
            <div className="popup-contant-header flex-container">
              <div className="col-lg-10">
                <p>שינוי סיסמה</p>
              </div>
              <div className="close-popup col-lg-2">
                <div>
                  <span className="material-symbols-outlined googleIconHover">
                    password
                  </span>
                </div>
              </div>
            </div>
            <div className="all-row-cont">
              <div
                className="flex-container row-cont"
                style={{ paddingTop: '20px' }}
              >
                <div className="col-lg-4 MyCenetred">
                  <span>סיסמה חדשה</span>
                </div>
                <div className="col-lg-8 MyCenetred">
                  <MyInput
                    disabled={false}
                    googleIcons={'password'}
                    type={'text'}
                    placeholder={'סיסמה חדשה'}
                    register={register}
                    name={'password'}
                  />
                </div>
              </div>
              <button className="buttonGreen">אישור</button>
            </div>
          </div>
        </div>
        <div className="user-info-wrapp">
          <div className="popup-contant">
            <div className="popup-contant-header flex-container">
              <div className="col-lg-10">
                <p>הקמת לקוח</p>
              </div>
              <div className="close-popup col-lg-2">
                <div>
                  <span className="material-symbols-outlined googleIconHover">
                    settings_accessibility
                  </span>
                </div>
              </div>
            </div>
            <div className="all-row-cont">
              <div
                className="flex-container row-cont"
                style={{ paddingTop: '20px' }}
              >
                <div className="col-lg-4 MyCenetred">
                  <span>שם משתמש</span>
                </div>
                <div className="col-lg-8 MyCenetred">
                  <MyInput
                    disabled={false}
                    googleIcons={'person'}
                    type={'text'}
                    placeholder={'שם משתמש'}
                    register={register}
                    name={'username'}
                  />
                </div>
              </div>
              <div
                className="flex-container row-cont"
                style={{ paddingTop: '20px' }}
              >
                <div className="col-lg-4 MyCenetred">
                  <p>סיסמה</p>
                </div>
                <div className="col-lg-8 MyCenetred">
                  <MyInput
                    disabled={false}
                    googleIcons={'password'}
                    type={'text'}
                    placeholder={'סיסמה חדשה'}
                    register={register}
                    name={'passwordSecond'}
                  />
                </div>
              </div>
              <button className="buttonGreen">אישור</button>
            </div>
          </div>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default ClientOptions
