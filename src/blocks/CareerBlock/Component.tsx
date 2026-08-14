import React from 'react'
import { Media } from '@/components/Media'
import Link from "next/link";
import type { CareerBlock as CareerBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const CareerBlock: React.FC<CareerBlockProps> = ({
  image,
  title,
  description,
  button_text,
  button_url,
}) => {
  return (
    <div className="mil-section mil-p-10-8" style={{ backgroundColor: '#f8fbfc', padding: '100px 0' }}>
      <div className="container">
        <div className="row mil-jcb mil-aic">

          {/* Left Side: Image */}
          <div className="col-lg-6 mil-mb-10">
            {image && (
              <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                <Media
                  resource={image}
                  imgClassName="mil-career-img"
                />
              </div>
            )}
          </div>

          {/* Right Side: Text Content */}
          <div className="col-lg-5 mil-mb-10">

            {/* Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '30px', height: '2px', background: '#00aeef' }}></div>
              <h6 style={{ color: '#00aeef', margin: 0, fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>OUR MISSION</h6>
            </div>

            {/* Title */}
            {title && (
              <h2
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
                style={{ color: '#021a30', fontSize: '42px', fontWeight: 700, marginBottom: '24px', lineHeight: '1.2' }}
              />
            )}

            {/* Description */}
            {description && (
              <p
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
                style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.8', marginBottom: '36px' }}
              />
            )}

            {/* Button Row */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              {button_text && button_url ? (
                <Link
                  href={button_url}
                  className="mil-career-btn"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '15px',
                    background: 'linear-gradient(135deg, #05121e, #021a30)',
                    color: '#ffffff', padding: '5px 5px 5px 25px',
                    borderRadius: '40px', fontWeight: 600, fontSize: '15px',
                    textDecoration: 'none', transition: '0.3s ease',
                    boxShadow: '0 10px 20px rgba(2,26,48,0.2)'
                  }}
                >
                  <span>{button_text}</span>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00aeef, #3b82f6)',
                    color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </Link>
              ) : (
                <Link
                  href="#"
                  className="mil-career-btn"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '15px',
                    background: 'linear-gradient(135deg, #05121e, #021a30)',
                    color: '#ffffff', padding: '5px 5px 5px 25px',
                    borderRadius: '40px', fontWeight: 600, fontSize: '15px',
                    textDecoration: 'none', transition: '0.3s ease',
                    boxShadow: '0 10px 20px rgba(2,26,48,0.2)'
                  }}
                >
                  <span>Know More</span>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00aeef, #3b82f6)',
                    color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </Link>
              )}

              {/* Helper text */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8c939e', fontSize: '13px' }}>
                <i className="fal fa-check" style={{ color: '#10b981' }}></i>
                <span>No obligation, just a conversation</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <style>{`
        .mil-career-img {
          width: 100% !important;
          height: auto !important;
          object-fit: cover !important;
          display: block !important;
        }
        .mil-career-btn:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  )
}
