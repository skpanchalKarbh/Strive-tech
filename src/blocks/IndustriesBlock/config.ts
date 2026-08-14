import type { Block } from 'payload'

export const IndustriesBlock: Block = {
  slug: 'industries_block',
  interfaceName: 'IndustriesBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
    },
    {
      name: 'industries',
      type: 'array',
      label: 'Industries',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon (White or Light recommended)',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Industry Title',
        },
      ],
    },
  ],
}
