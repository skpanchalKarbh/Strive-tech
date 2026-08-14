'use client'

import Link from 'next/link'
import React, { Fragment } from 'react'
import { formatDateTime } from '@/utilities/formatDateTime'

import type { Post } from '@/payload-types'

export type BlogCardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'populatedAuthors' | 'publishedAt'>

import { Media } from '@/components/Media'
import { formatAuthors, formatAuthorsAvatar } from '@/utilities/formatAuthors'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const BlogCard: React.FC<{
  alignItems?: 'center'
  doc?: BlogCardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string,
  layout?: string,
}> = (props) => {
  const { doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, populatedAuthors, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`
  
  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const defaultBlogImages = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
  ]

  const getFallbackImage = (identifier?: string) => {
    if (!identifier) return defaultBlogImages[0]
    let hash = 0
    for (let i = 0; i < identifier.length; i++) {
      hash = identifier.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = Math.abs(hash) % defaultBlogImages.length
    return defaultBlogImages[index]
  }

  const postMedia = metaImage || (doc as any)?.heroImage
  const dynamicUrl = postMedia && typeof postMedia === 'object' && postMedia?.url ? getMediaUrl(postMedia.url) : (typeof postMedia === 'string' && postMedia.startsWith('http') ? postMedia : null)
  const fallbackSrc = getFallbackImage(slug || title)
  const displaySrc = dynamicUrl || fallbackSrc

  return (
    <>
        <Link href={href} className="mil-premium-blog-card">
            <div className="mil-premium-blog-cover">
                <img 
                  src={displaySrc} 
                  alt={titleToUse || 'Blog cover'} 
                  className="mil-blog-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
            </div>
            <div className="mil-premium-blog-content">
                <div className="mil-premium-blog-badges">
                    {showCategories && hasCategories && (
                        <div>
                            {categories?.map((category, index) => {
                            if (typeof category === 'object') {
                                const { title: titleFromCategory } = category
                                const categoryTitle = titleFromCategory || 'Untitled category'
                                return (
                                <span key={index} className="mil-premium-blog-badge">
                                    {categoryTitle}
                                </span>
                                )
                            }
                            return null
                            })}
                        </div>
                    )}
                </div>
                {titleToUse && <h4>{titleToUse}</h4>}
                {description && <p>{sanitizedDescription}</p>}
                
                <div className="mil-premium-blog-author">
                    <div className="mil-premium-blog-author-info">
                        {hasAuthors && (
                            <div className="mil-premium-blog-avatar">
                                <Media resource={formatAuthorsAvatar(populatedAuthors)} />
                            </div>
                        )}
                        <div className="mil-premium-blog-meta">
                            {hasAuthors && <h6 className="mil-premium-blog-name">{formatAuthors(populatedAuthors)}</h6>}
                            {publishedAt && <p className="mil-premium-blog-date"><time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time></p>}
                        </div>
                    </div>
                </div>
            </div>
        </Link>

        <style>{`
          .mil-premium-blog-card {
            background: linear-gradient(145deg, #0b1a2d 0%, #06101e 100%);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 12px 32px rgba(2, 26, 48, 0.18);
            display: flex;
            flex-direction: column;
            height: 100%;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 30px;
          }
          .mil-premium-blog-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 174, 239, 0.25);
            border-color: rgba(0, 174, 239, 0.4);
          }
          .mil-premium-blog-cover {
            width: 100%;
            height: 240px;
            position: relative;
            overflow: hidden;
            background: #081423;
          }
          .mil-blog-image {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          }
          .mil-premium-blog-card:hover .mil-blog-image {
            transform: scale(1.08);
          }
          .mil-no-image {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #8c939e;
          }
          .mil-premium-blog-content {
            padding: 24px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }
          .mil-premium-blog-badges {
            margin-bottom: 16px;
          }
          .mil-premium-blog-badge {
            background: rgba(0, 174, 239, 0.15);
            border: 1px solid rgba(0, 174, 239, 0.3);
            color: #00aeef;
            padding: 5px 12px;
            border-radius: 50px;
            font-size: 11px;
            font-weight: 700;
            display: inline-block;
            margin-right: 8px;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .mil-premium-blog-content h4 {
            font-size: 20px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 12px;
            line-height: 1.4;
            transition: color 0.3s ease;
          }
          .mil-premium-blog-card:hover .mil-premium-blog-content h4 {
            color: #00aeef;
          }
          .mil-premium-blog-content p {
            font-size: 14px;
            color: #8c939e;
            line-height: 1.6;
            margin-bottom: 24px;
            flex-grow: 1;
          }
          .mil-premium-blog-author {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 16px;
            margin-top: auto;
          }
          .mil-premium-blog-author-info {
            display: flex;
            align-items: center;
          }
          .mil-premium-blog-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 12px;
            background: #081423;
          }
          .mil-premium-blog-avatar img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
          .mil-premium-blog-meta {
            display: flex;
            flex-direction: column;
          }
          .mil-premium-blog-name {
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
            margin: 0 0 2px 0;
          }
          .mil-premium-blog-date {
            font-size: 12px !important;
            color: #8c939e !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        `}</style>
    </>
  )
}
