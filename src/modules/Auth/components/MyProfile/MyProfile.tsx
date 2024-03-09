import React from 'react'
import { useAuth } from '../../store/useAuthStore'
import { Link } from 'react-router-dom'
import { useAgentStore } from '../../../Agent/store/agent.store'
import { Paper, Typography, Grid, Button } from '@mui/material'

const MyProfile = () => {
  const { user, logOut } = useAuth()
  const { selectedClient } = useAgentStore()

  return (
    <>
      <Typography variant="h4" sx={{ marginTop: '50px' }}>
        אזור אישי
      </Typography>
      <Paper elevation={4} sx={{ padding: '15px 40px', marginTop: '20px' }}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Typography variant="h6">{'שם'}</Typography>
            <Typography variant="body1">
              {selectedClient ? selectedClient?.name : user?.name}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">{'מייל'}</Typography>
            <Typography variant="body1">
              {selectedClient ? selectedClient.email : user?.email}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">{'טלפון'}</Typography>
            <Typography variant="body1">
              {selectedClient ? selectedClient?.phone : user?.phone}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">{'אובליגו'}</Typography>
            <Typography variant="body1">
              {selectedClient ? selectedClient?.maxCredit : user?.maxCredit}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">{'יתרת חוב'}</Typography>
            <Typography variant="body1">
              {selectedClient ? selectedClient?.maxCredit : user?.maxCredit}
            </Typography>
          </Grid>
          <Grid item xs={2} className="centered">
            <Button
              variant="contained"
              sx={{ fontSize: '19px' }}
              onClick={() => logOut()}
            >
              התנתק
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default MyProfile
