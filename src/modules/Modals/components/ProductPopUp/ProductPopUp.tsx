import React, { FC } from 'react'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import ProductLeftSide from './components/ProductLeftSide/ProductLeftSide'
import ProductRightSide from './components/ProductRightSide/ProductRightSide'
import { Grid } from '@mui/material'

type ProductPopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const ProductPopUp: FC<ProductPopUpProps> = ({ active, setActive }) => {
  return (
    <ModalWrapper active={active} setActive={setActive} height={90} width={80}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <ProductRightSide />
        </Grid>
        <Grid item xs={7}>
          <ProductLeftSide />
        </Grid>
      </Grid>
    </ModalWrapper>
  )
}

export default ProductPopUp
