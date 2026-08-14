import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Left Title (e.g., Get in Touch)',
    },
    {
      name: 'contact_items',
      type: 'array',
      label: 'Contact Items',
      labels: {
        plural: 'Contact Items',
        singular: 'Contact Item'
      },
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label (e.g., Call)',
        },
        {
          name: 'value',
          type: 'text',
          label: 'Value (e.g., +38 (068) 133-35-89)',
        },
      ],
    },
    {
      name: 'social_links',
      type: 'array',
      label: 'Social Links',
      labels: {
        plural: 'Social Items',
        singular: 'Social Item'
      },
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'icon_class',
          type: 'text',
          label: 'Icon Class (e.g., fab fa-instagram)',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
      ],
    },
    {
      name: 'desc_title',
      type: 'text',
      label: 'Right Title (e.g., Let’s Talk Strategy)',
    },
    {
      name: 'desc_content',
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
      label: 'Right Description',
    },
    {
      name: 'form_title',
      type: 'text',
      label: 'Form Section Title (e.g., Send request)',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'gmap_title',
      type: 'text',
      label: 'Map Section Title (e.g., Visit us)',
    },
    {
      name: 'gmap',
      type: 'text',
      label: 'Google Maps Link (Google Maps -> Share -> Iframe -> SRC -> Copy Link)',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Contact Sections',
    singular: 'Contact Section',
  },
}
