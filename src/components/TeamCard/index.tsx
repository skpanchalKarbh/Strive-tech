'use client'

import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import type { Team } from '@/payload-types'

export type CardTeamData = Pick<Team, 'slug' | 'meta' | 'title' | 'short' | 'social_links'>

export const TeamCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardTeamData
  relationTo?: 'team'
  title?: string
  angleGray?: boolean
}> = (props) => {
  const { doc, relationTo, title: titleFromProps, angleGray } = props
  
  const { slug, meta, title, short, social_links } = doc || {}
  const { image: metaImage } = meta || {}
  
  const titleToUse = titleFromProps || title
  const sanitizedDescription = short?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  const getFallbackImage = (identifier?: string) => {
    if (!identifier) return '/media/team-1.jpg'
    let hash = 0
    for (let i = 0; i < identifier.length; i++) {
      hash = identifier.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = (Math.abs(hash) % 11) + 1
    return `/media/team-${index}.jpg`
  }

  const hasDynamicImage = typeof metaImage === 'object' && (metaImage as any)?.url

  return (
    <div className="mil-team-card-wrapper mil-mb-4">
      <div className="mil-team-card-inner">
        <div className="mil-portrait">
          <Link href={href} className="mil-portrait-link">
            {hasDynamicImage ? (
              <Media 
                resource={metaImage} 
                size="33vw"
                imgClassName="mil-team-img"
              />
            ) : (
              <img
                src={getFallbackImage(slug || titleToUse)}
                alt={titleToUse || 'Team Member'}
                className="mil-team-img"
              />
            )}
          </Link>
          
          {/* Social Links Overlay */}
          {social_links && (
            <div className="mil-team-social-overlay">
              {social_links.facebook && <a href={social_links.facebook} target="_blank" rel="noreferrer" className="mil-team-social-icon"><i className="fab fa-facebook-f"></i></a>}
              {social_links.twitter && <a href={social_links.twitter} target="_blank" rel="noreferrer" className="mil-team-social-icon"><i className="fab fa-twitter"></i></a>}
              {social_links.linkedin && <a href={social_links.linkedin} target="_blank" rel="noreferrer" className="mil-team-social-icon"><i className="fab fa-linkedin-in"></i></a>}
              {social_links.instagram && <a href={social_links.instagram} target="_blank" rel="noreferrer" className="mil-team-social-icon"><i className="fab fa-instagram"></i></a>}
              {social_links.email && <a href={`mailto:${social_links.email}`} className="mil-team-social-icon"><i className="fas fa-envelope"></i></a>}
            </div>
          )}
        </div>

        <div className="mil-card-info">
          {titleToUse && (
            <h5 className="mil-member-name">
              <Link href={href}>
                {titleToUse}
              </Link>
            </h5>
          )}
          {short && <p className="mil-member-role">{sanitizedDescription}</p>}
        </div>
      </div>

      <style jsx>{`
        .mil-team-card-wrapper {
          margin-bottom: 30px;
        }
        .mil-team-card-inner {
          background: linear-gradient(145deg, #0b1a2d 0%, #06101e 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 12px 32px rgba(2, 26, 48, 0.18);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .mil-team-card-inner:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 174, 239, 0.4);
          box-shadow: 0 20px 40px rgba(0, 174, 239, 0.25);
        }
        .mil-portrait {
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          height: 280px;
          width: 100%;
          background: #081423;
        }
        .mil-portrait-link {
          display: block;
          width: 100%;
          height: 100%;
        }
        :global(.mil-team-img) {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          display: block !important;
          transition: transform 0.5s ease !important;
        }
        .mil-team-card-inner:hover :global(.mil-team-img) {
          transform: scale(1.06);
        }
        .mil-team-social-overlay {
          position: absolute;
          bottom: -50px;
          left: 0;
          width: 100%;
          padding: 16px;
          display: flex;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(to top, rgba(5, 12, 21, 0.95), rgba(5, 12, 21, 0));
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .mil-team-card-inner:hover .mil-team-social-overlay {
          opacity: 1;
          bottom: 0;
          pointer-events: auto;
        }
        .mil-team-social-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 13px;
          transition: all 0.3s ease;
        }
        .mil-team-social-icon:hover {
          background: linear-gradient(135deg, #00aeef 0%, #0077ff 100%);
          border-color: transparent;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0, 174, 239, 0.4);
        }
        .mil-card-info {
          padding-top: 16px;
          padding-bottom: 4px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .mil-member-name {
          margin: 0 0 6px 0;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
        }
        .mil-member-name :global(a) {
          color: #ffffff !important;
          text-decoration: none !important;
          transition: color 0.3s ease !important;
        }
        .mil-member-name :global(a:hover) {
          color: #00aeef !important;
        }
        .mil-member-role {
          color: #00aeef;
          font-size: 13px;
          margin: 0;
          line-height: 1.5;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
