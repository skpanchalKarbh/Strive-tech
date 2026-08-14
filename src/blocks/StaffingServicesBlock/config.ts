import type { Block } from 'payload'

export const StaffingServicesBlock: Block = {
  slug: 'staffing_services_block',
  interfaceName: 'StaffingServicesBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge (Top)',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Main Description',
    },
    {
      name: 'services_title',
      type: 'text',
      label: 'Services Section Title',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services Cards',
      minRows: 1,
      maxRows: 4,
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
