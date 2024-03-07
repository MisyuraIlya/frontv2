import { Grid, Typography } from '@mui/material'
import React from 'react'

const Head = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Typography variant="body1">מס'</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">לקוח</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">סטאטוס</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="body1">מידע</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="body1">פעולות</Typography>
      </Grid>
    </Grid>
  )
}

export default Head
