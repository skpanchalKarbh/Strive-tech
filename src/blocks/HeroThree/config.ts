import type { Block } from 'payload'

export const HeroThree: Block = {
  slug: 'hero_three',
  interfaceName: 'HeroThreeBlock',
  fields: [
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Video',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (use HTML like <span class="mil-c-a-1">TEXT</span> for highlighted text; will be duplicated for animation)',
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
      name: 'description',
      type: 'textarea',
      label: 'Description (use HTML like <br class="mil-lg-hidden"> for responsive line breaks; wrap in <i> for italics)',
    },
    {
      name: 'users',
      type: 'array',
      label: 'User Avatars',
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'User Image',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Hero 3 Blocks',
    singular: 'Hero 3 Block',
  },
}