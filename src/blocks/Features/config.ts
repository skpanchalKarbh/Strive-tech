import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Features: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (use HTML like <br> for line breaks, use span like <span class="mil-c-m-2">TEXT</span> for highlighted text)',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Description',
    },
    {
      name: 'button1_text',
      type: 'text',
      label: 'Button 1 Text',
    },
    {
      name: 'button1_url',
      type: 'text',
      label: 'Button 1 URL',
    },
    {
      name: 'button2_text',
      type: 'text',
      label: 'Button 2 Text',
    },
    {
      name: 'button2_url',
      type: 'text',
      label: 'Button 2 URL',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description (use HTML like <br> for responsive line breaks)',
        },
      ],
    },
  ],
  labels: {
    plural: 'Features Blocks',
    singular: 'Features Block',
  },
}