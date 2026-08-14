import React from 'react'
import { Media } from '@/components/Media'
import Link from "next/link"
import type { HeroOneBlock as HeroOneBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const HeroOneBlock: React.FC<HeroOneBlockProps> = ({
  bgImage,
  icon,
  subtitle,
  title_line1,
  title_line2,
  title_line3,
  description,
  button1_text,
  button1_url,
  button2_text,
  button2_url,
  counter1_upper,
  counter1_lower,
  counter1_value,
  counter2_upper,
  counter2_lower,
  counter2_value,
}) => {
  return (
    <div className="mil-hero-1" style={{ background: '#05121e', padding: '160px 0 100px', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image with Dark Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        {bgImage && (
          <Media
            imgClassName="mil-hero-bg mil-scale-img-top"
            resource={bgImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}
          />
        )}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(5,18,30,0.8) 0%, rgba(5,18,30,1) 100%)' }}></div>
        {/* Subtle glowing orb */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,174,239,0.15) 0%, rgba(5,18,30,0) 70%)', borderRadius: '50%' }}></div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            
            {/* Badge */}
            {subtitle && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,174,239,0.3)', borderRadius: '30px', marginBottom: '25px' }}>
                <div style={{ width: '6px', height: '6px', background: '#00aeef', borderRadius: '50%' }}></div>
                <h6 style={{ color: '#8c939e', margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }} dangerouslySetInnerHTML={{ __html: sanitizeHTML(subtitle) }}></h6>
              </div>
            )}

            {/* Title */}
            <h1 style={{ color: '#ffffff', fontSize: '56px', fontWeight: 700, marginBottom: '20px', letterSpacing: '-1px' }}>
              {title_line1 && <>{title_line1} </>}
              {title_line2 && <>{title_line2} </>}
              {title_line3 && <span>{title_line3}</span>}
            </h1>

            {/* Breadcrumb / Desc */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', fontWeight: 600 }}>
              <Link href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: '#8c939e' }}>/</span>
              <span style={{ color: '#00aeef' }}>
                {title_line1 || title_line2 || 'Our services'}
              </span>
            </div>

            {/* Standard Description (if any) */}
            {description && (
              <p
                style={{ color: '#8c939e', fontSize: '16px', lineHeight: '1.6', marginTop: '20px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
              />
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}