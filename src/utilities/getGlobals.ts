import { getGlobal, getGlobalMeta } from '@/app/_fetches'
import { unstable_cache } from 'next/cache'
import type { Config } from 'src/payload-types'

type Global = keyof Config['globals']

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })

export const getCachedGlobalMeta = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobalMeta(slug, depth), [slug], {
    tags: [`global_meta_${slug}`],
  })