import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { draftMode } from 'next/headers'
import { Fragment } from 'react'
import { unstable_cache } from 'next/cache'

import type { Project } from '@/payload-types'

import { RelatedPosts } from '@/components/RelatedProjects/Component'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { queryAllProjects, queryProjectBySlug } from '@/app/_fetches'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Project({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/projects/' + decodedSlug
  
  const project = await getCachedPage(decodedSlug, draft)

  if (!project) return <PayloadRedirects url={url} />
  
  const { layout } = project

  return (
    <Fragment>
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}
      
      <RenderBlocks blocks={layout} />

      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <RelatedPosts
          limit={3}
          docs={project.relatedProjects.filter((post: Project) => typeof post === 'object')}
          postId={project.slug}
        />
      )}
    </Fragment>
  )
}

const getCachedPage = async (slug: string, draft?: boolean) =>
  draft ? await queryProjectBySlug(slug) : await unstable_cache(queryProjectBySlug, [`project-${slug}`])(slug)

export async function generateStaticParams() {
  const getCachedPages = unstable_cache(queryAllProjects, ['allProjects'])
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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const project = await getCachedPage(decodedSlug, draft)

  return generateMeta({ doc: project })
}
