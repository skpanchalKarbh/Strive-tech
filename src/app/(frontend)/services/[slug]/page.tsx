import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { draftMode } from 'next/headers'
import React, { Fragment } from 'react'
import { unstable_cache } from 'next/cache'

import type { Service } from '@/payload-types'

import { RelatedPosts } from '@/components/RelatedServices/Component'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { queryServiceBySlug, queryAllServices } from '@/app/_fetches'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Service({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/services/' + decodedSlug

  const service = await getCachedPage(decodedSlug, draft)
  
  if (!service) return <PayloadRedirects url={url} />

  const { layout } = service

  return (
    <Fragment>
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={layout} />

      {service.relatedServices && service.relatedServices.length > 0 && (
        <RelatedPosts
          limit={3}
          docs={service.relatedServices.filter((post: Service) => typeof post === 'object')}
          postId={service.slug}
        />
      )}
    </Fragment>
  )
}

const getCachedPage = async (slug: string, draft?: boolean) =>
  draft ? queryServiceBySlug(slug) : unstable_cache(queryServiceBySlug, [`service-${slug}`])(slug)

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const service = await getCachedPage(decodedSlug, draft)

  return generateMeta({ doc: service })
}

export async function generateStaticParams() {
  const getCachedPages = unstable_cache(queryAllServices, ['allServices'])
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
