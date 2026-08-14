import type { Project, PortfolioTwoBlock as PortfolioTwoBlockProps } from '@/payload-types'
import { unstable_cache } from 'next/cache'
import React from 'react'
import { queryProjectsGridBlock } from '@/app/_fetches'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'
import type { ProjectCardPostData } from '@/components/ProjectCard'
import { Project2Card } from '@/components/Project2Card'
import Link from "next/link"

export const PortfolioTwoBlock: React.FC<
  PortfolioTwoBlockProps & {
    id?: string
  }
> = async (props) => {
  const { 
    badge, 
    title, 
    counter_value,
    counter_suffix,
    counter_title,
    info, 
    more_label, 
    more_link, 
    categories, 
    limit: limitFromProps, 
    populateBy, 
    selectedDocs
  } = props

  const limit = limitFromProps || 3

  let projects: ProjectCardPostData[] = []
  
  if (populateBy === 'collection') {
    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    projects = await getCachedProjectsGridBlock(flattenedCategories, limit);
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Project[]

      projects = filteredSelectedPosts
    }
  }

  return (
    <div className="mil-section" style={{ background: 'linear-gradient(180deg, #021a30 0%, #010c17 100%)', padding: '120px 0', overflow: 'visible' }}>
      <div className="container">
        <div className="row mil-aie mil-mb-10">
          <div className="col-12 col-md-6 mil-sm-mb-4 mil-up">
            {badge && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 15px', background: '#ffffff', borderRadius: '30px', border: '1px solid #eef3f7', boxShadow: '0 5px 15px rgba(0,0,0,0.03)', marginBottom: '20px' }}>
                <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%' }}></div>
                <h6 style={{ color: '#64748b', margin: 0, fontSize: '12px', fontWeight: 600 }}>{badge}</h6>
              </div>
            )}
            {title && (
              <h2
                className="mil-c-m-1 mil-mb-0"
                style={{ color: '#ffffff', fontWeight: 800, fontSize: '42px', letterSpacing: '-1px' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
              />
            )}
          </div>
          <div className="col-12 col-md-6 mil-flex-column mil-aie mil-md-ais mil-up">
            {counter_value && (
              <>
                <div>
                  <span className="mil-counter mil-counter-1" data-number={counter_value} style={{ color: '#00aeef', fontSize: '60px', fontWeight: 800 }}>
                    {counter_value}
                  </span>
                  {counter_suffix && (
                    <span className="mil-sub-text-2" style={{ color: '#00aeef', fontSize: '40px', fontWeight: 800 }}>{counter_suffix}</span>
                  )}
                </div>
                {counter_title && <h6 className="mil-mt-1" style={{ color: '#ffffff' }}>{counter_title}</h6>}
              </>
            )}
          </div>
        </div>
        <div className="row" style={{ overflow: 'visible' }}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="col-12 col-md-6 col-lg-12 mil-up"
              style={{
                position: 'sticky',
                top: `${120 + index * 25}px`, // Stacks with a 25px visual offset
                zIndex: index + 1,
                alignSelf: 'flex-start',
                marginBottom: '25px'
              }}
            >
              <Project2Card doc={project} relationTo="projects" />
            </div>
          ))}
        </div>
        <div className="row mil-mt-8 mil-aic mil-up">
          <div className="col-lg-7">
            {info && <p className="" style={{ fontSize: '15px', lineHeight: 1.6, color: '#8c939e' }} dangerouslySetInnerHTML={{ __html: sanitizeHTML(info) }} />}
          </div>
          <div className="col-lg-5 mil-flex-row mil-jce mil-md-jcs">
            {more_label && more_link && (
              <Link href={more_link} className="mil-btn mil-md-mt-4" style={{ background: 'rgba(0,174,239,0.1)', color: '#00aeef', border: '1px solid rgba(0,174,239,0.2)' }}>
                <span>{more_label}</span>
                <i className="far fa-arrow-right"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const getCachedProjectsGridBlock = unstable_cache(
  async (flattenedCategories, limit) => {
    return queryProjectsGridBlock(flattenedCategories, limit);
  },
  ['projects-grid-block']
);