import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import type { Page } from '@/payload-types'
import { unstable_cache } from 'next/cache'
import React, { Fragment } from 'react'
import { queryPageBySlug, queryAllPages } from '@/app/_fetches'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args): Promise<React.ReactElement | null> {
  const { slug = 'home' } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug

  let page: Page | null

  page = await getCachedPage(decodedSlug)

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = null
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { layout } = page

  return (
    <Fragment>
      <PageClient page={page} />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={layout} />
    </Fragment>
  )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const getCachedPages = unstable_cache(queryAllPages, ['allPages'])
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
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await getCachedPage(decodedSlug)

  const pageData = {
    ...page,
  }

  return generateMeta({ doc: pageData })
}

const getCachedPage = (slug: string): Promise<Page | null> =>
  unstable_cache(queryPageBySlug, [`page-${slug}`])(slug)