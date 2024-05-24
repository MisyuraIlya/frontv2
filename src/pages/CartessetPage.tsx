import React from 'react'
import Loader from '../shared/Loader'
import useDataCartesset from '../hooks/useDataCartesset'
import Utils from '../utils'
import Documents from '../components/Documents'
import { Box, Container } from '@mui/material'

const CartessetPage = () => {
  const { isLoading } = useDataCartesset()
  return (
    <Container maxWidth="xl">
      {isLoading && <Loader />}
      <Box sx={{ mt: '50px' }}>
        <Utils.BreadCrumbsUtil
          array={[
            {
              title: 'כרטסת',
              link: '',
            },
          ]}
        />
      </Box>
      <Documents.Cartesset.Filter />
      <Documents.Cartesset.List />
    </Container>
  )
}

export default CartessetPage
