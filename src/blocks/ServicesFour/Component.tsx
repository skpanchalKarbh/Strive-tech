import React from 'react'
import { Media } from '@/components/Media'
import Link from "next/link"
import type { ServicesFourBlock as ServicesFourBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const ServicesFourBlock: React.FC<ServicesFourBlockProps> = ({
  badge,
  title,
  description,
  button_text,
  button_url,
  bgImage,
  services,
}) => {
  return (
    <div className="mil-section mil-gray-section mil-p-10-0">
      <style>{`
        .mil-hover-bg-card .mil-service-bg {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .mil-hover-bg-card:hover .mil-service-bg {
          opacity: 1;
        }
        .mil-hover-bg-card:hover h5 {
          color: #fff !important;
        }
        .mil-hover-bg-card:hover p {
          color: rgba(255,255,255,0.7) !important;
        }
        .mil-hover-bg-card:hover .mil-btn {
          color: #fff !important;
        }
        .mil-hover-bg-card:hover i {
          color: #fff !important;
        }
      `}</style>
      <div className="container">
        <div className="row mil-aie mil-mb-10">
          <div className="col-12 col-md-6 mil-sm-mb-4">
            {badge && <div className="mil-badge mil-mb-4">{badge}</div>}
            {title && (
              <h2
                className="mil-c-m-1"
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
              />
            )}
          </div>
          <div className="col-12 col-md-6">
            <div className="mil-flex-column mil-jce mil-aie mil-sm-ais">
              {description && (
                <p className="mil-c-m-2 mil-t-14 mil-mb-3" dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }} />
              )}
              {button_text && button_url && (
                <Link href={button_url} className="mil-btn mil-link-type mil-dark">
                  <span>{button_text}</span>
                  <i className="far fa-arrow-right"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mil-services-frame">
        {bgImage && (
          <Media
            resource={bgImage}
            imgClassName="mil-bg-img mil-scale-img"
            data-value-1="1.1"
            data-value-2="1"
          />
        )}
        <div className="container-fluid g-0">
          <div className="row g-0">
            {services?.map((service, index) => (
              <div key={index} className="col-sm-6 col-xl-3">
                {service.url && (
                  <Link href={service.url} className="mil-service-card mil-type-1 mil-hover-bg-card" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {service.image && (
                      <div className="mil-service-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                        <Media resource={service.image} imgClassName="mil-card-bg" />
                        <div className="mil-overlay" style={{ opacity: 0.8, backgroundColor: '#1e1e1e', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></div>
                      </div>
                    )}
                    <div className="mil-card-text" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div className="mil-mb-3" style={{ alignSelf: 'flex-start' }}>
                        {service.icon ? (
                          <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Media resource={service.icon} imgClassName="mil-service-icon" />
                          </div>
                        ) : (
                          <i className="fal fa-plus"></i>
                        )}
                      </div>
                      {service.title && (
                        <h5
                          className="mil-mb-2 mil-c-m-1"
                          style={{ transition: 'color 0.4s ease' }}
                          dangerouslySetInnerHTML={{ __html: sanitizeHTML(service.title) }}
                        />
                      )}
                      {service.description && (
                        <p
                          className="mil-t-16 mil-c-m-2 mil-mb-4"
                          style={{ transition: 'color 0.4s ease', flexGrow: 1 }}
                          dangerouslySetInnerHTML={{ __html: sanitizeHTML(service.description) }}
                        />
                      )}
                      <div className="mil-btn mil-link-type mil-dark" style={{ transition: 'color 0.4s ease', marginTop: 'auto' }}>
                        <span>{(service as any).button_text || 'Learn More'}</span>
                        <i className="far fa-arrow-right"></i>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}