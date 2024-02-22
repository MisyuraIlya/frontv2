import React from 'react'
import { useAuth } from '../../../../Auth/store/useAuthStore'
import { useForm, Controller } from 'react-hook-form'
import { useModals } from '../../../provider/ModalProvider'
import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

type ForgotPasswordStepOne = {
  phone: string
}

const ForgotPasswordStepOne = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ForgotPasswordStepOne>()
  const { restorePasswordStepOne, setAction, setEmail } = useAuth()
  const { setOpenAuthModal } = useModals()

  const handleLogin = (data: ForgotPasswordStepOne) => {
    restorePasswordStepOne(data.phone)
    setEmail(data.phone)
    setAction('forgotPassordStepTwo')
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
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: 'מספר טלפון',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="טלפון"
                type="text"
                error={!!errors.phone}
                helperText={errors.phone?.message}
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
          שלח קוד סודי
        </Button>
      </Box>
    </form>
  )
}

export default ForgotPasswordStepOne
