import type { Project, PortfolioBlock as PortfolioBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'
import { unstable_cache } from 'next/cache'
import React from 'react'
import Link from "next/link";
import { queryProjectsGridBlock } from '@/app/_fetches'
import type { ProjectCardPostData } from '@/components/ProjectCard'
import { ProjectCard } from '@/components/ProjectCard'

export const PortfolioBlock: React.FC<
  PortfolioBlockProps & {
    id?: string
  }
> = async (props) => {
  const { 
    badge, 
    title, 
    description, 
    button_label, 
    button_link, 
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
    <div className="mil-section" style={{ background: 'linear-gradient(135deg, #010c17 0%, #021a30 100%)', padding: '120px 0' }}>
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
          <div className="col-12 col-md-6 mil-up">
            <div className="mil-flex-column mil-jce mil-aie mil-sm-ais">
              {description && (
                <p className="mil-c-m-2 mil-t-14 mil-mb-3 mil-tar" style={{ fontSize: '16px', lineHeight: '1.7', color: '#8c939e', maxWidth: '450px' }} dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }} />
              )}
              {button_label && button_link && (
                <Link href={button_link} className="mil-btn mil-link-type" style={{ color: '#00aeef', fontWeight: 700 }}>
                  <span>{button_label}</span>
                  <i className="far fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          {projects.map((project, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mil-mb-4 mil-up" style={{ transitionDelay: `${index * 0.1}s` }}>
              <ProjectCard doc={project} relationTo="projects" />
            </div>
          ))}
        </div>
        <div className="row mil-mt-4 mil-aic mil-up">
          <div className="col-lg-7">
            {info && <h4 style={{ color: '#ffffff', fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: sanitizeHTML(info) }} />}
          </div>
          <div className="col-lg-5 mil-flex-row mil-jce mil-md-jcs">
            {more_label && more_link && (
              <Link href={more_link} className="mil-btn" style={{ background: 'rgba(0,174,239,0.1)', color: '#00aeef', border: '1px solid rgba(0,174,239,0.2)' }}>
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
  ['projects-grid-block-v2']
);