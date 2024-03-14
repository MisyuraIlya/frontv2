import React from 'react'
import MyCard from '../../../shared/MyCard'
import Loader from '../../../shared/Loader'
import { useAgentProfileStore } from '../store/agentProfile.store'
import Wrap from '../../../shared/Wrap'
import { useAuth } from '../../Auth/store/useAuthStore'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useModals } from '../../Modals/provider/ModalProvider'
import { Box, Card, Grid, IconButton, Typography } from '@mui/material'
import useDataAgentTargets from '../hooks/useDataAgentTargets'
import { themeColors } from '../../../styles/mui'
import ModeEditIcon from '@mui/icons-material/ModeEdit'

const TargetList = ({ year }: { year: string }) => {
  // const { loading, targets } = useAgentProfileStore()
  const { isSuperAgent, isAdmin } = useAuth()
  // const { setTargetModalItem } = useModals()
  const { data, isLoading } = useDataAgentTargets(year)
  const completedType = (item: IAgentTaget) => {
    let answer = ''
    let bg = '#f7f9fc'
    if (!item.targetValue || !item.currentValue) {
      bg = '#f7f9fc'
      answer = 'ממתין'
    } else {
      if (item.currentValue > item.targetValue) {
        bg = '#41dc934d'
        answer = 'הגיע ליעד'
      } else {
        bg = '#d2335c33'
        answer = 'לא הגיע'
      }
    }
    return (
      <Box
        sx={{
          backgroundColor: bg,
          color: themeColors.primary,
          padding: '5px 10px',
          borderRadius: '5px',
        }}
      >
        {answer}
      </Box>
    )
  }

  return (
    <Card sx={{ marginTop: '50px' }}>
      <Grid container spacing={2} sx={{ margin: '5px', padding: '10px 20px' }}>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            תאריך
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            מחזור
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            יעד
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            מחזור
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            סטאטוס
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1" fontWeight={700}>
            פעולות
          </Typography>
        </Grid>
      </Grid>
      {isLoading ? (
        <Box className="centered">
          <Loader />
        </Box>
      ) : (
        <div>
          {data?.['hydra:member']?.map((item, index) => {
            return (
              <Card
                key={index}
                sx={{
                  margin: '20px',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  boxShadow: '0 2px 40px rgba(132,147,168,.15)',
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography variant="body1">{item.month}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography variant="body1">חודשי</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography variant="body1">
                      {numberWithCommas(item.targetValue)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography variant="body1">
                      {numberWithCommas(item.currentValue)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography variant="body1">
                      {completedType(item)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <IconButton
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
            )
          })}
        </div>
      )}
    </Card>
  )
}

export default TargetList
