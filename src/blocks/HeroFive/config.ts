import type { Block } from 'payload'

export const HeroFive: Block = {
  slug: 'hero_five',
  interfaceName: 'HeroFiveBlock',
  fields: [
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Icon',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      minRows: 3,
      fields: [
        {
          name: 'bgImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image (each slide pairs a background image with a title)',
          required: true,
        },
        {
          name: 'title',
          type: 'textarea',
          label: 'Title (use HTML like <br class="mil-lg-hidden"> for responsive breaks and <span class="mil-opacity-text">TEXT</span> for highlights)',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (use HTML like <br> for responsive line breaks)',
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
  ],
  labels: {
    plural: 'Hero Five Blocks',
    singular: 'Hero Five Block',
  },
}