import React, { useState } from 'react'
import { useAuth } from '../../../../Auth/store/useAuthStore'
import { useForm } from 'react-hook-form'

type RegistrationForm = {
  password: string
  confirmPassword: string
  token: string
}

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>()
  const [acceptCondition, setAcceptCondition] = useState(false)
  const { registration, userExtId, phone, setAction } = useAuth()

  const handleLogin = (data: RegistrationForm) => {
    // if(!acceptCondition) {
    //     onErrorAlert('אנא אשר את תנאי שימוש')
    // }
    registration(userExtId, phone, data.password, phone, data.token)
  }

  return (
    <form className="login" onSubmit={handleSubmit(handleLogin)}>
      <div>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '50px' }}
        >
          person
        </span>
      </div>
      <h3>{'הרשמה'}</h3>
      <div className="input-cont">
        <p>{'סיסמה'}</p>
        <input
          id="password"
          type="password"
          {...register('password', { required: `סיסמא שדה חובה` })}
        />
      </div>
      <div className="input-cont">
        <p>{'אימות סיסמא'}</p>
        <input
          id="password"
          type="password"
          {...register('confirmPassword', { required: `סיסמא שדה חובה` })}
        />
      </div>
      <div className="input-cont">
        <p>{'קוד סודי'}</p>
        <input
          id="token"
          type="text"
          {...register('token', { required: `קוד סודי שדה חובה` })}
        />
      </div>
      <div className="terms-and-conditions">
        <div className="checkboxes-and-radios">
          <input
            type="checkbox"
            onChange={(e) => setAcceptCondition(!acceptCondition)}
            name="checkbox-cats"
            checked={acceptCondition}
            id="checkbox-3"
            value="3"
          />
          <label htmlFor="checkbox-3"></label>
        </div>
        <span>
          אנא קרא והסכם{' '}
          <a
            target="_blank"
            href={process.env.REACT_APP_MEDIA + '/privacy_policy.pdf'}
          >
            לתנאי השימוש
          </a>
        </span>
      </div>

      <div className="actions">
        <div className="send btn-cont">
          <button type="submit">הרשמה</button>
        </div>
      </div>
      <p
        onClick={() => setAction('forgotPassordStepOne')}
        className="forgot-pass"
      >
        {'שחזר סיסמה'}
      </p>
    </form>
  )
}

export default RegistrationForm
