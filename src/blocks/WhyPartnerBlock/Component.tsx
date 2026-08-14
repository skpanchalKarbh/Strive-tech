import React from 'react'
import { Media } from '@/components/Media'
import type { WhyPartnerBlock as WhyPartnerBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const WhyPartnerBlock: React.FC<WhyPartnerBlockProps> = ({
  title,
  background_image,
  features,
}) => {
  return (
    <div className="mil-section mil-p-10-8 mil-relative" style={{ overflow: 'hidden', backgroundColor: '#ffffff' }}>
      {/* Optional Background Element */}
      {background_image && (
        <div className="mil-bg-image-wrapper" style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', zIndex: 0, opacity: 0.1 }}>
          <Media resource={background_image} imgClassName="mil-bg-img-cover" />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, #ffffff 0%, transparent 100%)' }}></div>
        </div>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row mil-aic">
          {/* Left Column: Title */}
          <div className="col-lg-5 mil-mb-8">
            <div className="mil-text-wrapper" style={{ paddingRight: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 15px', background: '#ffffff', borderRadius: '30px', border: '1px solid #eef3f7', boxShadow: '0 5px 15px rgba(0,0,0,0.03)', marginBottom: '20px' }}>
                <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%' }}></div>
                <h6 style={{ color: '#64748b', margin: 0, fontSize: '12px', fontWeight: 600 }}>Why Us</h6>
              </div>
              {title && (
                <h2 className="mil-c-m-1 mil-mb-5" style={{ fontSize: '42px', fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }} />
              )}
              <div className="mil-divider mil-mb-5" style={{ width: '60px', height: '4px', backgroundColor: 'var(--mil-accent)' }}></div>
              <p className="mil-c-m-2" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                We provide tailored, scalable, and dedicated solutions to ensure your business reaches its full potential. Partnering with us gives you a strategic advantage.
              </p>
            </div>
          </div>

          {/* Right Column: Feature List */}
          <div className="col-lg-7">
            <div className="row">
              {features?.map((feature, index: number) => (
                <div key={index} className="col-md-6 mil-mb-4">
                  <div 
                    className="mil-partner-list-item" 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start',
                      padding: '25px', 
                      borderRadius: '16px', 
                      backgroundColor: '#f9fbfd', 
                      border: '1px solid #edf1f5',
                      height: '100%',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {feature.icon && (
                      <div 
                        className="mil-partner-icon-box" 
                        style={{ 
                          flexShrink: 0, 
                          width: '70px', 
                          height: '70px', 
                          backgroundColor: '#ffffff', 
                          borderRadius: '12px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          boxShadow: '0 5px 15px rgba(0,0,0,0.06)',
                          marginRight: '20px',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <Media resource={feature.icon} imgClassName="mil-icon-small" />
                      </div>
                    )}
                    <div style={{ flex: 1, paddingTop: '5px' }}>
                      {feature.description && (
                        <h6 
                          className="mil-c-m-1"
                          style={{ fontSize: '16px', lineHeight: '1.6', fontWeight: 600, margin: 0 }}
                          dangerouslySetInnerHTML={{ __html: sanitizeHTML(feature.description) }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mil-bg-img-cover {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        .mil-icon-small {
          width: 45px !important;
          height: auto !important;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .mil-partner-list-item:hover {
          background-color: #ffffff !important;
          box-shadow: 0 15px 35px rgba(0,0,0,0.06);
          border-color: #ffffff !important;
          transform: translateY(-5px);
        }
        .mil-partner-list-item:hover .mil-partner-icon-box {
          background-color: var(--mil-accent) !important;
        }
        .mil-partner-list-item:hover .mil-icon-small {
          transform: scale(1.15);
        }
      `}</style>
    </div>
  )
}
