import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Config, ReusableContent } from 'src/payload-types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedPayload: any;

const getCachedPayload = async () => {
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config: configPromise });
  }
  return cachedPayload;
};

const logQueryExecution = async <T>(queryName: string, queryFn: () => Promise<T>): Promise<T> => {
  const start = Date.now();
  try {
    const result = await queryFn();
    const duration = Date.now() - start;
    console.log(`[Query Log] ${queryName} executed in ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[Query Log] ${queryName} failed after ${duration}ms`, error);
    throw error;
  }
};

/* globals */

type Global = keyof Config['globals']

export const getGlobal = async (slug: Global, depth = 0) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load global: ' + '[' + slug + ']', async () => {
    return await payload.findGlobal({
      slug,
      depth,
    })
  })
}

export const getGlobalMeta = async (slug: Global, depth = 0) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load global meta: ' + '[' + slug + ']', async () => {
    return await payload.findGlobal({
      slug,
      depth,
      select: {
        meta: true
      }
    })
  })
}

/* pages */

export const queryAllPages = async () => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load all pages slugs', async () => {
    const result = await payload.find({
      collection: 'pages',
      depth: 0,
      limit: 50,
      select: {
        slug: true,
      },
    })
    return result.docs
  })
}

export const queryPageBySlug = async (slug: string) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load page layout: ' + '[' + slug + ']', async () => {
    const result = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1,
      pagination: false,
      overrideAccess: false,
      depth: 0,
      where: {
        slug: {
          equals: slug,
        },
      },
        // Select fields to match the generated `Page` type in `payload-types`
        select: {
          id: true,
          title: true,
          layout: true,
          meta: {
            image: true,
            description: true,
            title: true,
          },
          publishedAt: true,
          headerStyle: true,
          footerLayout: true,
          slug: true,
          updatedAt: true,
          createdAt: true,
          _status: true,
        },
        // Populate media fields so `meta.image` resolves to `Media` object
        populate: {
          meta: {
            image: true,
          },
        },
    })
    return result.docs?.[0] || null
  })
}

export const queryLayoutBlocks = async (id: string | ReusableContent) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load reusable content: ' + '[id: ' + id + ']', async () => {
    const result = await payload.find({
      collection: 'reusable-content',
      draft: false,
      limit: 1,
      pagination: false,
      overrideAccess: false,
      depth: 1,
      where: {
        id: {
          equals: id,
        },
      },
    })
    return result.docs?.[0]
  })
}

/* posts */

export const queryPosts = async (page: number, limit: number) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load posts collection: ' + '[page: ' + page + ', limit: '+ limit +']', async () => {
    return await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      page,
      select: {
        meta: true,
        heroImage: true,
        title: true,
        slug: true,
        categories: true,
        authors: true,
        publishedAt: true,
      },
      populate: {
        authors: {
          name: true,
          avatar: true,
        },
        categories: {
          title: true,
        },
      },
      sort: '-publishedAt',
    })
  })
}

export const queryAllPosts = async () => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load all posts slugs', async () => {
    const result = await payload.find({
      collection: 'posts',
      depth: 0,
      limit: 100,
      select: {
        slug: true,
      },
      sort: '-publishedAt',
    })
    return result.docs
  })
}

export const queryPostBySlug = async (slug: string) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load post: ' + '[' + slug + ']', async () => {
    const result = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1,
      overrideAccess: false,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    return result.docs?.[0] || null
  })
}

export const queryBlogArchivePosts = async (flattenedCategories: (string | undefined)[], limit: number) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load block[archive] posts', async () => {
    const result = await payload.find({
      collection: 'posts',
      sort: '-publishedAt',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
      select: {
        meta: {
          image: true,
          description: true,
        },
        title: true,
        slug: true,
        categories: true,
        authors: true,
        publishedAt: true,
      },
      populate: {
        authors: {
          name: true,
          avatar: true,
        },
        categories: {
          title: true,
        },
      },
    })
    const cleanedDocs = result.docs.map((doc: typeof result.docs[number]) => {
      const { authors: _authors, ...cleanDoc } = doc;
      return cleanDoc;
    });
    return cleanedDocs;
  })
}

