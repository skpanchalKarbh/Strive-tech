import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

import type { IntroBlock as IntroBlockProps } from '@/payload-types'

export const IntroBlock: React.FC<IntroBlockProps> = ({ bgImage, short_title, title }) => {
  return (
    <div className="mil-hero-inner" id="top" style={{ background: '#05121e', padding: '160px 0 100px', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image with Dark Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        {bgImage && (
          <Media
            imgClassName="mil-hero-bg mil-scale-img-top"
            resource={bgImage}
            fill
          />
        )}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(5,18,30,0.85) 0%, rgba(5,18,30,1) 100%)' }}></div>
        {/* Subtle glowing orb */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,174,239,0.15) 0%, rgba(5,18,30,0) 70%)', borderRadius: '50%', zIndex: 2 }}></div>
      </div>

      <div className="mil-hero-content" style={{ zIndex: 10, position: 'relative' }}>
        <div className="mil-container">
          <div className="row mil-aie">
            <div className="col-lg-12 mil-tac">
              
              {/* Pill Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,174,239,0.3)', borderRadius: '30px', marginBottom: '25px' }}>
                <div style={{ width: '6px', height: '6px', background: '#00aeef', borderRadius: '50%' }}></div>
                <h6 style={{ color: '#8c939e', margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>WHAT WE OFFER</h6>
              </div>

              {title && (
                <h1
                  className="mil-c-m-4 mil-mb-5"
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
                  style={{ color: '#ffffff', fontSize: '56px', fontWeight: 700, letterSpacing: '-1px' }}
                />
              )}
              
              <ul className="mil-breadcrumbs mil-jcc mil-w-100" style={{ paddingLeft: 0 }}>
                <li>
                  <Link href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</Link>
                </li>
                <li className="mil-cuttent">
                  <span style={{ color: '#00aeef' }}>{short_title || title}</span>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
