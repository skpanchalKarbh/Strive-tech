import type { Block } from 'payload'

export const Counters: Block = {
  slug: 'counters',
  interfaceName: 'CountersBlock',
  fields: [
    {
      name: 'counters',
      type: 'array',
      label: 'Counters',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Counter Value (e.g., 479; used for data-number and initial display)',
          required: true,
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix (e.g., + or %)',
        },
        {
          name: 'suffix_class',
          type: 'text',
          label: 'Suffix Class (e.g., mil-sub-text-2 for +; mil-sub-text-1 for %)',
          admin: {
            description: 'Optional CSS class for suffix styling',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Counter Title (e.g., Projects Completed)',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (use HTML like <br> for line breaks)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Right Side Image',
    },
  ],
  labels: {
    plural: 'Counters Blocks',
    singular: 'Counters Block',
  },
}