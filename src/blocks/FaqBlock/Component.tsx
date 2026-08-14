import React from 'react'
import { FaqList } from '@/components/FaqList'
import type { FaqBlock as FaqBlockProps } from '@/payload-types'
import Link from "next/link"
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const FaqBlock: React.FC<FaqBlockProps> = ({
  badge,
  title,
  description,
  button1_text,
  button1_url,
  button2_text,
  button2_url,
  faqs,
}) => {
  return (
    <div className="mil-section" style={{ backgroundColor: '#ffffff', padding: '120px 0' }}>
      <div className="container">
        <div className="row">
          {/* Left Sticky Column */}
          <div className="col-lg-5 mil-mb-5" style={{ position: 'sticky', top: '120px', alignSelf: 'flex-start' }}>
            <div style={{ paddingRight: '20px' }}>
              {badge && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 15px', background: '#ffffff', borderRadius: '30px', border: '1px solid #eef3f7', boxShadow: '0 5px 15px rgba(0,0,0,0.03)', marginBottom: '20px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%' }}></div>
                  <h6 style={{ color: '#64748b', margin: 0, fontSize: '12px', fontWeight: 600 }}>{badge}</h6>
                </div>
              )}
              {title && (
                <h2
                  className="mil-mb-4"
                  style={{ color: '#1a1a1a', fontWeight: 800 }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
                />
              )}
              
              {description && (
                <p
                  className="mil-t-16 mil-mb-4"
                  style={{ color: '#666', lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
                />
              )}
              
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '10px' }}>
                {button1_text && button1_url && (
                  <Link href={button1_url} className="mil-btn" style={{ background: 'linear-gradient(135deg, #010c17 0%, #021a30 100%)', color: '#ffffff', border: '1px solid rgba(0,174,239,0.3)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', transform: 'scale(0.9)', transformOrigin: 'left center', margin: '0' }}>
                    <span>{button1_text}</span>
                    <i className="far fa-arrow-right" style={{ color: '#ffffff' }}></i>
                  </Link>
                )}
                {button2_text && button2_url && (
                  <Link href={button2_url} className="mil-btn mil-link-type" style={{ color: '#1a1a1a' }}>
                    <span>{button2_text}</span>
                    <i className="far fa-arrow-right" style={{ color: '#00aeef', marginLeft: '8px' }}></i>
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Scrolling FAQ Column */}
          <div className="col-lg-5 offset-lg-2">
            <FaqList faqs={faqs || []} />
          </div>
        </div>
      </div>
    </div>
  )
}