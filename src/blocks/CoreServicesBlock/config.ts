import type { Block } from 'payload'

export const CoreServicesBlock: Block = {
  slug: 'core_services_block',
  interfaceName: 'CoreServicesBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
      defaultValue: 'Our Core Services Include',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Optional Description',
    },
    {
      name: 'services_list',
      type: 'array',
      label: 'Services List',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Service Name',
        }
      ]
    }
  ],
}
