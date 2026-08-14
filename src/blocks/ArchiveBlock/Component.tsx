import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import type { BlogCardPostData } from '@/components/BlogCard'
import { unstable_cache } from 'next/cache'
import { queryBlogArchivePosts } from '@/app/_fetches'
import React from 'react'
import Link from "next/link";

import { LatestPosts } from '@/components/LatestPosts'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { badge, title, description, button_text, button_url, categories, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: BlogCardPostData[] = []

  if (populateBy === 'collection') {
    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    posts = await getCachedBlogArchivePosts(flattenedCategories, limit)
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="mil-section" style={{ background: 'linear-gradient(180deg, #021a30 0%, #010c17 100%)', padding: '120px 0' }}>
        <div className="container">
            <div className="row mil-aie mil-mb-10">
              <div className="col-12 col-lg-6 mil-md-mb-4">
                {badge && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 15px', background: '#ffffff', borderRadius: '30px', border: '1px solid #eef3f7', boxShadow: '0 5px 15px rgba(0,0,0,0.03)', marginBottom: '20px' }}>
                    <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%' }}></div>
                    <h6 style={{ color: '#64748b', margin: 0, fontSize: '12px', fontWeight: 600 }}>{badge}</h6>
                  </div>
                )}
                {title && (
                  <h2
                    className="mil-c-m-1"
                    style={{ color: '#ffffff', fontWeight: 800 }}
                    dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
                  />
                )}
              </div>
              <div className="col-12 col-md-6">
                <div className="mil-flex-column mil-jce mil-aie mil-md-ais">
                  {description && (
                    <p className="mil-t-14 mil-mb-3" style={{ color: '#8c939e', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }} />
                  )}
                  {button_text && button_url && (
                    <Link href={button_url} className="mil-btn mil-link-type" style={{ color: '#ffffff' }}>
                      <span>{button_text}</span>
                      <i className="far fa-arrow-right" style={{ color: '#00aeef', marginLeft: '8px' }}></i>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <LatestPosts posts={posts} />
        </div>
    </div>
  )
}

const getCachedBlogArchivePosts = unstable_cache(
  async (flattenedCategories, limit) => {
    return queryBlogArchivePosts(flattenedCategories, limit);
  },
  ['blog-archive-posts']
);