'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import type { Footer as FooterType } from '@/payload-types'
import { Media } from '@/components/Media'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface FooterProps {
  data: FooterType | null | undefined
}

export const FooterClient: React.FC<FooterProps> = ({ data }) => {
  const logoLight = (data as FooterType)?.logoLight
  const activeLogo = logoLight || data?.logo

  const resolveLogoUrl = () => {
    if (activeLogo && typeof activeLogo === 'object' && (activeLogo as any)?.url) {
      return getMediaUrl((activeLogo as any).url)
    }
    if (data?.logo && typeof data?.logo === 'object' && (data?.logo as any)?.url) {
      return getMediaUrl((data?.logo as any).url)
    }
    return '/img/logo/logo-d.png'
  }

  const [logoSrc, setLogoSrc] = useState<string>(resolveLogoUrl())

  useEffect(() => {
    setLogoSrc(resolveLogoUrl())
  }, [data])

  if (!data) return null

  const {
    logo,
    newsletter,
    mainMenu = [],
    policyLinks = [],
    social = [],
    locations = [],
    copyright,
  } = data

  // Fallback links matching Header navigation pages
  const defaultCompanyMenu = mainMenu && mainMenu.length > 0 ? mainMenu : [
    { label: 'Home', link: '/' },
    { label: 'Services', link: '/services' },
    { label: 'Projects', link: '/projects' },
    { label: 'Team', link: '/team' },
    { label: 'Blog', link: '/blog' },
    { label: 'Contact', link: '/contact' },
  ]

  const defaultSupportMenu = policyLinks && policyLinks.length > 0 ? policyLinks : [
    { label: 'Privacy Policy', link: '/privacy-policy' },
    { label: 'Terms and conditions', link: '/terms' },
  ]

  const defaultSocial = social && social.length > 0 ? social : [
    { icon: 'fab fa-instagram', link: '#' },
    { icon: 'fab fa-linkedin-in', link: '#' },
    { icon: 'fab fa-whatsapp', link: '#' },
    { icon: 'fab fa-facebook-f', link: '#' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{ background: '#050c15', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '60px', paddingBottom: '30px', position: 'relative' }}>
      <div className="container">
        
        {/* Main Footer Row: 4 Columns + Side Floating Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '32px', marginBottom: '40px', position: 'relative' }}>
          
          {/* Column 1: Logo, Description & Social Icons */}
          <div style={{ flex: '1 1 260px', maxWidth: '320px' }}>
            {/* Logo in White Container Box */}
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '10px',
                padding: '8px 16px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}>
                <img
                  src={logoSrc}
                  alt="StriveTech Partners"
                  style={{ maxHeight: '36px', height: '36px', width: 'auto', objectFit: 'contain', display: 'block' }}
                  onError={() => {
                    if (logoSrc !== '/img/logo/logo-d.png') {
                      setLogoSrc('/img/logo/logo-d.png')
                    }
                  }}
                />
              </div>
            </Link>

            <p style={{ color: '#8c939e', fontSize: '13px', lineHeight: '1.6', marginBottom: '24px' }}>
              Empowering businesses with innovative technology solutions. Discover our expertise and join us in driving the future.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {defaultSocial.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mil-footer-social-btn"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '13px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <i className={item.icon || 'fas fa-link'}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div style={{ flex: '0 1 150px' }}>
            <h5 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, marginBottom: '20px' }}>Company</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {defaultCompanyMenu.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '12px' }}>
                  <Link
                    href={item.link || '#'}
                    style={{ color: '#8c939e', fontSize: '13px', textDecoration: 'none', transition: 'color 0.3s ease' }}
                    className="mil-footer-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div style={{ flex: '0 1 150px' }}>
            <h5 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, marginBottom: '20px' }}>Support</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {defaultSupportMenu.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '12px' }}>
                  <Link
                    href={item.link || '#'}
                    style={{ color: '#8c939e', fontSize: '13px', textDecoration: 'none', transition: 'color 0.3s ease' }}
                    className="mil-footer-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us & Newsletter */}
          <div style={{ flex: '1 1 260px', maxWidth: '300px' }}>
            <h5 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Contact Us</h5>
            
            {/* Location */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'flex-start' }}>
              <i className="fas fa-map-marker-alt" style={{ color: '#00aeef', fontSize: '13px', marginTop: '3px' }}></i>
              <div>
                <p style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600, margin: 0, lineHeight: '1.3' }}>Springfield</p>
                <p style={{ color: '#8c939e', fontSize: '12px', margin: 0, lineHeight: '1.4' }}>
                  {locations && locations.length > 0 && locations[0].address ? locations[0].address : '2501 Chatham Rd, STE R Springfield, IL 62704'}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'center' }}>
              <i className="fas fa-phone-alt" style={{ color: '#00aeef', fontSize: '12px' }}></i>
              <a href="tel:+14845181900" style={{ color: '#8c939e', fontSize: '12px', textDecoration: 'none', transition: 'color 0.3s' }} className="mil-footer-link">
                {locations && locations.length > 0 && locations[0].phone ? locations[0].phone : '+1 484 518 1900'}
              </a>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', alignItems: 'center' }}>
              <i className="fas fa-envelope" style={{ color: '#00aeef', fontSize: '12px' }}></i>
              <a href="mailto:Info@strivetechpartners.com" style={{ color: '#8c939e', fontSize: '12px', textDecoration: 'none', transition: 'color 0.3s' }} className="mil-footer-link">
                Info@strivetechpartners.com
              </a>
            </div>

            {/* Newsletter */}
            <h5 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Newsletter</h5>
            <form action={process.env.NEXT_PUBLIC_MAILCHIMP_ACTION_URL} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '30px',
              padding: '4px 4px 4px 16px',
              display: 'flex',
              alignItems: 'center',
            }}>
              <input type="hidden" name={process.env.NEXT_PUBLIC_MAILCHIMP_PUBLIC_KEY} />
              <input
                type="email"
                name="EMAIL"
                placeholder={newsletter?.placeholder || 'Subscribe our newsletter'}
                required
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  width: '100%',
                  fontSize: '12px',
                  color: '#ffffff',
                }}
              />
              <button
                type="submit"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 198, 255, 0.3)',
                }}
              >
                <i className="fas fa-envelope" style={{ fontSize: '12px' }}></i>
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* E-Verify Badge */}
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            padding: '6px 14px',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', lineHeight: 1 }}>
              <span style={{ color: '#c0392b', fontWeight: 900, fontSize: '13px', letterSpacing: '-0.5px' }}>E-</span>
              <span style={{ color: '#00aeef', fontWeight: 800, fontSize: '13px', letterSpacing: '-0.5px' }}>Verify</span>
            </div>
            <span style={{ color: '#444444', fontSize: '9px', fontWeight: 600, marginTop: '2px', whiteSpace: 'nowrap' }}>
              We E-Verify Employment
            </span>
          </div>

          {/* Copyright Text */}
          <p style={{ color: '#8c939e', fontSize: '13px', margin: 0 }}>
            {copyright || '© 2026. All rights reserved.'}
          </p>

          <div style={{ width: '100px' }}></div>
        </div>

      </div>

      <style>{`
        .mil-footer-link:hover {
          color: #00aeef !important;
        }
        .mil-footer-social-btn:hover {
          background: rgba(0,174,239,0.15) !important;
          border-color: rgba(0,174,239,0.4) !important;
          color: #00aeef !important;
        }
        @media (max-width: 992px) {
          .mil-footer-action-bar {
            position: static !important;
            transform: none !important;
            flex-direction: row !important;
            width: fit-content !important;
            margin: 20px 0 !important;
          }
        }
      `}</style>
    </footer>
  )
}

export default FooterClient
