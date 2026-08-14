import type { Metadata } from 'next/types'

import { CollectionTeam } from '@/components/CollectionTeam'
import { Pagination } from '@/components/Pagination'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

import { getCachedGlobal, getCachedGlobalMeta } from '@/utilities/getGlobals'
import type { TeamPage } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'
import { queryTeam, queryTeamTotalCount } from '@/app/_fetches'

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const teamData: TeamPage = await getCachedGlobal('team_page', 0)()
  const limit = 8;
  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const team = await queryTeam(sanitizedPageNumber, limit)
  
  return (
    <>
      <PageClient />

      {teamData.layout_before &&
      <RenderBlocks blocks={teamData.layout_before} />
      }

      <div className="mil-section mil-p-10-6">
        <div className="container">
            <div className="row mil-aie mil-mb-10">
                <div className="col-12 col-md-6 mil-sm-mb-4">
                    {teamData.badge && <div className="mil-badge mil-mb-4">{teamData.badge}</div>}
                    {teamData.title && <h2 className="mil-c-m-1" dangerouslySetInnerHTML={{ __html: sanitizeHTML(teamData.title) }} />}
                </div>
                <div className="col-12 col-md-6">
                    <div className="mil-flex-column mil-jce">
                        {teamData.description && <p className="mil-c-m-2 mil-t-16" dangerouslySetInnerHTML={{ __html: sanitizeHTML(teamData.description) }} />}
                    </div>
                </div>
            </div>
            
            <CollectionTeam posts={team.docs} />

            {team.totalPages > 1 && team.page && (
              <Pagination pageType={"team"} page={team.page} totalPages={team.totalPages} />
            )}
        </div>
      </div>

      {teamData.layout_after &&
      <RenderBlocks blocks={teamData.layout_after} />
      }
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  const teamData: TeamPage = await getCachedGlobalMeta('team_page', 1)()
  
  return {
    title: `${teamData.meta?.title} | Page ${pageNumber || ''} | Lumex Template`,
  }
}

export async function generateStaticParams() {
  const { totalDocs } = await queryTeamTotalCount()

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
