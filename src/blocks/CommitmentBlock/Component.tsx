import React from 'react'
import { Media } from '@/components/Media'
import Link from "next/link";
import type { CommitmentBlock as CommitmentBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const CommitmentBlock: React.FC<CommitmentBlockProps> = ({
  title,
  description,
  button_text,
  button_url,
  image,
  image_alignment = 'right',
}) => {
  return (
    <div className="mil-section mil-p-10-8" style={{ background: '#f8fbfc' }}>
      <div className="container">
        <div className="row mil-jcb mil-aic">
          
          {/* Left Side: Image and Floating Card */}
          <div className="col-lg-6 mil-mb-10">
            <div style={{ position: 'relative', width: '100%', height: '550px', borderRadius: '30px', zIndex: 1 }}>
              {image ? (
                <Media
                  resource={image}
                  imgClassName="mil-custom-commitment-img"
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#eef3f7', borderRadius: '30px' }}></div>
              )}
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="col-lg-5 mil-mb-10">
            
            {/* Badge / Subtitle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '30px', height: '2px', background: '#00aeef' }}></div>
              <h6 style={{ color: '#00aeef', margin: 0, fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>OUR MISSION</h6>
            </div>

            {/* Main Title */}
            {title && (
              <h2
                style={{ color: '#021a30', fontSize: '42px', fontWeight: 700, marginBottom: '30px', lineHeight: '1.2' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
              />
            )}

            {/* Description */}
            {description && (
              <div
                style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.7', marginBottom: '40px' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
              />
            )}

            {/* Actions Row */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              {button_text && button_url ? (
                <Link href={button_url} style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', background: 'linear-gradient(135deg, #05121e, #021a30)', color: '#ffffff', padding: '5px 5px 5px 25px', borderRadius: '40px', fontWeight: 600, fontSize: '15px', textDecoration: 'none', transition: '0.3s ease', boxShadow: '0 10px 20px rgba(2,26,48,0.2)' }} className="mil-hover-up">
                  <span>{button_text}</span>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #00aeef, #3b82f6)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </Link>
              ) : (
                <Link href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', background: 'linear-gradient(135deg, #05121e, #021a30)', color: '#ffffff', padding: '5px 5px 5px 25px', borderRadius: '40px', fontWeight: 600, fontSize: '15px', textDecoration: 'none', transition: '0.3s ease', boxShadow: '0 10px 20px rgba(2,26,48,0.2)' }} className="mil-hover-up">
                  <span>Know more</span>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #00aeef, #3b82f6)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </Link>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8c939e', fontSize: '13px' }}>
                <i className="fal fa-check" style={{ color: '#10b981' }}></i>
                <span>No obligation, just a conversation</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <style>{`
        .mil-custom-commitment-img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          border-radius: 30px !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
        }
        .mil-hover-up:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  )
}