export const queryBlogRelatedPosts = async (selectedPostsIds: (string | undefined)[], limit: number) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load block[related] posts', async () => {
    const result = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      where: {
        id: {
          in: selectedPostsIds,
        },
      },
      sort: '-publishedAt',
      select: {
        meta: {
          image: true,
          description: true,
        },
        title: true,
        slug: true,
        categories: true,
        authors: true,
        publishedAt: true,
      },
      populate: {
        authors: {
          name: true,
          avatar: true,
        },
        categories: {
          title: true,
        },
      },
    })
    return result.docs
  })
}

export const queryPostsTotalCount = async () => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load posts count', async () => {
    return await payload.count({
      collection: 'posts',
      overrideAccess: false,
    })
  })
}

/* projects */

export const queryProjects = async (page: number, limit: number) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load projects collection: ' + '[page: ' + page + ', limit: '+ limit +']', async () => {
    return await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
      page,
      select: {
        meta: {
          image: true,
        },
        title: true,
        short_description: true,
        price: true,
        publishedAt: true,
        slug: true,
        categories: true,
        tag: true,
      },
      sort: 'order',
    })
  })
}

export const queryAllProjects = async () => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load all projects slugs', async () => {
    const result = await payload.find({
      collection: 'projects',
      limit: 50,
      depth: 0,
      select: {
        slug: true,
      },
    })
    return result.docs
  })
}

export const queryProjectBySlug = async ( slug: string ) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load project: ' + '[' + slug + ']', async () => {
    const result = await payload.find({
      collection: 'projects',
      draft: false,
      limit: 1,
      depth: 0,
      overrideAccess: false,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
      select: {
        title: true,
        layout: true,
        meta: true,
        relatedProjects: true,
      },
    })
    const doc = result.docs?.[0];
    if (!doc?.relatedProjects?.length) return doc ?? null;

    const related = await payload.find({
      collection: 'projects',
      where: {
        id: { in: doc.relatedProjects },
      },
      depth: 1,
      select: {
        title: true,
        short: true,
        slug: true,
        meta: { image: true },
        categories: true,
        tag: true,
      },
    });

    doc.relatedProjects = related.docs;
    
    return doc;
  })
}

export const queryProjectsGridBlock = async (flattenedCategories: (string | undefined)[], limit: number) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load block[portfolio grid] projects', async () => {
    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
      sort: 'order',
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
      select: {
        meta: {
          image: true,
        },
        title: true,
        short_description: true,
        price: true,
        publishedAt: true,
        slug: true,
        categories: true,
        tag: true,
      },
    })
    return result.docs
  })
}

export const queryProjectsRelatedPosts = async (selectedPostsIds: (string | undefined)[], limit: number) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load block[related] projects', async () => {
    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
      where: {
        id: {
          in: selectedPostsIds,
        },
      },
      select: {
        meta: {
          image: true,
        },
        title: true,
        short_description: true,
        price: true,
        publishedAt: true,
        slug: true,
        categories: true,
        tag: true,
      },
      sort: 'order',
    })
    return result.docs
  })
}

export const queryProjectsTotalCount = async () => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load projects count', async () => {
    return await payload.count({
      collection: 'projects',
      overrideAccess: false,
    })
  })
}

/* services */

export const queryServices = async (page: number, limit: number) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load services collection: ' + '[page: ' + page + ', limit: '+ limit +']', async () => {
    return await payload.find({
      collection: 'services',
      depth: 0,
      limit,
      overrideAccess: false,
      page,
      select: {
        title: true,
        list: true,
        short: true,
        slug: true,
        meta: {
          image: true,
        },
      },
      sort: 'order',
    })
  })
}

export const queryServiceBySlug = async (slug: string) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load service: ' + '[' + slug + ']', async () => {
    const result = await payload.find({
      collection: 'services',
      draft: false,
      limit: 1,
      depth: 0,
      overrideAccess: false,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
      select: {
        title: true,
        layout: true,
        meta: true,
        relatedServices: true,
      }
    })
    const doc = result.docs?.[0];
    if (!doc?.relatedServices?.length) return doc ?? null;

    const related = await payload.find({
      collection: 'services',
      where: {
        id: { in: doc.relatedServices }, // масив ID
      },
      depth: 1,
      select: {
        title: true,
        short: true,
        slug: true,
        meta: { image: true },
      },
    });

    doc.relatedServices = related.docs;

    return doc;
  })
}

