import React, { FC, useRef } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { SwiperOptions } from 'swiper/types'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

interface SliderSectionProps {
  title: string
  toShow: number
  column: number
}

const Partners: FC<SliderSectionProps> = ({
  title,
  toShow = 5,
  column = 1,
}) => {
  const swiperRef = useRef<null>(null)
  const params = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    slidesPerView: toShow,
    onSwiper: (swiper: any) => {
      swiperRef.current = swiper
    },
    breakpoints: {
      1400: {
        slidesPerView: 5,
        slidesPerColumn: 1,
      },
      1000: {
        slidesPerView: 5,
        slidesPerColumn: 1,
      },
      600: {
        slidesPerView: 2,
        slidesPerColumn: 1,
      },
      0: {
        slidesPerView: 2,
        slidesPerColumn: 1,
      },
    },
  }
  const medias = Array.from({ length: 18 }, (_, index) => index)

  return (
    <div
      className="products-sale product-list cat-list"
      style={{ width: '100%', maxWidth: '100%' }}
    >
      <div className="title-wrapper">
        <h1 className="title">{title && <span>{title}</span>}</h1>
      </div>
      <div
        className="items images images-slider images-slider-cont"
        style={{ height: '100px' }}
      >
        <Swiper {...params}>
          {medias?.map((element, index) => {
            return (
              <SwiperSlide key={index} className="product-item">
                <div
                  key={index}
                  className="item"
                  style={{ maxHeight: '100px' }}
                >
                  <div className="wrapper">
                    <img
                      src={`https://almedimarket.com/src/img/home/manufacturers/${index + 1}.png`}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        {medias?.length > toShow && (
          <div className="swiper-navigation">
            <button
              className="swiper-nav prev"
              //@ts-ignore
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <span className="material-symbols-outlined">
                arrow_forward_ios
              </span>
            </button>
            <button
              className="swiper-nav next"
              //@ts-ignore
              onClick={() => swiperRef.current?.slideNext()}
            >
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Partners
