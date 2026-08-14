import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ServicesTwo: Block = {
  slug: 'services_two',
  interfaceName: 'ServicesTwoBlock',
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
      name: 'services',
      type: 'array',
      label: 'Services',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'title',
          type: 'textarea',
          label: 'Service Title (use HTML like <br> for line breaks)',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Service Description (use HTML like <br> for line breaks)',
        },
        {
          name: 'list',
          type: 'array',
          label: 'List Items',
          maxRows: 10,
          fields: [
            {
              name: 'item',
              type: 'text',
              label: 'List Item',
            },
          ],
        },
        {
          name: 'button_text',
          type: 'text',
          label: 'Service Button Text',
        },
        {
          name: 'button_url',
          type: 'text',
          label: 'Service Button URL',
        },
      ],
    },
  ],
  labels: {
    plural: 'Services Two',
    singular: 'Services Two',
  },
}