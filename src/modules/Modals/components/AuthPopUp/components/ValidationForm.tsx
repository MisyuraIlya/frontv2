import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../../../Auth/store/useAuthStore'
import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

type ValidationForm = {
  userExtId: string
  phone: string
}

const ValidationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ValidationForm>()
  const { validation, setAction } = useAuth()

  const handleLogin = async (data: ValidationForm) => {
    await validation(data.userExtId, data.phone)
  }

  return (
    <form className="register" onSubmit={handleSubmit(handleLogin)}>
      <Box className="centered" sx={{ marginTop: '40px' }}>
        <PersonOutlineOutlinedIcon sx={{ fontSize: '50px' }} />
      </Box>
      <Box className="centered" sx={{ marginTop: '40px' }}>
        <Typography variant="h4">אימות לקוח</Typography>
      </Box>
      <Box sx={{ margin: '20px 50px' }}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="userExtId"
            control={control}
            defaultValue=""
            rules={{
              required: 'מספר לקוח שדה חובה',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="מספר לקוח"
                type="text"
                error={!!errors.userExtId}
                helperText={errors.userExtId?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: 'טלפון שדה חובה',
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
          אימות
        </Button>
      </Box>
    </form>
  )
}

export default ValidationForm
