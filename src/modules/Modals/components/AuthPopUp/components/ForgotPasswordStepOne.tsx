import React from 'react'
import { useAuth } from '../../../../Auth/store/useAuthStore'
import { useForm } from 'react-hook-form'
import { useModals } from '../../../provider/ModalProvider'

type ForgotPasswordStepOne = {
  email: string
}

const ForgotPasswordStepOne = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordStepOne>()
  const { restorePasswordStepOne, setAction, setEmail } = useAuth()
  const { setOpenAuthModal } = useModals()

  const handleLogin = (data: ForgotPasswordStepOne) => {
    restorePasswordStepOne(data.email)
    setEmail(data.email)
    setAction('forgotPassordStepTwo')
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
            <h3>{'אנא הקלידו את המספר טלפון שלכם'}</h3>
            <input
              type="text"
              {...register('email', { required: `טלפון שדה חובה` })}
              placeholder={'טלפון'}
            />
            <button type="submit">{'שלח'}</button>
            <button
              type="button"
              onClick={() => setAction('login')}
              style={{ marginTop: '20px' }}
            >
              {'חזרה'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ForgotPasswordStepOne
