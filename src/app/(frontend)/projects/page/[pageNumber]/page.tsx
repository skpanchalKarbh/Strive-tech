import type { Metadata } from 'next/types'

import { CollectionProjects } from '@/components/CollectionProjects'
import { Pagination } from '@/components/Pagination'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { getCachedGlobal, getCachedGlobalMeta } from '@/utilities/getGlobals'
import type { ProjectsPage } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'
import { queryProjects, queryProjectsTotalCount } from '@/app/_fetches'

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const projectsData: ProjectsPage = await getCachedGlobal('projects_page', 0)()

  const sanitizedPageNumber = Number(pageNumber)
  const limit = 6;
  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const projects = await queryProjects(sanitizedPageNumber, limit);

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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  const projectsData: ProjectsPage = await getCachedGlobalMeta('projects_page', 1)()

  return {
    title: `${projectsData.meta?.title} | Page ${pageNumber || ''} | Lumex Template`,
  }
}

export async function generateStaticParams() {
  const { totalDocs } = await queryProjectsTotalCount()

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}