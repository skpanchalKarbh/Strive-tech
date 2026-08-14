import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from "next/link";
import type { AboutUsTwoBlock as AboutUsTwoBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const AboutUsTwoBlock: React.FC<AboutUsTwoBlockProps> = ({
  badge,
  title,
  left_description,
  counter_value,
  counter_suffix,
  counter_title,
  right_description1,
  image,
  right_description2,
  timeline,
  right_description3,
  button1_text,
  button1_url,
  button2_text,
  button2_url,
}) => {
  return (
    <div className="mil-section" style={{ background: '#f8fbfc', padding: '120px 0' }}>
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Column: Image and Floating Card */}
          <div className="col-lg-5 mil-mb-5">
            <div style={{ position: 'relative', width: '100%', height: '550px', borderRadius: '30px', overflow: 'visible', zIndex: 1 }}>
              {image ? (
                <Media
                  resource={image}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#eef3f7', borderRadius: '30px' }}></div>
              )}

              {/* Floating Counter Card */}
              {counter_value && (
                <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: '#ffffff', padding: '20px 30px', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '15px', zIndex: 2 }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'linear-gradient(135deg, #3b82f6, #00aeef)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '20px' }}>
                    <i className="fal fa-user-friends"></i>
                  </div>
                  <div>
                    <h4 style={{ color: '#021a30', margin: 0, fontSize: '24px', fontWeight: 800 }}>{counter_value}</h4>
                    {counter_title && <p style={{ color: '#64748b', margin: 0, fontSize: '13px', fontWeight: 500 }}>{counter_title}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="col-lg-6 offset-lg-1 mil-mb-5">
            
            {/* Badge / Subtitle */}
            {badge && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '30px', height: '2px', background: '#00aeef' }}></div>
                <h6 style={{ color: '#00aeef', margin: 0, fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>{badge}</h6>
              </div>
            )}

            {/* Main Title */}
            {title && (
              <h2
                style={{ color: '#021a30', fontSize: '42px', fontWeight: 700, marginBottom: '30px', lineHeight: '1.2' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
              />
            )}

            {/* Description */}
            {left_description && (
              <div
                style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.7', marginBottom: '40px' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(left_description) }}
              />
            )}

            {/* Actions Row */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              {button1_text && button1_url ? (
                <Link href={button1_url} style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', background: 'linear-gradient(135deg, #05121e, #021a30)', color: '#ffffff', padding: '5px 5px 5px 25px', borderRadius: '40px', fontWeight: 600, fontSize: '15px', textDecoration: 'none', transition: '0.3s ease', boxShadow: '0 10px 20px rgba(2,26,48,0.2)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <span>{button1_text}</span>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #00aeef, #3b82f6)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </Link>
              ) : (
                <Link href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', background: 'linear-gradient(135deg, #05121e, #021a30)', color: '#ffffff', padding: '5px 5px 5px 25px', borderRadius: '40px', fontWeight: 600, fontSize: '15px', textDecoration: 'none', transition: '0.3s ease', boxShadow: '0 10px 20px rgba(2,26,48,0.2)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <span>Know more</span>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #00aeef, #3b82f6)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </Link>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8c939e', fontSize: '13px' }}>
                <i className="fal fa-check" style={{ color: '#10b981' }}></i>
                <span>{counter_suffix || 'No obligation, just a conversation'}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}