import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { draftMode } from 'next/headers'
import React, { Fragment } from 'react'
import { unstable_cache } from 'next/cache'

import type { Team } from '@/payload-types'

import { RelatedPosts } from '@/components/RelatedTeam/Component'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { queryTeamBySlug, queryAllTeam } from '@/app/_fetches'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Team({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/team/' + decodedSlug

  const team = await getCachedPage(decodedSlug, draft)
  
  if (!team) return <PayloadRedirects url={url} />

  const { layout } = team

  return (
    <Fragment>
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={layout} />

      {team.relatedTeam && team.relatedTeam.length > 0 && (
        <RelatedPosts
          limit={4}
          docs={team.relatedTeam.filter((post: Team) => typeof post === 'object')}
          postId={team.slug}
        />
      )}
    </Fragment>
  )
}

const getCachedPage = async (slug: string, draft?: boolean) =>
  draft ? queryTeamBySlug(slug) : unstable_cache(queryTeamBySlug, [`team-${slug}`])(slug)

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const team = await getCachedPage(decodedSlug, draft)

  return generateMeta({ doc: team })
}

export async function generateStaticParams() {
  const getCachedPages = unstable_cache(queryAllTeam, ['allTeam'])
  const pages = await getCachedPages()

  if (!Array.isArray(pages)) {
    console.error('Expected an array of pages, but got:', pages);
    return [];
  }

  return pages
    .filter((page) => page?.slug)
    .map(({ slug }) => {
      return {
        slug
      }
    })
}
