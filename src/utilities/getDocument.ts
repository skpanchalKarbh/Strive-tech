import type { Config } from 'src/payload-types'
import { unstable_cache } from 'next/cache'
import { getDocument } from '@/app/_fetches'

type Collection = keyof Config['collections']

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = (collection: Collection, slug: string) =>
  unstable_cache(async () => getDocument(collection, slug), [collection, slug], {
    tags: [`${collection}_${slug}`],
  })
