'use client'

import Link from 'next/link'
import React from 'react'

import type { Project } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'

export type ProjectCardPostData = Pick<Project, 'slug' | 'meta' | 'title' | 'publishedAt' | 'short_description' | 'price' | 'categories'> & { tag?: string | null }

export const Project2Card: React.FC<{
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
  
  const year = publishedAt ? new Date(publishedAt).getFullYear() : null

  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`

  return (
    <>
      <Link href={href} className="mil-premium-h-card">
          <div className="row g-0 mil-w-100" style={{ height: '100%' }}>
            {/* Left Image Section */}
            <div className="col-lg-5 mil-h-img-col">
                  <div className="mil-h-cover">
                      {metaImage && typeof metaImage === 'object' && metaImage.url ? (
                        <img src={metaImage.url} alt={titleToUse || 'Project Image'} className="mil-h-img" />
                      ) : (
                        <div className="mil-h-img-placeholder" />
                      )}
                      <div className="mil-h-overlay"></div>
                  </div>
              </div>

              {/* Right Content Section */}
              <div className="col-lg-7 mil-h-content-col">
                  <div className="mil-h-descr">
                      <div className="mil-h-text">
                          {badgeText && <span className="mil-h-badge mil-mb-2">{badgeText}</span>}
                          {titleToUse && <h3 className="mil-h-title mil-mb-2">{titleToUse}</h3>}
                          {short_description && <p className="mil-h-desc mil-mb-4">{short_description}</p>}
                          <div className="mil-h-btn">
                              <span>Read more</span>
                              <i className="far fa-arrow-right"></i>
                          </div>
                      </div>
                      
                      {year && (
                        <div className="mil-h-year">
                            <strong>{year}</strong>
                        </div>
                      )}
                  </div>
              </div>
          </div>
      </Link>

      <style>{`
        .mil-premium-h-card {
          display: flex;
          background: #11141a;
          border-radius: 24px;
          overflow: hidden;
          text-decoration: none;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          height: 100%;
          min-height: 350px;
        }

        .mil-premium-h-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 174, 239, 0.3);
          box-shadow: 0 20px 50px rgba(0, 174, 239, 0.15);
        }

        .mil-h-img-col {
          position: relative;
        }

        .mil-h-cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .mil-h-img {
          object-fit: cover !important;
          width: 100%;
          height: 100%;
          transition: transform 0.6s ease;
        }

        .mil-h-img-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #1c2128, #2a2d34);
        }

        .mil-premium-h-card:hover .mil-h-img {
          transform: scale(1.08);
        }

        .mil-h-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, transparent 0%, #11141a 100%);
        }

        @media (max-width: 991px) {
          .mil-h-cover {
            position: relative;
            height: 250px;
          }
          .mil-h-overlay {
            background: linear-gradient(to top, #11141a 0%, transparent 100%);
          }
        }

        .mil-h-content-col {
          display: flex;
          align-items: center;
        }

        .mil-h-descr {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 50px 40px;
        }

        .mil-h-text {
          width: 85%;
          padding-right: 30px;
        }

        .mil-h-badge {
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

        .mil-h-title {
          color: #ffffff;
          font-size: 32px;
          font-weight: 800;
          transition: color 0.3s ease;
          margin-bottom: 15px;
        }

        .mil-premium-h-card:hover .mil-h-title {
          color: #00aeef;
        }

        .mil-h-desc {
          color: #8c939e;
          font-size: 16px;
          line-height: 1.7;
        }

        .mil-h-btn {
          display: inline-flex;
          align-items: center;
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          background: rgba(255,255,255,0.05);
          padding: 10px 24px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.3s ease;
        }

        .mil-h-btn i {
          margin-left: 10px;
          color: #00aeef;
          transition: transform 0.3s ease;
        }

        .mil-premium-h-card:hover .mil-h-btn {
          background: #ffffff;
          color: #000000;
        }

        .mil-premium-h-card:hover .mil-h-btn i {
          transform: translateX(5px);
        }

        .mil-h-year {
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-left: 1px solid rgba(255,255,255,0.05);
        }

        .mil-h-year strong {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: 50px;
          color: rgba(255,255,255,0.05);
          font-weight: 800;
          transition: color 0.4s ease;
        }

        .mil-premium-h-card:hover .mil-h-year strong {
          color: rgba(0, 174, 239, 0.2);
        }
      `}</style>
    </>
  )
}
