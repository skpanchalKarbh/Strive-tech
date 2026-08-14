'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { Media } from '@/components/Media'

export const ClientsSlider: React.FC<{ clients: any[] }> = ({ clients }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={2}
      speed={6000}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      loop={clients.length >= 2}
      breakpoints={{
        576: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        992: { slidesPerView: 5 },
      }}
      style={{ padding: '0', width: '100%' }}
      className="mil-client-swiper"
    >
      {clients.map((client, index) => (
        <SwiperSlide key={index} className="mil-client-logo-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120px', borderRight: '1px solid #e2e8f0' }}>
          {client.logo && (
            <Media resource={client.logo} />
          )}
        </SwiperSlide>
      ))}
      <style>{`
        .mil-client-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
        .mil-client-logo-wrapper img {
          max-height: 70px !important;
          max-width: 95% !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
        }
      `}</style>
    </Swiper>
  )
}
