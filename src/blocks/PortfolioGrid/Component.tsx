import type { Project, PortfolioGrid as PortfolioGridProps } from '@/payload-types'
import React from 'react'
import { unstable_cache } from 'next/cache'
import { ProjectsMasonry } from '@/components/ProjectsMasonry'
import { queryProjectsGridBlock } from '@/app/_fetches'
import type { ProjectCardPostData } from '@/components/ProjectCard'

export const PortfolioGrid: React.FC<
  PortfolioGridProps & {
    id?: string
  }
> = async (props) => {
  const { columns, categories, limit: limitFromProps, populateBy, selectedDocs, container } = props

  const limit = limitFromProps || 6

  let projects: ProjectCardPostData[] = []

  if (populateBy === 'collection') {
    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    projects = await getCachedProjectsGridBlock(flattenedCategories, limit)
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Project[]

      projects = filteredSelectedPosts
    }
  }

  return (
    <section className="portfolio-section">
      <div className={container === "boxed" ? "portfolio-grid-container" : "portfolio-grid-fluid"}>
        <ProjectsMasonry projects={projects} columns={columns} layout={"grid"} />
      </div>
    </section>
  )
}

const getCachedProjectsGridBlock = unstable_cache(
  async (flattenedCategories, limit) => {
    return queryProjectsGridBlock(flattenedCategories, limit);
  },
  ['projects-grid-block-v2']
);