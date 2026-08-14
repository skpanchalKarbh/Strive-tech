'use client';

import React, { useRef, useEffect } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Media } from '@/components/Media'
import { HeroCarouselOneSwiper } from "./HeroCarouselOne"
import { HeroCarouselTwoSwiper } from "./HeroCarouselTwo"
import Link from "next/link"
import type { HeroFiveBlock as HeroFiveBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const HeroFiveBlock: React.FC<HeroFiveBlockProps> = ({
  icon,
  subtitle,
  slides,
  description,
  button1_text,
  button1_url,
  button2_text,
  button2_url,
}) => {
  const imageSwiperRef = useRef<SwiperType | null>(null);  // Ref for image Swiper
  const titleSwiperRef = useRef<SwiperType | null>(null);  // Ref for title Swiper

  useEffect(() => {
    // Sync refs once both Swipers are ready
    if (imageSwiperRef.current && titleSwiperRef.current) {
      imageSwiperRef.current.controller.control = titleSwiperRef.current;
      titleSwiperRef.current.controller.control = imageSwiperRef.current;
    }
  }, []);  // Run once on mount

  const handleImageSwiper = (swiper: SwiperType) => {
    imageSwiperRef.current = swiper;
  };

  const handleTitleSwiper = (swiper: SwiperType) => {
    titleSwiperRef.current = swiper;
  };

  return (
    <div className="mil-hero-5" id="top">
      <HeroCarouselOneSwiper items={slides} onSwiper={handleImageSwiper} />
      <div className="mil-overlay"></div>
      <div className="mil-hero-content">
        <div className="mil-container mil-tac">
          {icon && (
            <div className="mil-icon mil-c-m-4 mil-mb-2 mil-ml-auto mil-mr-auto">
              <Media resource={icon} />
            </div>
          )}
          {subtitle && <p className="mil-c-m-3 mil-mb-3 mil-t-16">{subtitle}</p>}
          <HeroCarouselTwoSwiper items={slides} onSwiper={handleTitleSwiper} />
          {description && (
            <p className="mil-c-m-3 mil-mb-4 mil-tac mil-t-16" dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }} />
          )}
          <div className="mil-divider mil-mb-4 mil-ml-auto mil-mr-auto"></div>
          <div>
            {button1_text && button1_url && (
              <Link href={button1_url} className="mil-btn mil-mr-4" style={{ background: '#021a30', color: '#ffffff', borderRadius: '40px', padding: '10px 10px 10px 30px', display: 'inline-flex', alignItems: 'center', gap: '20px', fontWeight: 600 }}>
                <span>{button1_text}</span>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #00aeef)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="far fa-arrow-right" style={{ color: '#ffffff', fontSize: '16px', margin: 0 }}></i>
                </div>
              </Link>
            )}
            {button2_text && button2_url && (
              <Link href={button2_url} className="mil-btn mil-link-type">
                <span>{button2_text}</span>
                <i className="far fa-arrow-right"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="mil-slider-nav">
        <div className="mil-slider-btn mil-prev mil-hero-slider-prev">
          <i className="far fa-arrow-left"></i>
        </div>
        <div className="mil-hero-slider-pagination"></div>
        <div className="mil-slider-btn mil-next mil-hero-slider-next">
          <i className="far fa-arrow-right"></i>
        </div>
      </div>
    </div>
  )
}