import React from 'react'
import Link from 'next/link'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { heroImage, meta, title } = post
  const postMedia = heroImage || meta?.image
  const hasValidMedia = postMedia && typeof postMedia === 'object' && ('url' in postMedia || 'filename' in postMedia)
  const fallbackSrc = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop'

  return (
    <div className="mil-hero-inner" id="top">
      {hasValidMedia ? (
          <Media
              imgClassName="mil-hero-bg mil-scale-img-top"
              resource={postMedia}
          />
      ) : (
          <img
              src={fallbackSrc}
              alt={title || 'Hero background'}
              className="mil-hero-bg mil-scale-img-top"
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
          />
      )}
      <div className="mil-overlay" style={{"opacity": ".8"}}></div>
      <div className="mil-hero-content">
          <div className="mil-container">
              <div className="row mil-aie">
                  <div className="col-lg-12 mil-tac">
                      {title && <h1 className="mil-c-m-4 mil-mb-5" dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }} />}
                      <ul className="mil-breadcrumbs mil-jcc mil-w-100">
                          <li><Link href="/">Home</Link></li>
                          <li className="mil-cuttent"><a href="#.">Publication</a></li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
