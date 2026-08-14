import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const AboutUsThree: Block = {
  slug: 'about_us_three',
  interfaceName: 'AboutUsThreeBlock',
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
      name: 'button1_text',
      type: 'text',
      label: 'Button 1 Text (e.g., Services)',
    },
    {
      name: 'button1_url',
      type: 'text',
      label: 'Button 1 URL',
    },
    {
      name: 'button2_text',
      type: 'text',
      label: 'Button 2 Text (e.g., Let\'s Talk)',
    },
    {
      name: 'button2_url',
      type: 'text',
      label: 'Button 2 URL',
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
      name: 'youtube_video_link',
      type: 'text',
      label: 'YouTube Video Link (Optional, overrides image if provided)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image (with overlay, Fallback)',
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
      name: 'skills',
      type: 'array',
      label: 'Skills',
      maxRows: 10,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Skill Name (e.g., Strategic Thinking)',
        },
        {
          name: 'percentage',
          type: 'text',
          label: 'Percentage (e.g., 85%; used for data-value and display)',
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
      name: 'vision_mission_goals',
      type: 'array',
      label: 'Vision, Mission, Goal',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title (e.g., Vision)',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
        },
      ],
    },
  ],
  labels: {
    plural: 'About Us Three Blocks',
    singular: 'About Us Three Block',
  },
}