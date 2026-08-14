import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const AboutTeam: Block = {
  slug: 'about_team',
  interfaceName: 'AboutTeamBlock',
  fields: [
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait Photo',
      required: true,
    },
    { name: 'name', type: 'text', label: 'Full Name', required: true },
    { name: 'position', type: 'text', label: 'Position (e.g., CEO, Founder)' },
    {
      name: 'contact_items',
      type: 'array',
      label: 'Contact Info',
      labels: {
        singular: 'Contact Item',
        plural: 'Contact Items',
      },
      fields: [
        { name: 'label', type: 'text', label: 'Label (e.g., Call)' },
        { name: 'value', type: 'text', label: 'Value' },
      ],
    },
    {
      name: 'social_links',
      type: 'array',
      label: 'Social Links',
      labels: {
        singular: 'Social Link',
        plural: 'Social Links',
      },
      fields: [
        { name: 'icon_class', type: 'text', label: 'Icon Class (e.g., fab fa-linkedin-in)' },
        { name: 'url', type: 'text', label: 'URL' },
      ],
    },
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
      label: 'Intro Paragraph'
    },
    { name: 'quote', type: 'textarea', label: 'Handwritten Quote' },
    {
      name: 'bio_description',
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
      label: 'Bio Paragraph'
    },
    {
      name: 'skills',
      type: 'array',
      label: 'Skills',
      fields: [
        { name: 'name', type: 'text', label: 'Skill Name' },
        { name: 'percentage', type: 'text', label: 'Percentage (e.g., 95%)' },
      ],
    },
    {
      name: 'timeline',
      type: 'array',
      label: 'Education & Certifications',
      fields: [
        { name: 'date', type: 'text', label: 'Date / Period (e.g., 2006–2009)' },
        { name: 'title', type: 'text', label: 'Institution / Program' },
        { name: 'description', type: 'textarea', label: 'Description' },
      ],
    },
    {
      name: 'certificate_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Certificate / Diploma Image (optional)',
    },
    { 
      name: 'closing_description', 
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
      label: 'Closing Paragraph' 
    },
  ],
  labels: {
    singular: 'About Team Member Block',
    plural: 'About Team Member Blocks',
  },
}