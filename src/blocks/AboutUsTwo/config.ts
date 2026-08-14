import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const AboutUsTwo: Block = {
  slug: 'about_us_two',
  interfaceName: 'AboutUsTwoBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (use HTML like <br> for line breaks)',
    },
    {
      name: 'left_description',
      type: 'textarea',
      label: 'Left Description (use HTML like <br> for line breaks)',
    },
    {
      name: 'counter_value',
      type: 'text',
      label: 'Counter Value (e.g., 479; used for data-number and display)',
    },
    {
      name: 'counter_suffix',
      type: 'text',
      label: 'Counter Suffix (e.g., +)',
    },
    {
      name: 'counter_title',
      type: 'text',
      label: 'Counter Title (e.g., Projects Completed)',
    },
    {
      name: 'right_description1',
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
      label: 'Right Description 1',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image (with overlay)',
    },
    {
      name: 'right_description2',
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
      label: 'Right Description 2',
    },
    {
      name: 'timeline',
      type: 'array',
      label: 'Timeline Items',
      maxRows: 10,
      fields: [
        {
          name: 'period',
          type: 'text',
          label: 'Period (e.g., 2006–2009)',
        },
        {
          name: 'head_title',
          type: 'text',
          label: 'Head Title (e.g., Harvard Business School)',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description (use HTML like <br> for line breaks)',
        },
      ],
    },
    {
      name: 'right_description3',
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
      label: 'Right Description 3',
    },
    {
      name: 'button1_text',
      type: 'text',
      label: 'Bottom Button 1 Text (e.g., Read more)',
    },
    {
      name: 'button1_url',
      type: 'text',
      label: 'Bottom Button 1 URL',
    },
    {
      name: 'button2_text',
      type: 'text',
      label: 'Bottom Button 2 Text (e.g., Let\'s Talk)',
    },
    {
      name: 'button2_url',
      type: 'text',
      label: 'Bottom Button 2 URL',
    },
  ],
  labels: {
    plural: 'About Us Two Blocks',
    singular: 'About Us Two Block',
  },
}