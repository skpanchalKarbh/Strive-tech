import type { CollectionSlug, Payload, PayloadRequest } from 'payload'

const collections: CollectionSlug[] = []

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')
  console.log('Seeding database...', req.url)

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)
  console.log('— Clearing collections and globals...', collections)

  // clear the database

  payload.logger.info(`— Seeding demo author and user...`)

  payload.logger.info(`— Seeding media...`)

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order

  // update each post with related posts

  payload.logger.info(`— Seeding contact form...`)

  payload.logger.info(`— Seeding pages...`)

  payload.logger.info(`— Seeding globals...`)

  payload.logger.info('Seeded database successfully!')
}
