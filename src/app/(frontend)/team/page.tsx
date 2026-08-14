import type { Metadata } from 'next/types'

import { CollectionTeam } from '@/components/CollectionTeam'
import { Pagination } from '@/components/Pagination'
import PageClient from './page.client'
import { unstable_cache } from 'next/cache'
import { getCachedGlobal, getCachedGlobalMeta } from '@/utilities/getGlobals'
import type { TeamPage, Page } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'
import { generateMeta } from '@/utilities/generateMeta'
import { queryTeam } from '@/app/_fetches'

export default async function Page() {
  const teamData: TeamPage = await getCachedGlobal('team_page', 0)()
  const limit = 8;
  const team = await getCachedTeam(limit);

  return (
    <>
      <PageClient />

      {teamData.layout_before &&
      <RenderBlocks blocks={teamData.layout_before} />
      }

      <div className="mil-section" style={{ background: '#ffffff', padding: '90px 0' }}>
        <div className="container">
            <div className="row mil-aie mil-mb-10" style={{ marginBottom: '50px' }}>
                <div className="col-12 col-md-6 mil-sm-mb-4">
                    {teamData.badge && (
                      <div className="mil-badge mil-mb-4" style={{ display: 'inline-block', background: 'rgba(0, 174, 239, 0.1)', color: '#00aeef', border: '1px solid rgba(0, 174, 239, 0.25)', borderRadius: '30px', padding: '6px 16px', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>
                        {teamData.badge}
                      </div>
                    )}
                    {teamData.title && (
                      <h2 
                        style={{ color: '#021a30', fontSize: '38px', fontWeight: 700, lineHeight: '1.2' }} 
                        dangerouslySetInnerHTML={{ __html: sanitizeHTML(teamData.title) }} 
                      />
                    )}
                </div>
                <div className="col-12 col-md-6">
                    <div className="mil-flex-column mil-jce">
                        {teamData.description && (
                          <p 
                            style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.6', margin: 0 }} 
                            dangerouslySetInnerHTML={{ __html: sanitizeHTML(teamData.description) }} 
                          />
                        )}
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

export async function generateMetadata(): Promise<Metadata> {
  const teamData: TeamPage = await getCachedGlobalMeta('team_page', 1)()
  const pageTeamData: Page = {
    id: '',
    title: '',
    updatedAt: '',
    createdAt: '',
    layout: [],
    meta: teamData.meta,
    slug: "team"
  }

  return generateMeta({doc: pageTeamData})
}

const getCachedTeam = unstable_cache(
  async (limit) => {
    return queryTeam(1, limit);
  },
  ['team-grid']
);