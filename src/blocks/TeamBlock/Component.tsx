import React from 'react'
import type { Team, TeamBlock as TeamBlockProps } from '@/payload-types'
import { unstable_cache } from 'next/cache'
import { queryTeamBlock } from '@/app/_fetches'
import type { CardTeamData } from '@/components/TeamCard'
import { TeamCard } from '@/components/TeamCard'
import Link from "next/link"
import { sanitizeHTML } from '@/utilities/sanitizeHtml'

export const TeamBlock: React.FC<TeamBlockProps> = async ({
  badge,
  title,
  description,
  button_text,
  button_url,
  categories, 
  limit: limitFromProps, 
  populateBy, 
  selectedDocs
}) => {

  const limit = limitFromProps || 3

  let team: CardTeamData[] = []
  
  if (populateBy === 'collection') {
    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    team = await getCachedTeamBlock(flattenedCategories, limit);
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Team[]

      team = filteredSelectedPosts
    }
  }

  return (
    <div className="mil-section mil-p-10-6">
      <div className="container">
        <div className="row mil-aie mil-mb-10">
          <div className="col-12 col-lg-6 mil-md-mb-4">
            {badge && <div className="mil-badge mil-mb-4">{badge}</div>}
            {title && (
              <h2
                className="mil-c-m-1"
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
              />
            )}
          </div>
          <div className="col-12 col-md-6">
            <div className="mil-flex-column mil-jce mil-aie mil-md-ais">
              {description && (
                <p className="mil-c-m-2 mil-t-14 mil-mb-3" dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }} />
              )}
              {button_text && button_url && (
                <Link href={button_url} className="mil-btn mil-link-type mil-dark">
                  <span>{button_text}</span>
                  <i className="far fa-arrow-right"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          {team.map((item, index) => (
            <div key={index} className="col-6 col-lg-3">
              <TeamCard doc={item} relationTo="team" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const getCachedTeamBlock = unstable_cache(
  async (flattenedCategories, limit) => {
    return queryTeamBlock(flattenedCategories, limit);
  },
  ['team-block']
);