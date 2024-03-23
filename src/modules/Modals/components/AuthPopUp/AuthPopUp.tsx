import React, { FC } from 'react'
import Loader from '../../../../shared/Loader'
import LoginForm from './components/LoginForm'
import { useAuth } from '../../../Auth/store/useAuthStore'
import RegistrationForm from './components/RegistrationForm'
import ForgotPasswordStepOne from './components/ForgotPasswordStepOne'
import ForgotPasswordStepTwo from './components/ForgotPasswordStepTwo'
import ValidationForm from './components/ValidationForm'
import NewB2bCustomer from './components/NewB2bCustomer'
import { Box, IconButton, Modal, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type AuthPopUpProps = {
  active: boolean
  setActive: (bol: boolean) => void
}

const AuthPopUp: FC<AuthPopUpProps> = ({ active, setActive }) => {
  const { loading, action, login, registration, validation } = useAuth()
  return (
    <Modal
      open={active}
      onClose={() => setActive(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={9}
        sx={{
          width: '400px',
          padding: '20px',
          outline: 'none',
        }}
      >
        <Box
          sx={{ display: 'flex', justifyContent: 'end', marginBottom: '20px' }}
        >
          <IconButton onClick={() => setActive(false)}>
            <CloseIcon sx={{ fontSize: '35px', cursor: 'pointer' }} />
          </IconButton>
        </Box>
        {action === 'login' && <LoginForm />}
        {action === 'register' && <RegistrationForm />}
        {action === 'forgotPassordStepOne' && <ForgotPasswordStepOne />}
        {action === 'forgotPassordStepTwo' && <ForgotPasswordStepTwo />}
        {action === 'validation' && <ValidationForm />}
        {action === 'registerNewClient' && <NewB2bCustomer />}
      </Paper>
    </Modal>
  )
}

export default AuthPopUp
