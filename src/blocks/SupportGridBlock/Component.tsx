import React from 'react'
import { Media } from '@/components/Media'
import type { SupportGridBlock as SupportGridBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const SupportGridBlock: React.FC<SupportGridBlockProps> = ({
  title,
  items,
}) => {
  return (
    <div className="mil-section mil-p-10-10">
      <div className="container">
        <div 
          className="mil-support-grid-card"
          style={{ 
            background: 'linear-gradient(135deg, #001a33 0%, #1a528a 100%)', 
            borderRadius: '20px', 
            padding: '60px',
            color: '#ffffff',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          {title && (
            <h2 
              className="mil-mb-5" 
              style={{ color: '#ffffff', fontSize: '36px', fontWeight: 'bold' }}
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }} 
            />
          )}
          
          <div className="row mil-support-row">
            {items?.map((item, index) => (
              <div 
                key={index} 
                className="col-md-4 mil-mb-4 mil-support-col"
              >
                {item.icon && (
                  <div className="mil-mb-3 mil-support-icon-wrapper" style={{ height: '60px', display: 'flex', alignItems: 'center' }}>
                    <Media resource={item.icon} imgClassName="mil-support-img" />
                  </div>
                )}
                {item.text && (
                  <h6 
                    style={{ fontSize: '18px', lineHeight: '1.4', color: '#ffffff', fontWeight: 600, maxWidth: '280px' }}
                    dangerouslySetInnerHTML={{ __html: sanitizeHTML(item.text) }} 
                  />
                )}
              </div>
            ))}
          </div>

          <style>{`
            .mil-support-img {
              max-height: 50px !important;
              width: auto !important;
              object-fit: contain;
              filter: brightness(0) invert(1);
            }
            .mil-support-col {
              padding-right: 30px;
              padding-left: 30px;
              position: relative;
              margin-bottom: 50px !important;
            }
            .mil-support-col::after {
              content: '';
              position: absolute;
              right: 0;
              top: 10%;
              height: 80%;
              width: 1px;
              background-color: rgba(255, 255, 255, 0.2);
            }
            .mil-support-col:nth-child(3n)::after {
              display: none;
            }
            @media (max-width: 768px) {
              .mil-support-col::after {
                display: none;
              }
              .mil-support-col {
                padding-left: 15px;
                padding-right: 15px;
              }
              .mil-support-grid-card {
                padding: 40px 20px !important;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}
