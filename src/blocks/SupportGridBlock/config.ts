import type { Block } from 'payload'

export const SupportGridBlock: Block = {
  slug: 'support_grid_block',
  interfaceName: 'SupportGridBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Grid Items',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon (White line-art recommended)',
        },
        {
          name: 'text',
          type: 'text',
          label: 'Text',
        },
      ],
    },
  ],
}
