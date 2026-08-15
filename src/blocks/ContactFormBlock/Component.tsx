import React from 'react'
import { Media } from '@/components/Media'
import { FormBuilder } from '@/components/FormBuilder'
import type { ContactFormBlock as ContactFormBlockProps } from '@/payload-types'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

export const ContactFormBlock: React.FC<ContactFormBlockProps> = ({
  image,
  contact_cards,
  subtitle,
  title,
  form,
  map_iframe,
}) => {
  // Extract contact info from contact_cards
  const phoneCard = contact_cards?.find((c: any) => c.icon === 'phone' || c.title?.toLowerCase().includes('number') || c.title?.toLowerCase().includes('phone'))
  const emailCard = contact_cards?.find((c: any) => c.icon === 'email' || c.title?.toLowerCase().includes('email'))
  const locationCard = contact_cards?.find((c: any) => c.icon === 'location' || c.title?.toLowerCase().includes('location') || c.title?.toLowerCase().includes('address'))

  return (
    <div style={{ background: 'linear-gradient(160deg, #05121e 0%, #010c17 100%)', padding: '60px 0', position: 'relative' }}>
      <div className="container">

        {/* Top: Subtitle / Badge + Title */}
        <div style={{ marginBottom: '32px' }}>
          {subtitle && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '5px 16px', background: 'rgba(0,174,239,0.08)',
              border: '1px solid rgba(0,174,239,0.3)', borderRadius: '30px', marginBottom: '16px'
            }}>
              <div style={{ width: '6px', height: '6px', background: '#00aeef', borderRadius: '50%' }}></div>
              <span style={{ color: '#00aeef', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>{subtitle}</span>
            </div>
          )}
          {title && (
            <h2
              style={{ color: '#ffffff', fontWeight: 700, fontSize: '44px', lineHeight: '1.2', margin: 0, letterSpacing: '-1px' }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        </div>

        {/* CARD (Contact Details Left + Send Request Form Right) */}
        <div style={{
          background: '#081423',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>

            {/* Left Column: Contact Details */}
            <div style={{
              flex: '1 1 300px',
              paddingRight: '36px',
              borderRight: '1px solid rgba(255,255,255,0.08)',
            }}>
              <p style={{ color: '#00aeef', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
                CONTACT DETAILS
              </p>

              {phoneCard && (
                <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ color: '#00aeef', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>{phoneCard.title || 'OUR NUMBER'}</p>
                  <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, margin: 0 }}>{phoneCard.value}</p>
                </div>
              )}

              {emailCard && (
                <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ color: '#00aeef', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>{emailCard.title || 'OUR EMAIL'}</p>
                  <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, margin: 0 }}>{emailCard.value}</p>
                </div>
              )}

              {locationCard && (
                <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ color: '#00aeef', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>{locationCard.title || 'OUR LOCATION'}</p>
                  <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, margin: 0 }}>{locationCard.value}</p>
                </div>
              )}

              {!phoneCard && !emailCard && !locationCard && contact_cards && contact_cards.map((card: any, i: number) => (
                <div key={i} style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ color: '#00aeef', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>{card.title}</p>
                  <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, margin: 0 }}>{card.value}</p>
                </div>
              ))}

              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                {[
                  { icon: 'fab fa-instagram', href: '#' },
                  { icon: 'fab fa-facebook', href: '#' },
                  { icon: 'fab fa-twitter', href: '#' },
                  { icon: 'fab fa-linkedin', href: '#' },
                ].map((s, i) => (
                  <a key={i} href={s.href} style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#8c939e', fontSize: '14px', textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }} className="mil-form-social-icon">
                    <i className={s.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Send Request Form */}
            <div style={{ flex: '2 1 360px', paddingLeft: '36px' }}>
              <p style={{ color: '#00aeef', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
                SEND REQUEST
              </p>
              {form && (
                <div className="mil-contact-form">
                  <FormBuilder form={form as FormType} />
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .mil-map-wrapper iframe {
          width: 100% !important;
          height: 100% !important;
          min-height: 200px;
          border: 0;
        }
        .mil-contact-img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        .mil-form-social-icon:hover {
          background: rgba(0,174,239,0.15) !important;
          border-color: rgba(0,174,239,0.4) !important;
          color: #00aeef !important;
        }
        .mil-contact-form label {
          display: none !important;
        }
        .mil-contact-form form {
          display: block;
        }
        .mil-contact-form form .row {
          display: flex;
          flex-wrap: wrap;
          gap: 0 16px;
        }
        .mil-contact-form form .row > div:nth-child(1),
        .mil-contact-form form .row > div:nth-child(2) {
          flex: 1 1 calc(50% - 8px);
          min-width: 140px;
        }
        .mil-contact-form form .row > div:nth-child(n+3) {
          flex: 1 1 100%;
        }
        .mil-contact-form .mil-input-frame {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          box-shadow: none !important;
          border: none !important;
          border-bottom: 1px solid rgba(255,255,255,0.12) !important;
          background: transparent !important;
          margin: 0 0 24px 0 !important;
          padding: 0 !important;
          border-radius: 0 !important;
          height: 38px !important;
          transition: border-color 0.3s ease;
        }
        .mil-contact-form .mil-input-frame:has(textarea) {
          height: auto !important;
          align-items: flex-start !important;
        }
        .mil-contact-form .mil-input-frame:focus-within {
          border-bottom-color: #00aeef !important;
        }
        .mil-contact-form .mil-input-frame::before,
        .mil-contact-form .mil-input-frame::after {
          display: none !important;
        }
        .mil-contact-form input {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
          color: #ffffff !important;
          padding: 0 28px 0 0 !important;
          border-radius: 0 !important;
          width: 100% !important;
          margin: 0 !important;
          font-size: 14px !important;
          height: 38px !important;
          line-height: 38px !important;
        }
        .mil-contact-form textarea {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
          color: #ffffff !important;
          padding: 6px 28px 6px 0 !important;
          border-radius: 0 !important;
          width: 100% !important;
          margin: 0 !important;
          font-size: 14px !important;
          height: 85px !important;
          min-height: 85px !important;
          line-height: 1.5 !important;
          resize: none;
        }
        .mil-contact-form input::placeholder,
        .mil-contact-form textarea::placeholder {
          color: #556b82 !important;
        }
        .mil-contact-form .mil-input-frame i {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: absolute !important;
          right: 0 !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          width: 20px !important;
          height: 20px !important;
          line-height: 1 !important;
          color: #556b82 !important;
          font-size: 13px !important;
          background: transparent !important;
          border: none !important;
          pointer-events: none !important;
        }
        .mil-contact-form .mil-input-frame:has(textarea) i {
          top: 12px !important;
          transform: none !important;
        }
        .mil-contact-form button {
          background: #071526 !important;
          color: #ffffff !important;
          border: 1px solid rgba(0,174,239,0.3) !important;
          padding: 4px 4px 4px 18px !important;
          border-radius: 30px !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 10px !important;
          height: 36px !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
          margin-top: 10px !important;
        }
        .mil-contact-form button span {
          color: #ffffff !important;
        }
        .mil-contact-form button::after {
          display: none !important;
        }
        .mil-contact-form button i {
          background: #00aeef !important;
          color: #000000 !important;
          border-radius: 50% !important;
          width: 26px !important;
          height: 26px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 10px !important;
          position: static !important;
          transform: none !important;
        }
        .mil-contact-form button:hover {
          background: #00aeef !important;
          color: #000000 !important;
          border-color: #00aeef !important;
        }
        .mil-contact-form button:hover span {
          color: #000000 !important;
        }
        .mil-contact-form button:hover i {
          background: #ffffff !important;
          color: #000000 !important;
        }
        @media (max-width: 768px) {
          div[style*="border-right"] {
            border-right: none !important;
            padding-right: 0 !important;
            padding-bottom: 24px !important;
            border-bottom: 1px solid rgba(255,255,255,0.08) !important;
            margin-bottom: 24px !important;
          }
          div[style*="padding-left: 36px"] {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
