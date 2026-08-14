import React from 'react'

import type { Post } from '@/payload-types'
import type { BlogCardPostData } from '@/components/BlogCard';
import { LatestPosts } from '@/components/LatestPosts'
import { unstable_cache } from 'next/cache'
import { queryBlogRelatedPosts } from '@/app/_fetches'

export type RelatedPostsProps = {
  className?: string,
  docs?: Post[],
  limit?: number, 
  postId?: string
}

export const RelatedPosts: React.FC<RelatedPostsProps> = async (props) => {
  const { docs, limit, postId } = props

  let posts: BlogCardPostData[] = []

  if (docs?.length) {
      const selectedPostsIds = docs?.map((post) => {
        if (typeof post === 'object') return post.id
      })

      posts = await getCachedBlogRelatedPosts(postId, selectedPostsIds, limit ? limit : 3);
  }

  return (
    <div className="mil-section mil-gray-section mil-p-10-10">
      <div className="container">
          <div className="row mil-aie mil-mb-10">
              <div className="col-12 col-md-6 mil-sm-mb-4">
                  <div className="mil-badge mil-mb-4">Similar publications</div>
                  <h2 className="mil-c-m-1">Ideas, Strategy, <br className="mil-sm-hidden" />and Perspective</h2>
              </div>
              <div className="col-12 col-md-6">
                  <div className="mil-flex-column mil-jce">
                      <p className="mil-c-m-2 mil-t-16">We write about what matters — strategy, innovation, and the evolving business landscape. Explore ideas that spark action, challenge assumptions, and support smarter decisions at every stage of growth.</p>
                  </div>
              </div>
          </div>
          
          <LatestPosts posts={posts} />
      </div>
    </div>
  )
}

const getCachedBlogRelatedPosts = async (slug: string | undefined, selectedPostsIds: (string | undefined)[], limit: number) => 
  unstable_cache(queryBlogRelatedPosts, [`blog-related-posts-${slug}`])(selectedPostsIds, limit)
