import React from 'react'
import { Media } from '@/components/Media'
import type { AboutUsPremiumBlock as AboutUsPremiumBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'
import { TabsClient } from './TabsClient'

export const AboutUsPremiumBlock: React.FC<AboutUsPremiumBlockProps> = ({
  badge,
  title,
  description_1,
  description_2,
  image_back,
  image_front,
  award_icon,
  award_text,
  tabs,
  phone_text,
  phone_number,
}) => {
  return (
    <div className="mil-section mil-p-10-10 mil-bg-white" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="row mil-aic mil-jcsb">
          
          {/* Left Column - Images */}
          <div className="col-lg-6 mil-mb-5">
            <div className="mil-about-images-wrapper" style={{ position: 'relative', width: '100%', paddingBottom: '10%', paddingRight: '15%' }}>
              
              {/* Back Image */}
              {image_back && (
                <div className="mil-image-back" style={{ width: '90%', aspectRatio: '4/5', borderRadius: '30px', overflow: 'hidden', position: 'relative', zIndex: 1, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                  <Media resource={image_back} imgClassName="mil-about-img-cover" />
                </div>
              )}
              
              {/* Front Overlapping Image */}
              {image_front && (
                <div className="mil-image-front" style={{ position: 'absolute', bottom: '0', right: '0', width: '65%', aspectRatio: '4/3', borderRadius: '30px', overflow: 'hidden', zIndex: 2, border: '12px solid #ffffff', boxShadow: '0 15px 40px rgba(0,0,0,0.15)' }}>
                  <Media resource={image_front} imgClassName="mil-about-img-cover" />
                </div>
              )}
              
              {/* Premium Static Award Badge */}
              {award_icon && (
                <div className="mil-award-badge" style={{ position: 'absolute', top: '8%', right: '-5%', zIndex: 3, width: '130px', height: '130px', backgroundColor: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 15px 40px rgba(0,0,0,0.12)', border: '8px solid #f2f6f9' }}>
                  <div style={{ width: '60px', height: '60px' }}>
                    <Media resource={award_icon} imgClassName="mil-award-img" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="col-lg-5">
            <div className="mil-about-content">
              {badge && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ width: '30px', height: '2px', background: '#00aeef' }}></div>
                  <h6 style={{ color: '#00aeef', margin: 0, fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>{badge}</h6>
                </div>
              )}
              {title && (
                <h2 
                  className="mil-c-m-1 mil-mb-5" 
                  style={{ fontSize: '48px', fontWeight: 'bold', lineHeight: '1.2' }} 
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }} 
                />
              )}
              
              {description_1 && (
                <p 
                  className="mil-mb-4" 
                  style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--mil-accent)' }} 
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(description_1) }} 
                />
              )}
              
              {description_2 && (
                <p 
                  className="mil-c-m-2 mil-mb-5" 
                  style={{ fontSize: '15px', lineHeight: '1.8' }} 
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(description_2) }} 
                />
              )}

              {/* Tabs Widget */}
              {tabs && tabs.length > 0 && (
                <div className="mil-mb-5">
                  <TabsClient tabs={tabs} />
                </div>
              )}

              {/* Phone Widget */}
              {(phone_text || phone_number) && (
                <div className="mil-phone-widget" style={{ display: 'flex', alignItems: 'center', marginTop: '30px', padding: '20px 0', borderTop: '1px solid #edf1f5' }}>
                  <div className="mil-icon-phone mil-mr-4" style={{ width: '60px', height: '60px', backgroundColor: '#bdec20', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#001a33' }}>
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    {phone_text && <p style={{ fontSize: '14px', color: 'var(--mil-dark)', margin: '0 0 5px 0', fontWeight: 600 }}>{phone_text}</p>}
                    {phone_number && <h4 className="mil-c-m-1" style={{ color: '#00b4d8', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{phone_number}</h4>}
                  </div>
                </div>
              )}
              
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .mil-bg-white {
          background-color: #ffffff;
        }
        .mil-about-img-cover {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        .mil-award-img {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain;
        }
        @media (max-width: 991px) {
          .mil-about-images-wrapper {
            padding-right: 0 !important;
            padding-bottom: 20% !important;
            margin-bottom: 50px;
          }
          .mil-image-back {
            width: 100% !important;
          }
          .mil-image-front {
            width: 80% !important;
            border-width: 10px !important;
          }
          .mil-award-badge {
            top: 0 !important;
            right: 0 !important;
            width: 120px !important;
            height: 120px !important;
          }
        }
      `}</style>
    </div>
  )
}
