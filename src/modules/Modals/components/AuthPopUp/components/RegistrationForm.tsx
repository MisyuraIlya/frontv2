import React, { useState } from 'react'
import { useAuth } from '../../../../Auth/store/useAuthStore'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

type RegistrationForm = {
  email: string
  password: string
  confirmPassword: string
  token: string
  privacy: string | boolean
}

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationForm>()
  const [acceptCondition, setAcceptCondition] = useState(false)
  const { registration, userExtId, phone, setAction } = useAuth()

  const handleLogin = (data: RegistrationForm) => {
    // if(!acceptCondition) {
    //     onErrorAlert('אנא אשר את תנאי שימוש')
    // }
    registration(userExtId, data.email, data.password, phone, data.token)
  }

  return (
    <form className="login" onSubmit={handleSubmit(handleLogin)}>
      <Box className="centered" sx={{ marginTop: '40px' }}>
        <PersonOutlineOutlinedIcon sx={{ fontSize: '50px' }} />
      </Box>
      <Box className="centered" sx={{ marginTop: '40px' }}>
        <Typography variant="h4">הרשמה</Typography>
      </Box>
      <Box sx={{ margin: '20px 50px' }}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'מייל שדה חובה',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'מייל אינו תקין',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="מייל"
                type="mail"
                error={!!errors.email}
                helperText={errors.email?.message}
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
              required: 'סיסמא שדה חובה',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="סיסמא"
                type="password"
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
              required: 'סיסמא שדה חובה',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="סיסמא"
                type="password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />
        </FormControl>
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
                type="mail"
                error={!!errors.token}
                helperText={errors.token?.message}
              />
            )}
          />
        </FormControl>
        <FormControlLabel
          control={
            <Controller
              name="privacy"
              control={control}
              defaultValue={false}
              render={({ field }) => <Checkbox {...field} color="primary" />}
            />
          }
          label="אנא קרא והסכם לתנאי שימוש"
        />
        <Button
          sx={{ borderRadius: '12px', marginTop: '50px', fontSize: '18px' }}
          fullWidth={true}
          type="submit"
          variant="contained"
          color="primary"
        >
          הרשמה
        </Button>
        <Box className="centered" sx={{ marginTop: '30px' }}>
          <Typography
            onClick={() => setAction('forgotPassordStepOne')}
            variant="body2"
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            color={'primary'}
          >
            שחזר סיסמה
          </Typography>
        </Box>
        <Box sx={{ marginTop: '30px' }}>
          <Button
            sx={{ borderRadius: '12px', marginTop: '10px' }}
            fullWidth={true}
            type="submit"
            variant="outlined"
            color="primary"
            onClick={() => setAction('login')}
          >
            יש כבר משתמש?
          </Button>
        </Box>
      </Box>
    </form>
  )
}

export default RegistrationForm
