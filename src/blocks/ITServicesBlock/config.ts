import type { Block } from 'payload'

export const ITServicesBlock: Block = {
  slug: 'it_services_block',
  interfaceName: 'ITServicesBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Service Cards',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Card Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Card Description',
        },
      ],
    },
  ],
}
