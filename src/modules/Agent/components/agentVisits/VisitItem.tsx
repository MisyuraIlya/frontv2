import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material'
import moment from 'moment'
import React, { FC, useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ModalWrapper from '../../../../utils/ModalWrapper/ModalWrapper'
import SearchInput from '../../../../utils/SearchInput/SearchInput'
import {
  HEBREW_DAYS,
  ReactSelectOptionsOfFullHour,
} from '../../helpers/arrayOfMonths'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../../Auth/store/useAuthStore'
import useDataAgentObjectives from '../../hooks/useDataAgentObjectives'

interface VisitItem {
  item: IAgentObjective
  index: number
}

type EditAndCreateVisitForm = {
  week1: boolean
  week2: boolean
  week3: boolean
  week4: boolean
  day: { value: string; label: string }
  hourFrom: { value: string; label: string }
  hourTo: { value: string; label: string }
}

const VisitItem: FC<VisitItem> = ({ item, index }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedHourFrom, setSelectedHourFrom] = useState('')
  const [selectedHourTo, setSelectedHourTo] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const { agent } = useAuth()
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const { createVisit, updateVisit } = useDataAgentObjectives('visit')
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditAndCreateVisitForm>()

  const handleClick = (data: EditAndCreateVisitForm) => {
    if (item?.client?.name) {
      const updated = item
      updated.week1 = data.week1 ?? item.week1
      updated.week2 = data.week2 ?? item.week2
      updated.week3 = data.week3 ?? item.week3
      updated.week4 = data.week4 ?? item.week4
      updated.choosedDay = data?.day?.value ?? item.choosedDay
      updated.hourFrom = data?.hourFrom?.value ?? item.hourFrom
      updated.hourTo = data?.hourTo?.value ?? item.hourTo
      updateVisit(updated)
    } else {
      if (item && selectedUser && agent) {
        let obj: IAgentObjective = {
          agent: agent,
          client: selectedUser,
          isCompleted: false,
          completedAt: moment().format('YYYY-MM-DD'),
          title: '',
          description: '',
          week1: data.week1,
          week2: data.week2,
          week3: data.week3,
          week4: data.week4,
          hourFrom: data.hourFrom.value,
          hourTo: data.hourTo.value,
          choosedDay: data.day.value,
          date: moment().format('YYYY-MM-DD'),
          objectiveType: 'visit',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
          subTusk: [],
        }
        createVisit(obj)
      }
    }
    reset()
  }

  return (
    <>
      <Card
        key={index}
        sx={{
          padding: '20px',
          margin: '10px',
          borderRadius: '5px',
          boxShadow: '0 2px 40px rgba(132,147,168,.15)',
        }}
      >
        <Grid container spacing={2}>
          {item?.client && (
            <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>
                {item?.client.extId} - {item?.client.name}
              </Typography>
            </Grid>
          )}
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{item.client?.address}</Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{item.client?.phone}</Typography>
          </Grid>
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
            {item.hourFrom && item.hourTo ? (
              <Typography>
                {moment(item.hourFrom).format('HH')} -{' '}
                {moment(item.hourTo).format('HH')}
              </Typography>
            ) : (
              <Typography>אין תאריכים</Typography>
            )}
          </Grid>
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{item.choosedDay}</Typography>
          </Grid>
          <Grid item xs={1} className="myCenterAlign mobileAlign modalBtn">
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{
                borderRadius: '5px',
                backgroundColor: '#f7f9fc',
                minWidth: '80px',
              }}
            >
              <ModeEditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
      <ModalWrapper active={open} setActive={setOpen} width={25} height={55}>
        <form className="flex-container" onSubmit={handleSubmit(handleClick)}>
          <Box>
            <Typography variant="h5" sx={{ padding: '20px 0' }}>
              עדכון ביקור
            </Typography>
            <SearchInput
              value={search}
              setValue={setSearch}
              placeholder="חיפוש לקוח.."
            />
            <Typography variant="h5" textAlign={'center'}>
              שבוע
            </Typography>
            <Box className="centered" sx={{ gap: '20px' }}>
              <Box>
                <Typography textAlign={'center'}>1</Typography>
                <Switch
                  defaultChecked={item?.week1 || false}
                  {...register('week1')}
                />
              </Box>
              <Box>
                <Typography textAlign={'center'}>2</Typography>
                <Switch
                  defaultChecked={item?.week2 || false}
                  {...register('week2')}
                />
              </Box>
              <Box>
                <Typography textAlign={'center'}>3</Typography>
                <Switch
                  defaultChecked={item?.week3 || false}
                  {...register('week3')}
                />
              </Box>
              <Box>
                <Typography textAlign={'center'}>4</Typography>
                <Switch
                  defaultChecked={item?.week4 || false}
                  {...register('week4')}
                />
              </Box>
            </Box>
            <Typography
              variant="h5"
              textAlign={'center'}
              sx={{ marginTop: '40px' }}
            >
              יום בשבוע
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {'בחר יום בשבוע'}
              </InputLabel>
              <Select
                value={selectedDay}
                label="בחר יום בשבוע"
                placeholder="בחר יום בשבוע"
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {HEBREW_DAYS?.map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ gap: '20px', marginTop: '20px' }} className="centered">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">משעה</InputLabel>
                <Select
                  placeholder="משעה"
                  label="משעה"
                  value={selectedHourFrom}
                  onChange={(e) => setSelectedHourFrom(e.target.value)}
                >
                  {ReactSelectOptionsOfFullHour?.map((item, index) => (
                    <MenuItem value={item.value} key={index}>
                      {item.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {'עד שעה'}
                </InputLabel>
                <Select
                  placeholder="עד שעה"
                  label="עד שעה"
                  value={selectedHourTo}
                  onChange={(e) => setSelectedHourTo(e.target.value)}
                >
                  {ReactSelectOptionsOfFullHour?.map((item, index) => (
                    <MenuItem value={item.value} key={index}>
                      {item.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button
              variant="contained"
              sx={{
                fontSize: '18px',
                position: 'absolute',
                bottom: '30px',
                right: '50px',
                borderRadius: '20px',
              }}
            >
              צור ביקור
            </Button>
          </Box>
        </form>
      </ModalWrapper>
    </>
  )
}

export default VisitItem
