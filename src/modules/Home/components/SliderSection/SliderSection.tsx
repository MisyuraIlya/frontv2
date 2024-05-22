import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import useDataCategories from '../../../../hooks/useDataCategories'
import { themeColors, themeSettings } from '../../../../styles/mui'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'

const SliderSection = () => {
  const { data } = useDataCategories()
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
      <Box sx={{ display: 'flex', gap: '10px' }}>
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
        <Typography variant="h4">{'קטגוריות'}</Typography>
        <IconButton>
          <ArrowBackOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />
        </IconButton>
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <Swiper {...settings} ref={swiperRef}>
          {data?.['hydra:member']?.map((element, index) => {
            return (
              <SwiperSlide key={index}>
                <Card>
                  <CardActionArea>
                    <Box sx={{ height: '190px' }}>
                      <CardMedia
                        sx={{ objectFit: 'cover' }}
                        component="img"
                        image={`${process.env.REACT_APP_MEDIA + '/placeholder.jpg'}`}
                        alt={`${index}`}
                      />
                    </Box>
                    <CardContent
                      sx={{
                        backgroundColor: themeColors.primary,
                        color: 'white',
                        padding: '6px 12px',
                      }}
                    >
                      <Typography gutterBottom variant="h6">
                        {element?.title}
                      </Typography>
                      <Button
                        endIcon={<ArrowBackOutlinedIcon />}
                        sx={{ color: 'white' }}
                      >
                        לקטלוג
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
    </Box>
  )
}

export default SliderSection
