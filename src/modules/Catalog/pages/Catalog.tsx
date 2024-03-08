import React from 'react'
import RightSide from '../components/RightSide/RightSide'
import LeftSide from '../components/LeftSide/LeftSide'
// import BreadCrumbs from '../../../shared/BreadCrumbs'
import { Grid, Container } from '@mui/material'
const Catalog = () => {
  return (
    <Container maxWidth="xl" sx={{ marginTop: '200px' }}>
      {/* TODO */}
      {/* <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href={`/client/catalog/${lvl1Bread[0]?.identify}/0/0`}>
          {lvl1Bread[0]?.title || ''}
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/client/catalog/${lvl1Bread[0]?.identify}/${lvl2Bread[0]?.extId}/0`}
        >
          {lvl2Bread[0]?.title || ''}
        </Link>
        <Typography variant='h5'>
          {lvl3Bread[0]?.title || ''}
        </Typography>
      </Breadcrumbs> */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <RightSide />
        </Grid>
        <Grid item xs={9}>
          <LeftSide />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Catalog
