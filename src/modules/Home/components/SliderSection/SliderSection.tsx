import React, { FC, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Box, Typography } from '@mui/material'

interface SliderSectionProps {
  title: string
  array: any[]
  toShow: number
  column: number
  loading: boolean
}

const SliderSection: FC<SliderSectionProps> = ({
  title,
  array,
  toShow = 5,
  column = 1,
  loading,
}) => {
  const swiperRef = useRef<null>(null)
  const params = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 30,
    slidesPerView: toShow,
    onSwiper: (swiper: any) => {
      swiperRef.current = swiper
    },
    breakpoints: {
      1400: {
        slidesPerView: 6,
        slidesPerColumn: 1,
      },
      1000: {
        slidesPerView: 6,
        slidesPerColumn: 1,
      },
      600: {
        slidesPerView: 6,
        slidesPerColumn: 1,
      },
      0: {
        slidesPerView: 6,
        slidesPerColumn: 1,
      },
    },
  }
  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      <Box>
        <Swiper {...params}>
          {array?.map((element, index) => {
            return (
              <SwiperSlide key={index}>
                <Box>
                  <Link to={`/client/catalog/${element?.identify}/0/0?page=1`}>
                    <Box>
                      <img
                        className="img"
                        src={
                          element?.MediaObject?.filePath
                            ? process.env.REACT_APP_MEDIA +
                              '/category/' +
                              element?.MediaObject?.filePath
                            : process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                        }
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontSize={16}>
                        {element?.title}
                      </Typography>
                    </Box>
                  </Link>
                </Box>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
    </Box>
  )
}

export default SliderSection
