import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import PageClient from './page.client'
import { unstable_cache } from 'next/cache'

import { getCachedGlobal, getCachedGlobalMeta } from '@/utilities/getGlobals'
import type { Blog, Page } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'
import { generateMeta } from '@/utilities/generateMeta'

import { queryPosts } from '@/app/_fetches'

export default async function Page() {
  const blogData: Blog = await getCachedGlobal('blog', 0)()
  const limit = 6;
  const posts = await getCachedPosts(limit);

  return (
    <>
      <PageClient />
      
      {blogData.layout_before &&
      <RenderBlocks blocks={blogData.layout_before} />
      }
      
      <div className="mil-section" style={{ background: '#ffffff', padding: '90px 0' }}>
        <div className="container">
          <div className="row mil-aie mil-mb-10" style={{ marginBottom: '50px' }}>
              <div className="col-12 col-md-6 mil-sm-mb-4">
                  {blogData.badge && (
                    <div className="mil-badge mil-mb-4" style={{ display: 'inline-block', background: 'rgba(0, 174, 239, 0.1)', color: '#00aeef', border: '1px solid rgba(0, 174, 239, 0.25)', borderRadius: '30px', padding: '6px 16px', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>
                      {blogData.badge}
                    </div>
                  )}
                  {blogData.title && (
                    <h2 
                      style={{ color: '#021a30', fontSize: '38px', fontWeight: 700, lineHeight: '1.2' }} 
                      dangerouslySetInnerHTML={{ __html: sanitizeHTML(blogData.title) }} 
                    />
                  )}
              </div>
              <div className="col-12 col-md-6">
                  <div className="mil-flex-column mil-jce">
                      {blogData.description && (
                        <p 
                          style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.6', margin: 0 }} 
                          dangerouslySetInnerHTML={{ __html: sanitizeHTML(blogData.description) }} 
                        />
                      )}
                  </div>
              </div>
          </div>

          <CollectionArchive posts={posts.docs} />

          {posts.totalPages > 1 && posts.page && (
            <Pagination pageType={"posts"} page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </div>
      
      {blogData.layout_after &&
      <RenderBlocks blocks={blogData.layout_after} />
      }
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const blogData: Blog = await getCachedGlobalMeta('blog', 1)()
  const pageBlogData: Page = {
    id: '',
    title: '',
    updatedAt: '',
    createdAt: '',
    layout: [],
    meta: blogData.meta,
    slug: "posts"
  }

  return generateMeta({doc: pageBlogData})
}

const getCachedPosts = unstable_cache(
  async (limit) => {
    return queryPosts(1, limit);
  },
  ['blog-latest-posts']
);