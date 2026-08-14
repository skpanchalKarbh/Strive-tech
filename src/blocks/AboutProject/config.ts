import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const AboutProject: Block = {
  slug: 'about_project',
  interfaceName: 'AboutProjectBlock',
  fields: [
    { name: 'badge', type: 'text', label: 'Badge', defaultValue: 'About project' },
    {
      name: 'title',
      type: 'textarea',
      label: 'Project Title (use <br class="mil-md-hidden"> for responsive line break)',
    },
    {
      name: 'info_items',
      type: 'array',
      label: 'Project Info',
      labels: {
        singular: 'Info Item',
        plural: 'Info Items',
      },
      fields: [
        { name: 'label', type: 'text', label: 'Label (e.g., Client)' },
        { name: 'value', type: 'text', label: 'Value' },
        { name: 'url', type: 'text', label: 'URL (optional – makes value a link)' },
      ],
    },

    // Right side content
    { name: 'intro_title', type: 'text', label: 'Intro Title', defaultValue: 'About Project' },
    {
      name: 'intro_description',
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
      label: 'Intro Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Project Image (with overlay)',
    },

    { name: 'approach_title', type: 'text', label: 'Approach Title', defaultValue: 'Our Approach' },
    {
      name: 'approach_description',
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
      label: 'Approach Description',
    },

    { name: 'delivered_title', type: 'text', label: 'What We Delivered Title', defaultValue: 'What We Delivered' },
    {
      name: 'delivered_items',
      type: 'array',
      label: 'Delivered Items',
      labels: {
        singular: 'Delivered Item',
        plural: 'Delivered Items',
      },
      fields: [
        { name: 'title', type: 'text', label: 'Item Title (bold)' },
        { name: 'description', type: 'text', label: 'Description' },
      ],
    },

    { name: 'goals_title', type: 'text', label: 'Key Goals Title', defaultValue: 'Key Goals' },
    {
      name: 'goals_items',
      type: 'array',
      label: 'Key Goals',
      labels: {
        singular: 'Goal Item',
        plural: 'Goal Items',
      },
      fields: [
        { name: 'title', type: 'text', label: 'Goal Title (bold)' },
        { name: 'description', type: 'text', label: 'Description' },
      ],
    },

    { name: 'results_title', type: 'text', label: 'Results Title', defaultValue: 'Results' },
    {
      name: 'results_items',
      type: 'array',
      label: 'Results',
      labels: {
        singular: 'Result Item',
        plural: 'Result Items',
      },
      fields: [
        { name: 'title', type: 'text', label: 'Result Title (bold)' },
        { name: 'description', type: 'text', label: 'Description' },
      ],
    },

    { name: 'conclusion_title', type: 'text', label: 'Conclusion Title', defaultValue: 'Conclusion' },
    {
      name: 'conclusion_description',
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
      label: 'Conclusion Description',
    },
  ],
  labels: {
    singular: 'About Project Block',
    plural: 'About Project Blocks',
  },
}