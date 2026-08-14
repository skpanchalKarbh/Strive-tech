import React from 'react'
import type { PremiumOverviewBlock as PremiumOverviewBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const PremiumOverviewBlock: React.FC<PremiumOverviewBlockProps> = ({
  vision_title,
  vision_text,
  why_choose_title,
  why_choose_list,
  clients_title,
  clients_description,
  clients_list,
  cta_title,
  cta_description,
}) => {
  return (
    <div
      className="mil-premium-overview-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#021024',
        padding: '120px 0',
      }}
    >
      {/* Decorative Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 180, 216, 0.15) 0%, rgba(2, 16, 36, 0) 70%)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '800px',
          height: '800px',
          background:
            'radial-gradient(circle, rgba(189, 236, 32, 0.05) 0%, rgba(2, 16, 36, 0) 70%)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      ></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Row 1: Vision & Why Choose Us */}
        <div className="row mil-mb-5">
          {/* Vision Card */}
          <div className="col-lg-5 mil-mb-5">
            <div className="mil-glass-card" style={{ height: '100%' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(0, 180, 216, 0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '30px',
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#00b4d8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="#00b4d8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="#00b4d8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {vision_title && (
                <h3 className="mil-light mil-mb-4" style={{ fontSize: '36px', fontWeight: 700 }}>
                  {vision_title}
                </h3>
              )}
              {vision_text && (
                <p
                  className="mil-light-soft"
                  style={{ fontSize: '18px', lineHeight: '1.8', margin: 0 }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(vision_text) }}
                />
              )}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="col-lg-7 mil-mb-5">
            <div
              className="mil-glass-card"
              style={{ height: '100%', background: 'rgba(255, 255, 255, 0.015)' }}
            >
              {why_choose_title && (
                <h3 className="mil-light mil-mb-5" style={{ fontSize: '32px', fontWeight: 600 }}>
                  {why_choose_title}
                </h3>
              )}

              {why_choose_list && why_choose_list.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {why_choose_list.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          flexShrink: 0,
                          marginTop: '4px',
                          marginRight: '15px',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="12" fill="rgba(189, 236, 32, 0.2)" />
                          <path
                            d="M17 8L10 15L7 12"
                            stroke="#bdec20"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        className="mil-light"
                        style={{ fontSize: '16px', lineHeight: '1.6', opacity: 0.9 }}
                      >
                        {item.point}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Clients & Partners */}
        <div className="row mil-mb-5">
          <div className="col-12">
            <div className="mil-glass-card mil-text-center">
              {clients_title && (
                <h3
                  className="mil-light mil-mb-4"
                  style={{ fontSize: '28px', fontWeight: 600, textAlign: 'center' }}
                >
                  {clients_title}
                </h3>
              )}
              {clients_description && (
                <p
                  className="mil-light-soft mil-center mil-mb-5"
                  style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    fontSize: '17px',
                    lineHeight: '1.6',
                    textAlign: 'center',
                    marginBottom: '20px',
                  }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(clients_description) }}
                />
              )}

              {clients_list && clients_list.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '15px',
                  }}
                >
                  {clients_list.map((client, i) => (
                    <div key={i} className="mil-client-pill">
                      {client.client_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 3: CTA */}
        <div className="row">
          <div className="col-12">
            <div className="mil-glass-card mil-cta-card mil-text-center">
              {cta_title && (
                <h2
                  className="mil-light mil-mb-4"
                  style={{ fontSize: '42px', fontWeight: 800, textAlign: 'center' }}
                >
                  {cta_title}
                </h2>
              )}
              {cta_description && (
                <p
                  className="mil-light-soft mil-center"
                  style={{
                    maxWidth: '700px',
                    margin: '0 auto',
                    fontSize: '18px',
                    lineHeight: '1.8',
                  }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(cta_description) }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mil-glass-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 50px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .mil-glass-card:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-5px);
        }
        
        .mil-cta-card {
          background: linear-gradient(135deg, rgba(0, 180, 216, 0.1) 0%, rgba(0, 51, 102, 0.3) 100%);
          border: 1px solid rgba(0, 180, 216, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .mil-client-pill {
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          color: #ffffff;
          font-weight: 500;
          font-size: 15px;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          cursor: default;
        }
        .mil-client-pill:hover {
          background: rgba(189, 236, 32, 0.15);
          border-color: rgba(189, 236, 32, 0.5);
          color: #bdec20;
          transform: translateY(-2px);
        }

        .mil-light {
          color: #ffffff;
        }
        .mil-light-soft {
          color: rgba(255, 255, 255, 0.7);
        }

        @media (max-width: 991px) {
          .mil-glass-card {
            padding: 30px;
          }
        }
      `}</style>
    </div>
  )
}
