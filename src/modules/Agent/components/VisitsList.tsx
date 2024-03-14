import React from 'react'
import { Card, Grid, Typography } from '@mui/material'
import Loader from '../../../shared/Loader'
import moment from 'moment'
import useDataAgentObjectives from '../hooks/useDataAgentObjectives'
const VisitsList = () => {
  // const { loading, visits } = useAgentProfileStore()
  // const { isSuperAgent, isAdmin } = useAuth()
  // const { setVisitModalItem } = useModals()

  const { isLoading, data } = useDataAgentObjectives('visit')
  return (
    <Card sx={{ marginTop: '50px' }}>
      <Grid
        container
        spacing={2}
        className="head"
        sx={{ borderRadius: '5px', padding: '20px', margin: '10px' }}
      >
        <Grid item xs={5}>
          <Typography variant="body1" fontWeight={700}>
            לקוח
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            כתובת
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            טלפון
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1" fontWeight={700}>
            שעות
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1" fontWeight={700}>
            יום
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1" fontWeight={700}>
            פעולות
          </Typography>
        </Grid>
      </Grid>

      {isLoading ? (
        <div className="loaderHeightMin myCenterAlign myWidth">
          <div className="myCenterAlign">
            <Loader />
          </div>
        </div>
      ) : (
        data?.['hydra:member']?.map((item, index) => {
          return (
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
                  <Grid
                    item
                    xs={5}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography>
                      {item?.client.extId} - {item?.client.name}
                    </Typography>
                  </Grid>
                )}
                <Grid
                  item
                  xs={2}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography>{item.client?.address}</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography>{item.client?.phone}</Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {item.hourFrom && item.hourTo ? (
                    <Typography>
                      {moment(item.hourFrom).format('HH')} -{' '}
                      {moment(item.hourTo).format('HH')}
                    </Typography>
                  ) : (
                    <Typography>אין תאריכים</Typography>
                  )}
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography>{item.choosedDay}</Typography>
                </Grid>
                {/* {(isSuperAgent || isAdmin) && (
                  <Grid item xs={1} className="myCenterAlign mobileAlign modalBtn">
                    <Wrap onClick={() => setVisitModalItem(item)}>
                      <span className="material-symbols-outlined">draw</span>
                    </Wrap>
                  </Grid>
                )} */}
              </Grid>
            </Card>
          )
        })
      )}
    </Card>
  )
}

export default VisitsList