export const queryAllServices = async () => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load all services slugs', async () => {
    const result = await payload.find({
      collection: 'services',
      limit: 50,
      depth: 0,
      select: {
        slug: true,
      },
    })
    return result.docs
  })
}

export const queryServicesRelatedPosts = async (selectedPostsIds: (string | undefined)[], limit: number) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load block[related] services', async () => {
    const result = await payload.find({
      collection: 'services',
      depth: 1,
      limit,
      where: {
        id: {
          in: selectedPostsIds,
        },
      },
      select: {
        title: true,
        list: true,
        short: true,
        slug: true,
        meta: {
          image: true,
        },
      },
      sort: 'order',
    })
    return result.docs
  })
}

export const queryServicesTotalCount = async () => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load services count', async () => {
    return await payload.count({
      collection: 'services',
      overrideAccess: false,
    })
  })
}

/* team */

export const queryTeam = async (page: number, limit: number) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load team collection: ' + '[page: ' + page + ', limit: '+ limit +']', async () => {
    return await payload.find({
      collection: 'team',
      depth: 1,
      limit,
      overrideAccess: false,
      page,
      select: {
        title: true,
        short: true,
        slug: true,
        meta: {
          image: true,
        },
      },
      sort: 'order',
    })
  })
}

export const queryTeamBySlug = async (slug: string) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load team: ' + '[' + slug + ']', async () => {
    const result = await payload.find({
      collection: 'team',
      draft: false,
      limit: 1,
      depth: 0,
      overrideAccess: false,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
      select: {
        title: true,
        layout: true,
        meta: true,
        relatedTeam: true,
      }
    })
    const doc = result.docs?.[0];
    if (!doc?.relatedTeam?.length) return doc ?? null;

    const related = await payload.find({
      collection: 'team',
      where: {
        id: { in: doc.relatedTeam },
      },
      depth: 1,
      select: {
        title: true,
        short: true,
        slug: true,
        meta: { image: true },
      },
    });

    doc.relatedTeam = related.docs;

    return doc;
  })
}

export const queryAllTeam = async () => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load all team slugs', async () => {
    const result = await payload.find({
      collection: 'team',
      limit: 50,
      depth: 0,
      select: {
        slug: true,
      },
    })
    return result.docs
  })
}

export const queryTeamBlock = async (flattenedCategories: (string | undefined)[], limit: number) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load block[team block] team', async () => {
    const result = await payload.find({
      collection: 'team',
      depth: 1,
      limit,
      sort: 'order',
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
      select: {
        meta: {
          image: true,
        },
        title: true,
        short: true,
        slug: true,
      },
    })
    return result.docs
  })
}

export const queryTeamRelatedPosts = async (selectedPostsIds: (string | undefined)[], limit: number) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load block[related] team', async () => {
    const result = await payload.find({
      collection: 'team',
      depth: 1,
      limit,
      where: {
        id: {
          in: selectedPostsIds,
        },
      },
      select: {
        meta: {
          image: true,
        },
        title: true,
        short: true,
        slug: true,
      },
      sort: 'order',
    })
    return result.docs
  })
}

export const queryTeamTotalCount = async () => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load team count', async () => {
    return await payload.count({
      collection: 'team',
      overrideAccess: false,
    })
  })
}

/* document */

type Collection = keyof Config['collections']

export const getDocument = async (collection: Collection, slug: string, depth = 0) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load document: ' + '[' + slug + ']', async () => {
    const page = await payload.find({
      collection,
      depth,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    return page.docs[0]
  })
}

/* redirects */

export const getRedirects = async (depth = 1) => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load redirects', async () => {
    const { docs: redirects } = await payload.find({
      collection: 'redirects',
      depth,
      limit: 0,
      pagination: false,
    })
    return redirects
  })
}

/* sitemap */

export const queryPagesSitemap = async () => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load pages sitemap', async () => {
    return await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })
  })
}

export const queryPostsSitemap = async () => {
  const payload = await getCachedPayload();
  return logQueryExecution('-payload load posts sitemap', async () => {
    return await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })
  })
}