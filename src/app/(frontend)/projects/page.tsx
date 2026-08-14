import type { Metadata } from 'next/types'

import { CollectionProjects } from '@/components/CollectionProjects'
import { Pagination } from '@/components/Pagination'
import PageClient from './page.client'
import { unstable_cache } from 'next/cache'
import { getCachedGlobal, getCachedGlobalMeta } from '@/utilities/getGlobals'
import type { ProjectsPage, Page } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'
import { generateMeta } from '@/utilities/generateMeta'
import { queryProjects } from '@/app/_fetches'

export default async function Page() {
  const projectsData: ProjectsPage = await getCachedGlobal('projects_page', 0)()
  const limit = 6;
  const projects = await getCachedProjects(limit);

  return (
    <>
      <PageClient />

      {projectsData.layout_before &&
      <RenderBlocks blocks={projectsData.layout_before} />
      }

      <div className="mil-section mil-gray-section mil-p-10-10">
        <div className="container">
          <div className="row mil-aie mil-mb-10">
              <div className="col-12 col-md-6 mil-sm-mb-4">
                  {projectsData.badge && <div className="mil-badge mil-mb-4">{projectsData.badge}</div>}
                  {projectsData.title && <h2 className="mil-c-m-1" dangerouslySetInnerHTML={{ __html: sanitizeHTML(projectsData.title) }} />}
              </div>
              <div className="col-12 col-md-6">
                  <div className="mil-flex-column mil-jce">
                      {projectsData.description && <p className="mil-c-m-2 mil-t-16" dangerouslySetInnerHTML={{ __html: sanitizeHTML(projectsData.description) }} />}
                  </div>
              </div>
          </div>
          
          <CollectionProjects projects={projects.docs} columns={"3"} container="fluid" />

          {projects.totalPages > 1 && projects.page && (
            <Pagination pageType={"projects"} page={projects.page} totalPages={projects.totalPages} />
          )}
        </div>
      </div>

      {projectsData.layout_after &&
      <RenderBlocks blocks={projectsData.layout_after} />
      }
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const projectsData: ProjectsPage = await getCachedGlobalMeta('projects_page', 1)()
  const pageProjectsData: Page = {
    id: '',
    title: '',
    updatedAt: '',
    createdAt: '',
    layout: [],
    meta: projectsData.meta,
    slug: "projects"
  }

  return generateMeta({doc: pageProjectsData})
}

const getCachedProjects = unstable_cache(
  async (limit) => {
    return queryProjects(1, limit);
  },
  ['projects-grid-v2']
);