'use client'

import Link from 'next/link'
import React from 'react'

import type { Project } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'

export type ProjectCardPostData = Pick<Project, 'slug' | 'meta' | 'title' | 'publishedAt' | 'short_description' | 'price' | 'categories'> & { tag?: string | null }

export const ProjectCard: React.FC<{
  doc?: ProjectCardPostData
  relationTo?: 'projects',
  columns?: string | null | undefined,
  layout?: string | null | undefined,
  title?: string,
}> = (props) => {
  const { doc, relationTo, title: titleFromProps } = props

  const { slug, meta, title, publishedAt, short_description, price, categories, tag } = doc || {}
  const { image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const categoryTitle = hasCategories && typeof categories[0] === 'object' ? categories[0].title : null

  const badgeText = tag || categoryTitle;

  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`

  return (
    <>
      <Link href={href} className="mil-premium-project-card">
        {/* Background Image Layer */}
        <div className="mil-project-image-wrapper">
          {metaImage ? (
            <Media resource={metaImage} fill imgClassName="mil-project-img" />
          ) : (
            <div className="mil-project-img-placeholder" />
          )}
          <div className="mil-project-overlay"></div>
        </div>
        
        {/* Content Layer */}
        <div className="mil-project-content">
          <div className="mil-project-tags">
            {badgeText && <span className="mil-project-badge">{badgeText}</span>}
            {price && <span className="mil-project-price">{price}</span>}
          </div>
          
          <div className="mil-project-text">
            {titleToUse && <h3 className="mil-project-title">{titleToUse}</h3>}
            {short_description && <p className="mil-project-desc">{short_description}</p>}
          </div>
          
          <div className="mil-project-footer">
            <span className="mil-project-btn">
              Read more <i className="far fa-arrow-right"></i>
            </span>
            {publishedAt && <span className="mil-project-date">{formatDateTime(publishedAt)}</span>}
          </div>
        </div>
      </Link>

      <style>{`
        .mil-premium-project-card {
          display: flex;
          flex-direction: column;
          position: relative;
          background: #11141a;
          border-radius: 24px;
          overflow: hidden;
          text-decoration: none;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          height: 100%;
        }

        .mil-premium-project-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 174, 239, 0.3);
          box-shadow: 0 20px 50px rgba(0, 174, 239, 0.15);
        }

        .mil-project-image-wrapper {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          background: #1c2128;
        }

        .mil-project-img {
          object-fit: cover !important;
          width: 100%;
          height: 100%;
          transition: transform 0.6s ease;
        }

        .mil-project-img-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #1c2128, #2a2d34);
        }

        .mil-premium-project-card:hover .mil-project-img {
          transform: scale(1.08);
        }

        .mil-project-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 120px;
          background: linear-gradient(to top, #11141a 0%, transparent 100%);
        }

        .mil-project-content {
          padding: 0 30px 35px 30px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .mil-project-tags {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          margin-top: -15px; /* Pull it slightly into the gradient */
          position: relative;
          z-index: 2;
        }

        .mil-project-badge {
          display: inline-block;
          background: rgba(0, 174, 239, 0.1);
          color: #00aeef;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: 1px solid rgba(0, 174, 239, 0.2);
        }
        
        .mil-project-price {
          color: #00aeef;
          font-weight: 700;
          font-size: 14px;
        }

        .mil-project-title {
          color: #ffffff;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 15px;
          transition: color 0.3s ease;
        }

        .mil-premium-project-card:hover .mil-project-title {
          color: #00aeef;
        }

        .mil-project-desc {
          color: #8c939e;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 25px;
          flex-grow: 1;
        }

        .mil-project-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 20px;
        }

        .mil-project-btn {
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          transition: color 0.3s ease;
        }

        .mil-project-btn i {
          margin-left: 8px;
          color: #00aeef;
          transition: transform 0.3s ease;
        }

        .mil-premium-project-card:hover .mil-project-btn i {
          transform: translateX(5px);
        }

        .mil-project-date {
          color: rgba(255,255,255,0.4);
          font-size: 13px;
        }
      `}</style>
    </>
  )
}
