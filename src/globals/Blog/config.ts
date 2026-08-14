import type { GlobalConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Blog: GlobalConfig = {
  slug: 'blog',
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
              name: 'layout_before',
              type: 'blocks',
              blockReferences: [
                'reusable_block',
              ],
              blocks: [],
              required: false,
              admin: {
                initCollapsed: true,
              },
              label: 'Layout Builder',
              labels: {
                singular: 'Block',
                plural: 'Blocks',
              },
            },
          ],
          label: 'Layout (before)',
        },
        {
          fields: [
            {
              name: 'layout_after',
              type: 'blocks',
              blockReferences: [
                'reusable_block',
              ],
              blocks: [],
              required: false,
              admin: {
                initCollapsed: true,
              },
              label: 'Layout Builder',
              labels: {
                singular: 'Block',
                plural: 'Blocks',
              },
            },
          ],
          label: 'Layout (after)',
        },
        {
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Badge',
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
          label: 'Heading',
        },
        {
          fields: [
            {
              name: 'post_layout_after',
              type: 'blocks',
              blockReferences: [
                'reusable_block',
              ],
              blocks: [],
              required: false,
              admin: {
                initCollapsed: true,
              },
              label: 'Layout Builder',
              labels: {
                singular: 'Block',
                plural: 'Blocks',
              },
            },
          ],
          label: 'Post Layout (after)',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
}
