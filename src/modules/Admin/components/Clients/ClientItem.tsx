import React, { FC, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { themeColors } from '../../../../styles/mui'
import SettingsIcon from '@mui/icons-material/Settings'
import { UserStatus } from '../../../../enums/status'
import ModalWrapper from '../../../../utils/ModalWrapper/ModalWrapper'
import moment from 'moment'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled'
import {
  onAsk,
  onErrorAlert,
  onSuccessAlert,
} from '../../../../shared/MySweetAlert'
import { useForm, Controller } from 'react-hook-form'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { AdminClinetsService } from '../../services/clients.service'

interface ClientItemProps {
  element: IUser
  index: number
}

type RegistrationForm = {
  email: string
  password: string
  confirmPassword: string
}

const ClientItem: FC<ClientItemProps> = ({ element, index }) => {
  const [openInfo, setOpenInfo] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RegistrationForm>()

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleBlock = async (value: boolean) => {
    if (value) {
      const ask = await onAsk(
        'בטוח תרצה לחסום',
        `לקוח "${element.name}" לא יוכל להכנס למערכת ולבצע הזמנות`
      )
      if (ask) {
        element.isBlocked = value
        const response = await AdminClinetsService.updateClient(element)
        if (response.status == 'success') {
          onSuccessAlert('לקוח נחסם בהצלחה', '')
        } else {
          onErrorAlert('לא עודכן', response.message)
        }
      }
    } else {
      element.isBlocked = value
      const response = await AdminClinetsService.updateClient(element)
      if (response.status == 'success') {
        onSuccessAlert('לקוח נפתח בהצלחה', '')
      } else {
        onErrorAlert('לא עודכן', response.message)
      }
    }
    setAnchorEl(null)
  }

  const handleReset = async () => {
    const ask = await onAsk(
      'בטוח תרצה לאפס את הלקוח?',
      `לקוח "${element.name}" אצטרך לבצע הרשמה מחדש`
    )
    if (ask) {
      element.isRegistered = false
      element.passwordUnencrypted = null
      element.email = null
      const response = await AdminClinetsService.updateClient(element)
      if (response.status == 'success') {
        onSuccessAlert('לקוח אופס בהצלחה', '')
      } else {
        onErrorAlert('לא עודכן', response.message)
      }
    }
    setAnchorEl(null)
  }

  const handleUpdate = async (data: RegistrationForm) => {
    element.email = data.email
    element.passwordUnencrypted = data.password
    element.isRegistered = true
    element.role = 'ROLE_USER'
    const response = await AdminClinetsService.updateClient(element)
    if (response.status == 'success') {
      onSuccessAlert('לקוח הוקם בהצלחה', '')
    } else {
      onErrorAlert('לא עודכן', response.message)
    }
    setOpenSettings(false)
    setAnchorEl(null)
  }

  return (
    <>
      <Grid container spacing={2} key={index}>
        <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1">{element?.extId}</Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1">{element?.name}</Typography>
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
          {UserStatus(element)}
        </Grid>
        <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setOpenInfo(true)}>
            <InfoIcon sx={{ color: themeColors.primary }} />
          </IconButton>
        </Grid>
        <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleOpenMenu}>
            <SettingsIcon sx={{ color: themeColors.primary }} />
          </IconButton>
        </Grid>
      </Grid>

      {/* INFO MODAL */}
      <ModalWrapper
        active={openInfo}
        setActive={setOpenInfo}
        height={25}
        width={20}
      >
        <Typography variant="h6" sx={{ margin: '10px 0' }}>
          מידע לקוח
        </Typography>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '5px 0',
          }}
        >
          <Typography variant="body1" fontWeight={800}>
            שם להלקוח
          </Typography>
          <Typography variant="body1">{element.name}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '5px 0',
          }}
        >
          <Typography variant="body1" fontWeight={800}>
            טלפון
          </Typography>
          <Typography variant="body1">{element.phone}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '5px 0',
          }}
        >
          <Typography variant="body1" fontWeight={800}>
            מס' לקוח
          </Typography>
          <Typography variant="body1">{element.extId}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '5px 0',
          }}
        >
          <Typography variant="body1" fontWeight={800}>
            שם משתמש
          </Typography>
          <Typography variant="body1">{element.email}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '5px 0',
          }}
        >
          <Typography variant="body1" fontWeight={800}>
            סיסמא
          </Typography>
          <Typography variant="body1">{element.passwordUnencrypted}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '5px 0',
          }}
        >
          <Typography variant="body1" fontWeight={800}>
            עודכן לאחרונה
          </Typography>
          <Typography variant="body1">
            {moment(element?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
          </Typography>
        </Box>
      </ModalWrapper>

      {/* MENU */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => setOpenSettings(true)}>
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">הקמת לקוח</Typography>
        </MenuItem>
        {element?.isBlocked ? (
          <MenuItem onClick={() => handleBlock(false)}>
            <ListItemIcon>
              <PersonAddAltIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">הפעלת לקוח</Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleBlock(true)}>
            <ListItemIcon>
              <PersonOffIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">חסימת לקוח</Typography>
          </MenuItem>
        )}

        <MenuItem onClick={() => handleReset()}>
          <ListItemIcon>
            <PersonAddDisabledIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">איפוס לקוח</Typography>
        </MenuItem>
      </Menu>

      {/* SETTINGS MODAL */}
      <ModalWrapper
        active={openSettings}
        setActive={setOpenSettings}
        height={50}
        width={15}
      >
        <Box>
          <Typography variant="h6" sx={{ margin: '10px 0' }}>
            פרטי כניסה
          </Typography>
          <Divider />
          <Box>
            <Typography variant="body1" sx={{ margin: '10px 0' }}>
              מספר לקוח: {element.extId}
            </Typography>
            <Typography variant="body1" sx={{ margin: '10px 0' }}>
              לקוח: {element.name}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(handleUpdate)}>
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
                    label="אימות סיסמא"
                    type="password"
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
              הרשמה
            </Button>
          </form>
        </Box>
      </ModalWrapper>
    </>
  )
}

export default ClientItem
