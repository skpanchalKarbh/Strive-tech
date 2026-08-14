import React from 'react'

import type { Project } from '@/payload-types'
import type { ProjectCardPostData } from '@/components/ProjectCard';
import { CollectionProjects } from '@/components/CollectionProjects'
import { unstable_cache } from 'next/cache'
import { queryProjectsRelatedPosts } from '@/app/_fetches'

export type RelatedPostsProps = {
  className?: string,
  docs?: Project[],
  limit?: number, 
  postId?: string
}

export const RelatedPosts: React.FC<RelatedPostsProps> = async (props) => {
  const { docs, limit, postId } = props

  let posts: ProjectCardPostData[] = []

  if (docs?.length) {
      const selectedPostsIds = docs?.map((post) => {
        if (typeof post === 'object') return post.id
      })

      posts = await getCachedProjectsRelatedPosts(postId, selectedPostsIds, limit ? limit : 3);
  }

  return (
    <div className="mil-section mil-gray-section mil-p-10-10">
      <div className="container">
          <div className="row mil-aie mil-mb-10">
              <div className="col-12 col-md-6 mil-sm-mb-4">
                  <div className="mil-badge mil-mb-4">Similar Projects</div>
                  <h2 className="mil-c-m-1">What We’ve <br className="mil-sm-hidden" />Achieved Together</h2>
              </div>
              <div className="col-12 col-md-6">
                  <div className="mil-flex-column mil-jce">
                      <p className="mil-c-m-2 mil-t-16">Each project we take on is a partnership — rooted in trust, driven by insight, and focused on results. From global brands to ambitious startups, our work reflects real challenges, smart solutions, and measurable impact.</p>
                  </div>
              </div>
          </div>
          
          <CollectionProjects projects={posts} columns={"3"} container="fluid" />
      </div>
    </div>
  )
}

const getCachedProjectsRelatedPosts = async (slug: string | undefined, selectedPostsIds: (string | undefined)[], limit: number) => 
  unstable_cache(queryProjectsRelatedPosts, [`projects-related-posts-${slug}`])(selectedPostsIds, limit)
