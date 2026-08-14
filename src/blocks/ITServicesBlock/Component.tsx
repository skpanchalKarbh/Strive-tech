import React from 'react'
import { Media } from '@/components/Media'
import type { ITServicesBlock as ITServicesBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const ITServicesBlock: React.FC<ITServicesBlockProps> = ({
  title,
  services,
}) => {
  return (
    <div className="mil-section" style={{ background: '#f8fbfc', padding: '100px 0' }}>
      <div className="container">
        
        {/* Top Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 15px', background: '#ffffff', borderRadius: '30px', border: '1px solid #eef3f7', boxShadow: '0 5px 15px rgba(0,0,0,0.03)', marginBottom: '20px' }}>
            <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%' }}></div>
            <h6 style={{ color: '#64748b', margin: 0, fontSize: '12px', fontWeight: 600 }}>What we build</h6>
          </div>
          
          {title && (
            <h2
              style={{ color: '#021a30', fontSize: '42px', fontWeight: 700, marginBottom: '20px', lineHeight: '1.2' }}
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
            />
          )}
          
          <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
            Technology partners for every stage of growth — from strategy to launch, and everything that keeps it running.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="row">
          {services?.map((service, index: number) => {
            const num = (index + 1).toString().padStart(2, '0');
            return (
              <div key={index} className="col-md-6 col-lg-3 mil-mb-4" style={{ marginBottom: '30px' }}>
                <div style={{ background: '#ffffff', borderRadius: '20px', padding: '30px 25px', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(238,243,247,0.5)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
                    {service.icon && (
                      <div style={{ width: '48px', height: '48px', minWidth: '48px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Media resource={service.icon} imgClassName="mil-it-icon-new" />
                      </div>
                    )}
                    <div style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: 600 }}>
                      {num}
                    </div>
                  </div>

                  {service.title && (
                    <h5 style={{ color: '#021a30', fontSize: '18px', fontWeight: 700, marginBottom: '15px', lineHeight: '1.4' }}>
                      {service.title}
                    </h5>
                  )}

                  {service.description && (
                    <div 
                      style={{ color: '#8c939e', fontSize: '14px', lineHeight: '1.6' }}
                      dangerouslySetInnerHTML={{ __html: sanitizeHTML(service.description) }}
                    />
                  )}
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .mil-it-icon-new {
          width: 48px !important;
          height: 48px !important;
          object-fit: contain !important;
        }
      `}</style>
    </div>
  )
}
