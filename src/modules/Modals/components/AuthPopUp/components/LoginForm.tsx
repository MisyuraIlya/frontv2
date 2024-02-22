import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../../../Auth/store/useAuthStore'
import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

type LoginForm = {
  email: string
  password: string
}

const LoginForm = () => {
  const { login, setAction } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginForm>()

  const handleLogin = (data: LoginForm) => {
    login(data.email, data.password)
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Box className="centered" sx={{ marginTop: '40px' }}>
        <PersonOutlineOutlinedIcon sx={{ fontSize: '50px' }} />
      </Box>
      <Box className="centered" sx={{ marginTop: '40px' }}>
        <Typography variant="h4">כניסה</Typography>
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
        <Button
          sx={{ borderRadius: '12px', marginTop: '50px', fontSize: '18px' }}
          fullWidth={true}
          type="submit"
          variant="contained"
          color="primary"
        >
          כניסה
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
          <Box className="centered">
            <Typography variant="body1" color={'primary'}>
              טרם נרשמת?
            </Typography>
          </Box>
          <Button
            sx={{ borderRadius: '12px', marginTop: '10px' }}
            fullWidth={true}
            type="submit"
            variant="outlined"
            color="primary"
            onClick={() => setAction('validation')}
          >
            לחץ כאן להרשמה
          </Button>
        </Box>
      </Box>
    </form>
  )
}

export default LoginForm
