'use client'

import React from 'react'
import { Media } from '@/components/Media'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const TestimonialsBlock: React.FC<any> = ({
  badge,
  title,
  description,
  testimonials,
}) => {
  return (
    <div className="mil-section mil-testimonials-section" style={{ background: 'linear-gradient(180deg, #010c17 0%, #021a30 100%)', padding: '120px 0' }}>
      <div className="container">
        
        {/* Header */}
        <div className="row mil-aie mil-mb-10">
          <div className="col-12 col-md-6 mil-sm-mb-4 mil-up">
            {badge && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 15px', background: '#ffffff', borderRadius: '30px', border: '1px solid #eef3f7', boxShadow: '0 5px 15px rgba(0,0,0,0.03)', marginBottom: '20px' }}>
                <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%' }}></div>
                <h6 style={{ color: '#64748b', margin: 0, fontSize: '12px', fontWeight: 600 }}>{badge}</h6>
              </div>
            )}
            {title && (
              <h2 className="mil-c-m-1 mil-mb-0" style={{ color: '#ffffff', fontWeight: 800, fontSize: '42px', letterSpacing: '-1px' }} dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }} />
            )}
          </div>
          <div className="col-12 col-md-6 mil-up">
            <div className="mil-flex-column mil-jce mil-aie mil-sm-ais">
              {description && (
                <p
                  className="mil-c-m-2 mil-t-14 mil-mb-3 mil-tar"
                  style={{ fontSize: '16px', lineHeight: '1.7', color: '#8c939e', maxWidth: '450px' }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Swiper Grid */}
        <div style={{ paddingTop: '50px' }}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={40}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.mil-testimonials-pagination' }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: '60px', paddingTop: '40px', overflow: 'visible' }}
          >
            {testimonials?.map((testimonial: any, index: number) => {
              const isEven = index % 2 !== 0;
              
              // Alternating styles to match the image precisely
              const radius = isEven ? '20px 70px 20px 70px' : '70px 20px 70px 20px';
              const shadowTop = isEven ? '-12px' : 'auto';
              const shadowBottom = isEven ? 'auto' : '-12px';
              const shadowLeft = isEven ? '-12px' : '-12px';

              return (
                <SwiperSlide key={index}>
                  <div className="mil-testimonial-wrapper mil-up" style={{ transitionDelay: `${index * 0.1}s` }}>
                    
                    {/* The Cyan Offset Background Shadow */}
                    <div className="mil-testimonial-shadow" style={{
                      borderRadius: radius,
                      top: shadowTop,
                      bottom: shadowBottom,
                      left: shadowLeft
                    }}></div>

                    {/* Main Dark Card */}
                    <div className="mil-testimonial-card-ui" style={{ borderRadius: radius }}>
                      
                      {/* Overlapping Avatar */}
                      <div className="mil-testimonial-avatar-wrapper">
                        {testimonial.authorAvatar ? (
                          <Media resource={testimonial.authorAvatar} fill imgClassName="mil-avatar-img" />
                        ) : (
                          <div className="mil-avatar-placeholder">
                            <i className="fal fa-user"></i>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="mil-testimonial-content">
                        {testimonial.authorName && (
                          <h4 className="mil-client-name">{testimonial.authorName}</h4>
                        )}
                        
                        {testimonial.authorRole && (
                          <p className="mil-client-role">{testimonial.authorRole}</p>
                        )}
                        
                        <div className="mil-quote-icon">
                          <i className="fas fa-quote-left"></i>
                        </div>

                        {testimonial.text && (
                          <p
                            className="mil-client-text"
                            dangerouslySetInnerHTML={{ __html: sanitizeHTML(testimonial.text) }}
                          />
                        )}
                      </div>
                      
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="mil-testimonials-pagination mil-tac"></div>
        </div>
      </div>

      <style>{`
        /* Swiper Overrides to prevent clipping */
        .swiper {
          overflow: visible !important;
          clip-path: inset(-100px -100px -100px -100px);
        }
        
        .mil-testimonial-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 0 10px;
        }

        .mil-testimonial-shadow {
          position: absolute;
          width: calc(100% - 20px);
          height: 100%;
          background: #00aeef;
          z-index: 0;
          transition: all 0.4s ease;
        }

        .mil-testimonial-card-ui {
          position: relative;
          background: #2a2d34; /* Dark grey */
          width: 100%;
          height: 100%;
          padding: 50px 30px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 1;
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
          transition: transform 0.4s ease;
        }

        .mil-testimonial-wrapper:hover .mil-testimonial-card-ui {
          transform: translateY(-5px);
        }

        .mil-testimonial-avatar-wrapper {
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 5px solid #2a2d34; /* Matches card bg so it cuts into the top edge cleanly */
          background: #111;
          overflow: hidden;
          z-index: 2;
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }

        .mil-avatar-img {
          object-fit: cover !important;
          width: 100%;
          height: 100%;
        }

        .mil-avatar-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a1c20;
          color: #8c939e;
          font-size: 24px;
        }

        .mil-testimonial-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 10px;
        }

        .mil-client-name {
          color: #ffffff;
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 2px;
          letter-spacing: 0.5px;
        }

        .mil-client-role {
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          font-style: italic;
          margin-bottom: 20px;
        }

        .mil-quote-icon {
          color: #00aeef;
          font-size: 24px;
          margin-bottom: 15px;
        }

        .mil-client-text {
          color: #b4bac5;
          font-size: 14.5px;
          line-height: 1.7;
          margin: 0;
        }

        /* Pagination Dots override for dark theme */
        .mil-testimonials-pagination .swiper-pagination-bullet {
          background: rgba(255,255,255,0.2);
          opacity: 1;
        }
        .mil-testimonials-pagination .swiper-pagination-bullet-active {
          background: #00aeef;
        }
      `}</style>
    </div>
  )
}
