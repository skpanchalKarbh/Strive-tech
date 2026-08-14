'use client'

import React from 'react'
import { Media } from '@/components/Media'
import Link from "next/link"
import type { HeroFourBlock as HeroFourBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const HeroFourBlock: React.FC<HeroFourBlockProps> = ({
  subtitle,
  title,
  description,
  button1_text,
  button1_url,
  button2_text,
  button2_url,
  bgImage,
}) => {
  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="mil-hero-dark-grid" id="top">
      {/* Glow Effects */}
      <div className="mil-hero-dark-glow-left"></div>
      <div className="mil-hero-dark-glow-right"></div>

      <div className="mil-container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div className="row align-items-center">

          {/* Left: Text Content */}
          <div className="col-lg-6 mil-md-mb-10">
            <div className="mil-hero-dark-content">
              {title ? (
                <h1
                  className="mil-hero-dark-title"
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
                />
              ) : (
                <h1 className="mil-hero-dark-title">
                  The right strategy <br/>
                  <strong>changes everything.</strong>
                </h1>
              )}
              
              {description ? (
                <div
                  className="mil-hero-dark-desc"
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
                />
              ) : (
                <p className="mil-hero-dark-desc">
                  Talent, tech, and transformation — In the work with your team, invested in the result.
                </p>
              )}
              
              <div className="mil-hero-dark-actions">
                {button1_text && button1_url ? (
                  <Link href={button1_url} className="mil-hero-dark-btn">
                    <span>{button1_text}</span>
                    <i className="far fa-arrow-right"></i>
                  </Link>
                ) : (
                  <Link href="#" className="mil-hero-dark-btn">
                    <span>Talk to an Expert</span>
                    <i className="far fa-arrow-right"></i>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right: Grid Masked Image (Animated) */}
          <div className="col-lg-6">
            <div className="mil-hero-dark-image-wrapper">
              {bgImage && typeof bgImage === 'object' && bgImage.url ? (
                <>
                  <img src={bgImage.url} alt={bgImage.alt || 'Team'} className="mil-hero-dark-masked-img mil-hero-dark-mask-1" />
                  <img src={bgImage.url} alt={bgImage.alt || 'Team'} className="mil-hero-dark-masked-img mil-hero-dark-mask-2" />
                  <img src={bgImage.url} alt={bgImage.alt || 'Team'} className="mil-hero-dark-masked-img mil-hero-dark-mask-3" />
                </>
              ) : (
                <>
                  <img src="/3d-avatar.png" alt="Team" className="mil-hero-dark-masked-img mil-hero-dark-mask-1" />
                  <img src="/3d-avatar.png" alt="Team" className="mil-hero-dark-masked-img mil-hero-dark-mask-2" />
                  <img src="/3d-avatar.png" alt="Team" className="mil-hero-dark-masked-img mil-hero-dark-mask-3" />
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a href="#next" onClick={handleScrollDown} className="mil-hero-dark-scroll">
        <div className="mil-hero-dark-scroll-icon">
          <i className="far fa-arrow-down"></i>
        </div>
        <span>Scroll</span>
      </a>
    </div>
  )
}