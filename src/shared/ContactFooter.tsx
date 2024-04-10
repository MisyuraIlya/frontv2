import React from 'react'
import {
  Container,
  Grid,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  List,
  ListItem,
  Box,
  ListItemIcon,
  ListItemText,
  FormControl,
} from '@mui/material'
import { colors, themeColors } from '../styles/mui'
import { useForm, Controller } from 'react-hook-form'
import BusinessIcon from '@mui/icons-material/Business'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'

type form = {
  firstName: string
  lastName: string
  phone: string
  email: string
  description: string
}

const ContactFooter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<form>()

  return (
    <Box sx={{ backgroundColor: themeColors.primary }}>
      <Container maxWidth="xl">
        <Grid container spacing={10} sx={{ paddingTop: '50px' }}>
          <Grid
            item
            xs={4}
            sx={{ color: 'white', bgcolor: colors.alpha.white[5] }}
          >
            <Typography variant="h5">יש לכם שאלות? תצרו איתנו קשר</Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <FormControl fullWidth margin="normal">
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'מספר לקוח שדה חובה',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="מספר לקוח פנימי*"
                      placeholder="הכנס את המספר שלך"
                      type="text"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      sx={{
                        color: 'white',
                        '& .MuiInput-underline:before': {
                          borderBottomColor: 'white',
                        },
                        '& .MuiInput-underline:hover:before': {
                          borderBottomColor: 'white',
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                      InputLabelProps={{ style: { color: 'white' } }}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'מספר לקוח שדה חובה',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="מספר לקוח פנימי*"
                      placeholder="הכנס את המספר שלך"
                      type="text"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      sx={{
                        color: 'white',
                        '& .MuiInput-underline:before': {
                          borderBottomColor: 'white',
                        },
                        '& .MuiInput-underline:hover:before': {
                          borderBottomColor: 'white',
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                      InputLabelProps={{ style: { color: 'white' } }}
                    />
                  )}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <FormControl fullWidth margin="normal">
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'מספר לקוח שדה חובה',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="מספר לקוח פנימי*"
                      placeholder="הכנס את המספר שלך"
                      type="text"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      sx={{
                        color: 'white',
                        '& .MuiInput-underline:before': {
                          borderBottomColor: 'white',
                        },
                        '& .MuiInput-underline:hover:before': {
                          borderBottomColor: 'white',
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                      InputLabelProps={{ style: { color: 'white' } }}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'מספר לקוח שדה חובה',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="מספר לקוח פנימי*"
                      placeholder="הכנס את המספר שלך"
                      type="text"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      sx={{
                        color: 'white',
                        '& .MuiInput-underline:before': {
                          borderBottomColor: 'white',
                        },
                        '& .MuiInput-underline:hover:before': {
                          borderBottomColor: 'white',
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                      InputLabelProps={{ style: { color: 'white' } }}
                    />
                  )}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={8}></Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ContactFooter
