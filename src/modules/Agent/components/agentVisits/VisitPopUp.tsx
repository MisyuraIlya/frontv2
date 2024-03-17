import React, { useState } from 'react'
import ModalWrapper from '../../../../utils/ModalWrapper/ModalWrapper'
import { useAuth } from '../../../Auth/store/useAuthStore'
import useDataAgentObjectives from '../../hooks/useDataAgentObjectives'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import SearchInput from '../../../../utils/SearchInput/SearchInput'
import {
  HEBREW_DAYS,
  ReactSelectOptionsOfFullHour,
} from '../../helpers/arrayOfMonths'
import moment from 'moment'
import SearchUserList from '../../../../utils/SearchInput/SearchUserList'

type EditAndCreateVisitForm = {
  week1: boolean
  week2: boolean
  week3: boolean
  week4: boolean
  day: string
  hourFrom: string
  hourTo: string
}

const VisitPopUp = ({
  item,
  open,
  setOpen,
}: {
  item?: IAgentObjective
  open: boolean
  setOpen: (bool: boolean) => void
}) => {
  const { agent } = useAuth()
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const { createVisit, updateVisit } = useDataAgentObjectives('visit')
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditAndCreateVisitForm>({
    defaultValues: {
      week1: item?.week1 || false,
      week2: item?.week2 || false,
      week3: item?.week3 || false,
      week4: item?.week4 || false,
      day: item?.choosedDay || '',
      hourFrom: moment(item?.hourFrom).format('HH:mm') || '',
      hourTo: moment(item?.hourTo).format('HH:mm') || '',
    },
  })

  const handleClick = (data: EditAndCreateVisitForm) => {
    if (item?.client?.name) {
      const updated = item
      updated.week1 = data.week1 ?? item.week1
      updated.week2 = data.week2 ?? item.week2
      updated.week3 = data.week3 ?? item.week3
      updated.week4 = data.week4 ?? item.week4
      updated.choosedDay = data?.day ?? item.choosedDay
      updated.hourFrom = data?.hourFrom ?? item.hourFrom
      updated.hourTo = data?.hourTo ?? item.hourTo
      updateVisit(updated)
    } else {
      if (selectedUser && agent) {
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
          hourFrom: data.hourFrom,
          hourTo: data.hourTo,
          choosedDay: data.day,
          date: moment().format('YYYY-MM-DD'),
          objectiveType: 'visit',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
          subTusk: [],
        }
        console.log('new', obj)
        createVisit(obj)
      }
    }
    reset()
    setOpen(false)
  }

  const onClickHandle = (user: IUser) => {
    setSelectedUser(user)
  }

  return (
    <ModalWrapper active={open} setActive={setOpen} width={20} height={55}>
      <form className="centered" onSubmit={handleSubmit(handleClick)}>
        <Box>
          <Typography variant="h5" sx={{ padding: '20px 0' }}>
            עדכון ביקור
          </Typography>
          <SearchUserList onClick={onClickHandle} />
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
            <Controller
              name="day"
              control={control}
              defaultValue=""
              rules={{
                required: 'בחר יום בשבוע',
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="בחר יום בשבוע"
                  placeholder="בחר יום בשבוע"
                >
                  {HEBREW_DAYS?.map((item, index) => (
                    <MenuItem value={item.value} key={index}>
                      {item.value}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <Box sx={{ gap: '20px', marginTop: '20px' }} className="centered">
            <FormControl fullWidth>
              <InputLabel id="from-select-label">משעה</InputLabel>
              <Controller
                name="hourFrom"
                control={control}
                defaultValue=""
                rules={{
                  required: 'בחר משעה',
                }}
                render={({ field }) => (
                  <Select {...field} label="משעה" placeholder="משעה">
                    {ReactSelectOptionsOfFullHour?.map((item, index) => (
                      <MenuItem value={item.value} key={index}>
                        {item.value}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="to-select-label">עד שעה</InputLabel>
              <Controller
                name="hourTo"
                control={control}
                defaultValue=""
                rules={{
                  required: 'בחר עד שעה',
                }}
                render={({ field }) => (
                  <Select {...field} label="עד שעה" placeholder="עד שעה">
                    {ReactSelectOptionsOfFullHour?.map((item, index) => (
                      <MenuItem value={item.value} key={index}>
                        {item.value}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: '18px',
              position: 'absolute',
              bottom: '30px',
              right: '60px',
              borderRadius: '8px',
            }}
          >
            צור ביקור
          </Button>
        </Box>
      </form>
    </ModalWrapper>
  )
}

export default VisitPopUp
