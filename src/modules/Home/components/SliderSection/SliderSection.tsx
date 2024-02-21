import React, { FC, useRef } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { SwiperOptions } from 'swiper/types'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { TailSpin } from 'react-loader-spinner'

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
    <div className="products-sale product-list cat-list">
      <div className="title-wrapper">
        <h1 className="title">{title && <span>{title}</span>}</h1>
        <div className="referal-cont">
          {/* <Link to={res.link}>
                        <p>{res.linkTitle}</p>
                    </Link> */}
        </div>
      </div>
      <div className="items images images-slider images-slider-cont">
        <Swiper {...params}>
          {array?.map((element, index) => {
            return (
              <SwiperSlide key={index} className="product-item">
                <div className={'wrapper'}>
                  <Link to={`/client/catalog/${element?.identify}/0/0?page=1`}>
                    <div className="img-cont">
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
                    </div>
                    <div className="prod-data-cont">
                      <h3 className="p-title">{element?.title}</h3>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        {array?.length > toShow && (
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
      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '180px',
          }}
        >
          <TailSpin height="40" width="40" color="black" visible={true} />
        </div>
      )}
    </div>
  )
}

export default SliderSection
