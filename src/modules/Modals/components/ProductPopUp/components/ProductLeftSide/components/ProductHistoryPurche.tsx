import React from 'react'
import { useSelectedProduct } from '../../../../../store/selecterdProduct.store'
import { getUserFromStorage } from '../../../../../../Auth/helpers/auth.helper'
import { useModals } from '../../../../../provider/ModalProvider'
import { Button, Typography, Box, Grid, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'

const ProductHistoryPurche = () => {
  const { getPurchesHistory } = useSelectedProduct()
  const { setActiveTablePopUp } = useModals()

  const handleOpen = () => {
    setActiveTablePopUp(true)
    getPurchesHistory()
  }

  return (
    <>
      {getUserFromStorage() && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">{'היסטוריית רכישה'}</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <IconButton onClick={handleOpen}>
                <VisibilityIcon />
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default ProductHistoryPurche
