import React from 'react'
import { Media } from '@/components/Media'
import type { StaffingServicesBlock as StaffingServicesBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const StaffingServicesBlock: React.FC<StaffingServicesBlockProps> = ({
  badge,
  title,
  description,
  services_title,
  services,
}) => {
  return (
    <div className="mil-section" style={{ background: '#f8fbfc', padding: '100px 0' }}>
      <div className="container">
        
        {/* Top Header */}
        <div className="row align-items-center mil-mb-5" style={{ marginBottom: '60px' }}>
          <div className="col-lg-6">
            {badge && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 15px', background: '#ffffff', borderRadius: '30px', border: '1px solid #eef3f7', boxShadow: '0 5px 15px rgba(0,0,0,0.03)', marginBottom: '20px' }}>
                <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%' }}></div>
                <h6 style={{ color: '#64748b', margin: 0, fontSize: '12px', fontWeight: 600 }}>{badge}</h6>
              </div>
            )}
            {title && (
              <h2
                style={{ color: '#021a30', fontSize: '42px', fontWeight: 700, lineHeight: '1.2' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
              />
            )}
          </div>
          <div className="col-lg-5 offset-lg-1">
            {description && (
              <p
                style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.7', margin: 0, marginTop: '20px' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
              />
            )}
          </div>
        </div>

        {/* Separator Line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '50px' }}>
          {services_title && (
            <h3 style={{ color: '#021a30', margin: 0, fontSize: '24px', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {services_title}
            </h3>
          )}
          <div style={{ flex: 1, height: '1px', background: '#eef3f7' }}></div>
          {services && services.length > 0 && (
            <div style={{ padding: '4px 15px', background: '#ffffff', border: '1px solid #eef3f7', borderRadius: '20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
              {services.length} offerings
            </div>
          )}
        </div>

        {/* Services Grid */}
        <div className="row">
          {services?.map((service, index) => {
            const num = (index + 1).toString().padStart(2, '0');
            return (
              <div key={index} className="col-md-6 col-lg-3 mil-mb-4" style={{ marginBottom: '30px' }}>
                <div style={{ background: '#ffffff', borderRadius: '20px', padding: '30px 25px', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(238,243,247,0.5)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
                    {service.icon && (
                      <div style={{ width: '55px', height: '55px', minWidth: '55px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Media resource={service.icon} imgClassName="mil-staffing-icon-new" />
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
        .mil-staffing-icon-new {
          width: 48px !important;
          height: 48px !important;
          object-fit: contain !important;
        }
      `}</style>
    </div>
  )
}
