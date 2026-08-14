import React from 'react'
import Link from 'next/link'
import type { ServicesBlock as ServicesBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const ServicesBlock: React.FC<ServicesBlockProps> = ({
  badge,
  title,
  description,
  button_text,
  button_url,
  services,
}) => {
  return (
    <div className="mil-section" style={{ padding: '120px 0', background: 'linear-gradient(180deg, #021a30 0%, #010c17 100%)' }}>
      <div className="container">
        
        {/* Section Header */}
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
                  style={{ fontSize: '16px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', maxWidth: '450px' }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
                />
              )}
              {button_text && button_url && (
                <Link href={button_url} className="mil-btn mil-link-type" style={{ color: '#00aeef', fontWeight: 700 }}>
                  <span>{button_text}</span>
                  <i className="far fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="row">
          {services?.map((service, index) => (
            <div key={index} className="col-md-6 col-xl-3 mil-mb-4">
              <div className="mil-premium-service-card mil-up" style={{ transitionDelay: `${index * 0.1}s` }}>
                
                {/* Top Image Container */}
                <div className="mil-card-image-container">
                  {(service as any).image && (
                    <Media resource={(service as any).image} fill imgClassName="mil-card-bg-img" />
                  )}
                </div>

                {/* Card Text Content */}
                <div className="mil-card-content">
                  {service.title && (
                    <h3 className="mil-service-title" dangerouslySetInnerHTML={{ __html: sanitizeHTML(service.title) }} />
                  )}

                  {service.description && (
                    <p className="mil-service-desc" dangerouslySetInnerHTML={{ __html: sanitizeHTML(service.description) }} />
                  )}

                  {service.button_text && service.button_url && (
                    <Link href={service.button_url} className="mil-service-btn">
                      <span>{service.button_text}</span>
                    </Link>
                  )}
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoped Styles for the Premium Cards */}
      <style>{`
        .mil-premium-service-card {
          background: #11141a;
          border-radius: 24px;
          padding: 16px; 
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          z-index: 1;
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          overflow: hidden;
        }

        /* Ambient Glow Effect */
        .mil-premium-service-card::before {
          content: "";
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 120px;
          background: radial-gradient(ellipse, rgba(0, 174, 239, 0.55) 0%, rgba(0,0,0,0) 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 0;
        }

        .mil-premium-service-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 174, 239, 0.2);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        .mil-premium-service-card:hover::before {
          opacity: 1;
        }

        .mil-card-image-container {
          width: 100%;
          height: 220px;
          border-radius: 18px;
          position: relative;
          overflow: hidden;
          background: #1c2128;
          margin-bottom: 25px;
          z-index: 1;
        }

        /* Light Ray Effect overlay */
        .mil-card-image-container::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, rgba(255,255,255,0) 60%);
          pointer-events: none;
          z-index: 2;
          transform: translateY(-10%);
          transition: transform 0.6s ease;
        }

        .mil-premium-service-card:hover .mil-card-image-container::after {
          transform: translateY(10%);
        }

        .mil-card-bg-img {
          object-fit: cover !important;
          opacity: 0.5;
          transition: transform 0.6s ease, opacity 0.6s ease;
        }

        .mil-premium-service-card:hover .mil-card-bg-img {
          transform: scale(1.08);
          opacity: 0.7;
        }

        /* Frosted Glass Icon Wrapper */
        .mil-card-icon-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 85px;
          height: 85px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 22px; /* Smooth rounded square */
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2), inset 0 0 15px rgba(255,255,255,0.05);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .mil-premium-service-card:hover .mil-card-icon-wrapper {
          background: rgba(255,255,255,0.15);
          transform: translate(-50%, -50%) scale(1.05);
          border-color: rgba(255,255,255,0.35);
          box-shadow: 0 15px 35px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.1);
        }

        .mil-service-icon-img {
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.95;
          transition: opacity 0.3s ease;
        }
        
        .mil-premium-service-card:hover .mil-service-icon-img {
          opacity: 1;
        }

        .mil-card-content {
          padding: 0 12px 12px 12px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          z-index: 1;
        }

        .mil-service-title {
          color: #ffffff;
          font-weight: 700;
          font-size: 22px;
          line-height: 1.3;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
          transition: color 0.3s ease;
        }

        .mil-premium-service-card:hover .mil-service-title {
          color: #00aeef;
        }

        .mil-service-desc {
          color: #8c939e;
          font-size: 14.5px;
          line-height: 1.6;
          margin-bottom: 25px;
          flex-grow: 1;
        }

        .mil-service-btn {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          padding: 9px 24px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 30px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .mil-premium-service-card:hover .mil-service-btn {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255,255,255,0.2);
        }
      `}</style>
    </div>
  )
}
