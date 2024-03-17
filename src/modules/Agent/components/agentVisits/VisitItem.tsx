import { Card, Grid, IconButton, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import VisitPopUp from './VisitPopUp'

interface VisitItem {
  item: IAgentObjective
  index: number
}

const VisitItem: FC<VisitItem> = ({ item, index }) => {
  const [open, setOpen] = useState(false)

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
                {item.hourFrom} - {item.hourTo}
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
      <VisitPopUp open={open} setOpen={setOpen} item={item} />
    </>
  )
}

export default VisitItem
