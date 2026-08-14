import React from 'react'
import type { CoreServicesBlock as CoreServicesBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const CoreServicesBlock: React.FC<CoreServicesBlockProps> = ({
  title,
  description,
  services_list,
}) => {
  return (
    <div className="mil-section mil-p-10-10" style={{ backgroundColor: '#f9fbfd' }}>
      <div className="container">
        {/* Header Section */}
        <div className="row mil-mb-8 mil-jcc">
          <div className="col-lg-8 mil-text-center">
            {title && (
              <h2
                className="mil-c-m-1 mil-mb-4"
                style={{ fontSize: '42px', fontWeight: 'bold', textAlign: 'center' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
              />
            )}
            <div
              className="mil-divider mil-center mil-mb-5"
              style={{
                width: '80px',
                height: '4px',
                backgroundColor: 'var(--mil-accent)',
                margin: '0 auto',
              }}
            ></div>
            {description && (
              <p
                className="mil-c-m-2"
                style={{ fontSize: '16px', lineHeight: '1.8' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
              />
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="row mil-jcc">
          <div className="col-lg-10">
            <div className="mil-core-services-grid">
              {services_list?.map((service, index: number) => (
                <div className="mil-core-service-item" key={index}>
                  <div className="mil-service-icon-box">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h6 className="mil-service-text">{service.text}</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mil-core-services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .mil-core-service-item {
          display: flex;
          align-items: center;
          padding: 24px 30px;
          background-color: #ffffff;
          border-radius: 12px;
          border: 1px solid #edf1f5;
          box-shadow: 0 5px 15px rgba(0,0,0,0.02);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        /* Subtle glowing background effect on hover */
        .mil-core-service-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(90deg, rgba(0, 180, 216, 0.05) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        .mil-service-icon-box {
          position: relative;
          z-index: 1;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f2f6f9;
          color: #001a33;
          border-radius: 50%;
          margin-right: 20px;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .mil-service-text {
          position: relative;
          z-index: 1;
          font-size: 16px;
          font-weight: 600;
          color: #001a33;
          margin: 0;
          line-height: 1.5;
          transition: all 0.3s ease;
        }

        /* Hover Interactions */
        .mil-core-service-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.06);
          border-color: #ffffff;
        }
        .mil-core-service-item:hover::before {
          opacity: 1;
        }
        .mil-core-service-item:hover .mil-service-icon-box {
          background-color: #001a33;
          color: #00b4d8;
          transform: translateX(5px);
        }
        .mil-core-service-item:hover .mil-service-text {
          color: #00b4d8;
          transform: translateX(5px);
        }

        /* Responsive */
        @media (max-width: 767px) {
          .mil-core-services-grid {
            grid-template-columns: 1fr;
          }
          .mil-core-service-item {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  )
}
