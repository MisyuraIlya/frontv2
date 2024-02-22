import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../../../Auth/store/useAuthStore'
import { useModals } from '../../../provider/ModalProvider'
import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

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
    control,
  } = useForm<ForgotPasswordStepTwo>()
  const { restorePasswordStepTwo, email, setAction } = useAuth()
  const { setOpenAuthModal } = useModals()

  const handleLogin = (data: ForgotPasswordStepTwo) => {
    restorePasswordStepTwo(email, data.token, data.password)
    setAction('login')
  }

  return (
    <form className="login" onSubmit={handleSubmit(handleLogin)}>
      <Box className="centered" sx={{ marginTop: '40px' }}>
        <PersonOutlineOutlinedIcon sx={{ fontSize: '50px' }} />
      </Box>
      <Box className="centered" sx={{ marginTop: '40px' }}>
        <Typography variant="h4">שחזור סיסמא</Typography>
      </Box>
      <Box sx={{ margin: '20px 50px' }}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="token"
            control={control}
            defaultValue=""
            rules={{
              required: 'קוד סודי שדה חובה',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="קוד סודי"
                type="text"
                error={!!errors.token}
                helperText={errors.token?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: ' סיסמא שדה חובה',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="סיסמא"
                type="text"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: ' אימות סיסמא שדה חובה',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="אימות סיסמא"
                type="text"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />
        </FormControl>
        <Button
          sx={{ borderRadius: '12px', marginTop: '50px', fontSize: '18px' }}
          fullWidth={true}
          type="submit"
          variant="contained"
          color="primary"
        >
          שינוי סיסמא
        </Button>
      </Box>
    </form>
  )
}

export default ForgotPasswordStepTwo
