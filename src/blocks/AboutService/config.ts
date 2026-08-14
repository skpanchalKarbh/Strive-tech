import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const AboutService: Block = {
  slug: 'about_service',
  interfaceName: 'AboutServiceBlock',
  fields: [
    { name: 'badge', type: 'text', label: 'Badge', defaultValue: 'About service' },
    {
      name: 'title',
      type: 'textarea',
      label: 'Left Title (use <br> for line breaks)',
    },
    { name: 'intro_text', type: 'textarea', label: 'Intro Paragraph (under title)' },
    {
      name: 'counter_value',
      type: 'text',
      label: 'Counter Value (e.g., 479)',
    },
    { name: 'counter_suffix', type: 'text', label: 'Counter Suffix (e.g., +)' },
    { name: 'counter_label', type: 'text', label: 'Counter Label (e.g., Projects Completed)' },
    { name: 'button_text', type: 'text', label: 'Button Text (e.g., View projects)' },
    { name: 'button_url', type: 'text', label: 'Button URL' },

    // Right side
    {
      name: 'right_title',
      type: 'textarea',
      label: 'Right Main Title (use <br> allowed)',
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
      name: 'features',
      type: 'array',
      label: 'Features / What We Do',
      fields: [
        { name: 'title', type: 'text', label: 'Feature Title', required: true },
        { name: 'description', type: 'textarea', label: 'Description' },
      ],
    },
    {
      name: 'process_title',
      type: 'text',
      label: 'Process Section Title (e.g., Our process)',
      defaultValue: 'Our process',
    },
    {
      name: 'process_steps',
      type: 'array',
      label: 'Process Steps (Timeline)',
      labels: {
        singular: 'Process Step',
        plural: 'Process Steps',
      },
      fields: [
        { name: 'title', type: 'text', label: 'Step Title', required: true },
        { name: 'description', type: 'textarea', label: 'Step Description' },
      ],
    },
    {
      name: 'deliverables_title',
      type: 'text',
      label: 'Deliverables Section Title (e.g., What You Get)',
      defaultValue: 'What You Get',
    },
    {
      name: 'deliverables',
      type: 'array',
      label: 'Deliverables',
      fields: [
        { name: 'title', type: 'text', label: 'Deliverable Title', required: true },
        { name: 'description', type: 'textarea', label: 'Description' },
      ],
    },
  ],
  labels: {
    singular: 'About Service Block',
    plural: 'About Service Blocks',
  },
}