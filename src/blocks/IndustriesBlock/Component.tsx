import React from 'react'
import { Media } from '@/components/Media'
import type { IndustriesBlock as IndustriesBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const IndustriesBlock: React.FC<IndustriesBlockProps> = ({
  title,
  industries,
}) => {
  return (
    <div className="mil-section mil-p-10-8" style={{ background: 'linear-gradient(135deg, #001a33 0%, #1a528a 100%)' }}>
      <div className="container">
        {title && (
          <h2 className="mil-tac mil-mb-8" style={{ color: '#ffffff', fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }} />
        )}
        
        <div className="row">
          {industries?.map((industry: any, index: number) => (
            <div key={index} className="col-md-6 col-lg-4 mil-mb-4">
              <div 
                className="mil-industry-card" 
                style={{ 
                  height: '100%', 
                  maxWidth: '350px',
                  margin: '0 auto',
                  padding: '40px 30px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'all 0.4s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                {industry.icon && (
                  <div className="mil-mb-4 mil-industry-icon-wrapper" style={{ transition: 'transform 0.4s ease' }}>
                    <Media resource={industry.icon} imgClassName="mil-industry-icon" />
                  </div>
                )}
                {industry.title && (
                  <h6 style={{ color: '#ffffff', fontWeight: 600, fontSize: '18px', lineHeight: '1.4', margin: 0 }}>
                    {industry.title}
                  </h6>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .mil-industry-icon {
          height: 75px !important;
          width: auto !important;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .mil-industry-card:hover {
          background-color: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .mil-industry-card:hover .mil-industry-icon-wrapper {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  )
}
