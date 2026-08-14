import React from 'react'
import { Media } from '@/components/Media'
import Link from 'next/link'
import type { FeaturesTwoBlock as FeaturesTwoBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const FeaturesTwoBlock: React.FC<FeaturesTwoBlockProps> = ({
  badge,
  title,
  description,
  button_text,
  button_url,
  features,
}) => {
  return (
    <div className="mil-section" style={{ paddingTop: '100px', paddingBottom: '80px', backgroundColor: '#ffffff' }}>
      <div className="container">
        <div className="row mil-aie mil-mb-10">
          <div className="col-12 col-md-6 mil-sm-mb-4 mil-up">
            {badge && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 15px', background: '#ffffff', borderRadius: '30px', border: '1px solid #eef3f7', boxShadow: '0 5px 15px rgba(0,0,0,0.03)', marginBottom: '20px' }}>
                <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%' }}></div>
                <h6 style={{ color: '#64748b', margin: 0, fontSize: '12px', fontWeight: 600 }}>{badge}</h6>
              </div>
            )}
            {title && (
              <h2 className="mil-mb-0" style={{ color: '#1a1a1a', fontWeight: 800 }} dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }} />
            )}
          </div>
          <div className="col-12 col-md-6 mil-up">
            <div className="mil-flex-column mil-jce mil-aie mil-sm-ais">
              {description && (
                <p
                  className="mil-c-m-2 mil-t-14 mil-mb-3 mil-tar"
                  style={{ color: '#666', fontSize: '16px', lineHeight: '1.7', maxWidth: '450px' }}
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
        <div className="row">
          {features?.map((feature, index) => (
            <div key={index} className="col-md-4 mil-mb-4">
              <div className="mil-premium-feature-card">
                {feature.icon && (
                  <div className="mil-premium-feature-icon-wrapper">
                    <Media resource={feature.icon} imgClassName="mil-feature-icon-img" />
                  </div>
                )}
                {feature.title && <h6 className="mil-premium-feature-title">{feature.title}</h6>}
                {feature.description && (
                  <p
                    className="mil-premium-feature-desc"
                    dangerouslySetInnerHTML={{ __html: sanitizeHTML(feature.description) }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .mil-premium-feature-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 40px 30px;
          height: 100%;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          overflow: hidden;
        }

        .mil-premium-feature-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 174, 239, 0.3);
          box-shadow: 0 20px 40px rgba(0, 174, 239, 0.1);
        }

        .mil-premium-feature-icon-wrapper {
          width: 70px;
          height: 70px;
          background: rgba(0, 174, 239, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          transition: all 0.4s ease;
        }

        .mil-premium-feature-card:hover .mil-premium-feature-icon-wrapper {
          background: #00aeef;
          transform: scale(1.1) rotate(5deg);
        }

        .mil-feature-icon-img {
          width: 35px !important;
          height: 35px !important;
          object-fit: contain;
          transition: all 0.4s ease;
        }

        .mil-premium-feature-card:hover .mil-feature-icon-img {
          filter: brightness(0) invert(1);
        }

        .mil-premium-feature-title {
          color: #1a1a1a;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 15px;
          transition: color 0.3s ease;
        }

        .mil-premium-feature-card:hover .mil-premium-feature-title {
          color: #00aeef;
        }

        .mil-premium-feature-desc {
          color: #666;
          font-size: 15px;
          line-height: 1.7;
          margin: 0;
        }
      `}</style>
    </div>
  )
}
