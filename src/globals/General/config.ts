import type { GlobalConfig } from 'payload'

export const General: GlobalConfig = {
  slug: 'general',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'bgImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Image',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Subtitle',
            },
            {
              name: 'title',
              type: 'textarea',
              label: 'Title (use HTML like <br> for line breaks, use span like <span class="mil-opacity-text">TEXT</span> for highlighted text)',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description (use HTML like <br> for line breaks)',
            },
          ],
          name: 'not_found',
          label: '404 Page',
        },
      ],
    },
  ],
}
