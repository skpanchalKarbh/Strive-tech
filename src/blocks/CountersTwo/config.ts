import type { Block } from 'payload'

export const CountersTwo: Block = {
  slug: 'counters_two',
  interfaceName: 'CountersTwoBlock',
  fields: [
    {
      name: 'counters',
      type: 'array',
      label: 'Counters',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Counter Value (e.g., 249; used for data-number and initial display)',
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
        {
          name: 'description',
          type: 'textarea',
          label: 'Description (use HTML like <br> for line breaks)',
        },
        {
          name: 'bgImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image (for special card with overlay)',
        },
        {
          name: 'card_style',
          type: 'select',
          label: 'Card Style (for non-bg cards)',
          options: [
            { label: 'Gray Card', value: 'mil-gray-card' },
            { label: 'Angle Gray', value: 'mil-angle-gray' },
          ],
          defaultValue: 'mil-gray-card',
          admin: {
            condition: (data, siblingData) => !siblingData.bgImage,
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Counters Two Blocks',
    singular: 'Counters Two Block',
  },
}