import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../../../Auth/store/useAuthStore'

type ValidationForm = {
  userExtId: string
  phone: string
}

const ValidationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationForm>()
  const { validation, setAction } = useAuth()

  const handleLogin = async (data: ValidationForm) => {
    await validation(data.userExtId, data.phone)
  }

  return (
    <form className="register" onSubmit={handleSubmit(handleLogin)}>
      <div className="connect-b2b-form">
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
          <p>{"מס' לקוח פנימי"}</p>
          <input
            type="text"
            {...register('userExtId', { required: `מספר לקוח שדה חובה` })}
          />
        </div>
        <div className="input-cont">
          <p>{'טלפון'}</p>
          <input
            type="text"
            {...register('phone', { required: `טלפון שדה חובה` })}
          />
        </div>
        <div className="accept">
          <button type="submit">{'בדיקה'}</button>
        </div>
        <div className="actions">
          <div className="send btn-cont">
            <button
              onClick={() => setAction('registerNewClient')}
              type="button"
            >
              הרשמת לקוח חדש
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ValidationForm
