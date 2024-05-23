import React, { FC, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { themeColors, themeSettings } from '../../styles/mui'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ProductCard from '../ProductCard'
interface ProductSectionProps {
  title: string
  array: IProduct[]
  toShow: number
  column: number
  loading: boolean
}

const Products: FC<ProductSectionProps> = ({ title, array }) => {
  const swiperRef = useRef(null)

  const settings = {
    slidesPerView: 4,
    loop: true,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }

  const goToNextSlide = () => {
    //@ts-ignore
    if (swiperRef.current && swiperRef.current.swiper) {
      //@ts-ignore
      swiperRef.current.swiper.slideNext()
    }
  }

  const goToPrevSlide = () => {
    //@ts-ignore
    if (swiperRef.current && swiperRef.current.swiper) {
      //@ts-ignore
      swiperRef.current.swiper.slidePrev()
    }
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <Box>
              <Typography variant="h5">{title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Typography sx={{ color: themeColors.info }} variant="body1">
                  {`לכל המוצרים`}
                </Typography>
                <ArrowBackIosNewIcon
                  sx={{ color: themeColors.info, fontSize: '15px' }}
                />
              </Box>
            </Box>
            <Box sx={{ marginTop: 'auto', display: 'flex', gap: '15px' }}>
              <IconButton
                sx={{
                  bgcolor: '#F6F6F6',
                  borderRadius: themeSettings.borderRadius,
                  color: 'black',
                }}
                onClick={() => goToPrevSlide()}
              >
                <ArrowForwardIosOutlinedIcon />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: '#F6F6F6',
                  borderRadius: themeSettings.borderRadius,
                  color: 'black',
                }}
                onClick={() => goToNextSlide()}
              >
                <ArrowBackIosNewOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Swiper {...settings} ref={swiperRef}>
            {array?.map((element, index) => {
              return (
                <SwiperSlide key={index}>
                  <ProductCard product={element} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Products
