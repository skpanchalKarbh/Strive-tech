import React from 'react'

import type { Service } from '@/payload-types'
import type { CardServiceData } from '@/components/ServiceCard';
import { CollectionServices } from '@/components/CollectionServices'
import { unstable_cache } from 'next/cache'
import { queryServicesRelatedPosts } from '@/app/_fetches'

export type RelatedPostsProps = {
  className?: string,
  docs?: Service[],
  limit?: number, 
  postId?: string
}

export const RelatedPosts: React.FC<RelatedPostsProps> = async (props) => {
  const { docs, limit, postId } = props

  let posts: CardServiceData[] = []

  if (docs?.length) {
      const selectedPostsIds = docs?.map((post) => {
        if (typeof post === 'object') return post.id
      })

      posts = await getCachedServicesRelatedPosts(postId, selectedPostsIds, limit ? limit : 3);
  }

  return (
    <div className="mil-section mil-gray-section mil-p-10-8">
      <div className="container">
          <div className="row mil-aie mil-mb-10">
              <div className="col-12 col-md-6 mil-sm-mb-4">
                  <div className="mil-badge mil-mb-4">Other Services</div>
                  <h2 className="mil-c-m-1">Solutions That <br className="mil-sm-hidden" />Drive <span className="mil-opacity-text">Business</span> Forward</h2>
              </div>
              <div className="col-12 col-md-6">
                  <div className="mil-flex-column mil-jce">
                      <p className="mil-c-m-2 mil-t-16">Our services are designed to solve complex challenges and drive measurable growth. From strategy and research to operations and transformation, we deliver tailored solutions that align with your goals, adapt to your needs, and scale with your business.</p>
                  </div>
              </div>
          </div>
          
          <CollectionServices posts={posts} />
      </div>
    </div>
  )
}

const getCachedServicesRelatedPosts = async (slug: string | undefined, selectedPostsIds: (string | undefined)[], limit: number) => 
  unstable_cache(queryServicesRelatedPosts, [`services-related-posts-${slug}`])(selectedPostsIds, limit)
