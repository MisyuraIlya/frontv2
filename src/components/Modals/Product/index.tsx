import React, { FC } from 'react'
import ModalWrapper from '../../../modules/Modals/components/ModalWrapper/ModalWrapper'
import ProductLeftSide from './ProductLeftSide'
import ProductRightSide from './ProductRightSide'
import { Box, Button, Grid } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import { useModals } from '../../../provider/ModalProvider'
type ProductPopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const Product: FC<ProductPopUpProps> = ({ active, setActive }) => {
  const { setActiveTablePopUp } = useModals()

  const handleOpen = () => {
    setActiveTablePopUp(true)
  }

  return (
    <ModalWrapper
      active={active}
      setActive={setActive}
      height={'auto'}
      width={80}
      component={
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button variant="outlined" sx={{ minWidth: '40px', p: '5px' }}>
            <InsertLinkIcon />
          </Button>
          <Button variant="outlined" sx={{ minWidth: '40px', p: '5px' }}>
            <ShareIcon />
          </Button>
          <Button
            variant="outlined"
            endIcon={<RemoveRedEyeIcon />}
            onClick={handleOpen}
          >
            היסטוריית רכישה
          </Button>
        </Box>
      }
    >
      <Grid container spacing={2}>
        <Grid item sm={5} xs={12}>
          <ProductRightSide />
        </Grid>
        <Grid item sm={7} xs={12}>
          <ProductLeftSide />
        </Grid>
      </Grid>
    </ModalWrapper>
  )
}

export default Product
