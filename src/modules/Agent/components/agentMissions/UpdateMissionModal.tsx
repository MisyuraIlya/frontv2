import React, { useState } from 'react'
import ModalWrapper from '../../../../utils/ModalWrapper/ModalWrapper'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import moment from 'moment'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { themeColors } from '../../../../styles/mui'
import useDataAgentMissions from '../../hooks/useDataAgentMissions'
import { useMyScheduleCalendar } from '../../store/ScheduleCalendar.store'

const MissionModal = ({
  open,
  setOpen,
  item,
}: {
  open: boolean
  setOpen: (value: boolean) => void
  item: IAgentObjective
}) => {
  const { weekFrom, weekTo } = useMyScheduleCalendar()
  const { updateObjective } = useDataAgentMissions(weekFrom, weekTo)

  const handleStatusFunc = (value: boolean) => {
    if (value) {
      item.isCompleted = true
    } else {
      item.isCompleted = false
    }
    item.completedAt = moment().format('YYYY-MM-DD HH:mm')
    updateObjective(item)
    setOpen(false)
  }

  return (
    <ModalWrapper active={open} setActive={setOpen} width={20} height={40}>
      <Box>
        <Typography variant="h6" fontWeight={800} textAlign={'center'}>
          {item?.objectiveType == 'task' ? 'משימה' : 'ביקור'}
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <CalendarMonthOutlinedIcon />
          <Typography variant="body1">
            תאריך {moment(item?.date).format('DD-MM-YYYY')}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '40px',
          }}
        >
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <AccessTimeOutlinedIcon />
            <Typography variant="body1">משעה {item?.hourFrom}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <AccessTimeOutlinedIcon />
            <Typography variant="body1">עד שעה {item?.hourTo}</Typography>
          </Box>
        </Box>
        <Divider sx={{ display: 'flex', gap: '20px', marginTop: '20px' }} />
        <Box sx={{ display: 'flex', marginTop: '20px', gap: '10px' }}>
          <FeaturedPlayListOutlinedIcon />
          <Typography variant="body1">{item.client?.name}</Typography>
          <Typography variant="body1">
            {item.client?.city} - {item.client?.address}
          </Typography>
        </Box>
        {item.completedAt ? (
          <>
            {item.isCompleted ? (
              <Typography
                variant="h6"
                fontWeight={800}
                textAlign={'center'}
                sx={{ marginTop: '20px' }}
              >
                {'המשימה הושלמה'}
              </Typography>
            ) : (
              <Typography
                variant="h6"
                fontWeight={800}
                textAlign={'center'}
                sx={{ marginTop: '20px' }}
              >
                {'המשימה לא הושלמה'}
              </Typography>
            )}
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              fontWeight={800}
              textAlign={'center'}
              sx={{ marginTop: '20px' }}
            >
              {'המשימה הושלמה?'}
            </Typography>
            <Box className="centered">
              <Box sx={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
                <IconButton
                  sx={{
                    borderRadius: '5px',
                    backgroundColor: '#f3f5f9',
                    '&:hover': { background: '#d1d9e8' },
                  }}
                  onClick={() => handleStatusFunc(true)}
                >
                  <TaskAltIcon
                    sx={{ color: themeColors.primary, fontSize: '35px' }}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    borderRadius: '5px',
                    backgroundColor: '#f3f5f9',
                    '&:hover': { background: '#d1d9e8' },
                  }}
                  onClick={() => handleStatusFunc(false)}
                >
                  <NotInterestedIcon
                    sx={{ color: themeColors.primary, fontSize: '35px' }}
                  />
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </ModalWrapper>
  )
}

export default MissionModal
