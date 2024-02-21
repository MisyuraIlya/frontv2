import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../../../Auth/store/useAuthStore'
import { useModals } from '../../../provider/ModalProvider'

type ForgotPasswordStepTwo = {
  token: string
  password: string
  confirmPassword: string
}

const ForgotPasswordStepTwo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordStepTwo>()
  const { restorePasswordStepTwo, email, setAction } = useAuth()
  const { setOpenAuthModal } = useModals()

  const handleLogin = (data: ForgotPasswordStepTwo) => {
    restorePasswordStepTwo(email, data.token, data.password)
    setAction('login')
  }

  return (
    <form className="login" onSubmit={handleSubmit(handleLogin)}>
      <div className="forgot-pass-wrapp">
        <div className="forgot-password">
          <div className="cancel">
            <div onClick={() => setOpenAuthModal(false)}>
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>
          <div>
            <h3>{'אנא הקלד קוד הבקשה וסיסמה חדשה'} </h3>
            <input
              type="text"
              {...register('token', { required: `קוד שדה חובה` })}
              placeholder={'קוד הבקשה'}
            />
            <input
              type="text"
              {...register('password', { required: `סיסמה שדה חובה` })}
              placeholder={'סיסמה חדשה'}
            />
            <input
              type="text"
              {...register('confirmPassword', { required: `אימות שדה חובה` })}
              placeholder={'אימות סיסמה חדשה'}
            />
            <button type="submit">{'שלח'}</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ForgotPasswordStepTwo
