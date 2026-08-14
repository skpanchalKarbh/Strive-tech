import type { Block } from 'payload'

export const HeroFour: Block = {
  slug: 'hero_four',
  interfaceName: 'HeroFourBlock',
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
      name: 'title',
      type: 'textarea',
      label: 'Title (use HTML like <br> for line breaks, use span like <span class="mil-opacity-text">TEXT</span> for highlighted text)',
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
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Right Side Background Image',
    },
  ],
  labels: {
    plural: 'Hero Four Blocks',
    singular: 'Hero Four Block',
  },
}