import React from 'react'
import { Media } from '@/components/Media'
import Link from "next/link"
import type { CallToActionBlock as CallToActionBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const CallToActionBlock: React.FC<CallToActionBlockProps> = ({
  bgImage,
  icon,
  badge,
  title,
  description,
  button1_text,
  button1_url,
  button2_text,
  button2_url,
}) => {
  return (
    <div className="mil-section mil-p-10-10">
      {bgImage && (
        <Media
          resource={bgImage}
          imgClassName="mil-bg-img mil-scale-img"
        />
      )}
      <div className="mil-overlay mil-side-gradient"></div>
      <div className="container">
        <div className="row mil-aie">
          <div className="col-lg-8">
            {icon && (
              <div className="mil-icon mil-c-m-4 mil-mb-2">
                <Media resource={icon} />
              </div>
            )}
            {badge && (
              <p className="mil-c-m-3 mil-mb-4 mil-t-16">{badge}</p>
            )}
            {title && (
              <h2
                className="mil-h1 mil-c-m-4 mil-mb-4"
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
              />
            )}
            {description && (
              <p
                className="mil-c-m-3 mil-mb-4"
                style={{ fontSize: '20px', opacity: 0.9, fontWeight: 600 }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
              />
            )}
            <div className="mil-divider mil-mb-4"></div>
            {button1_text && button1_url && (
              <Link
                href={button1_url}
                className="mil-cta-dark-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '15px',
                  background: 'linear-gradient(135deg, #05121e, #021a30)',
                  color: '#ffffff', padding: '5px 5px 5px 25px',
                  borderRadius: '40px', fontWeight: 600, fontSize: '15px',
                  textDecoration: 'none', transition: 'transform 0.3s ease',
                  boxShadow: '0 10px 20px rgba(2,26,48,0.3)',
                  marginRight: '16px',
                }}
              >
                <span>{button1_text}</span>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00aeef, #3b82f6)',
                  color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <i className="fas fa-arrow-right"></i>
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
      <style>{`
        .mil-cta-dark-btn:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  )
}