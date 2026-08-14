import type { Block } from 'payload'

export const ReusableBlock: Block = {
  slug: 'reusable_block',
  interfaceName: 'ReusableBlock',
  fields: [
    {
        name: 'reusableContent',
        type: 'relationship',
        relationTo: 'reusable-content',
        required: true,
    },
    {
        name: 'customId',
        type: 'text',
        admin: {
            description: () =>
            'This is a custom ID that can be used to target this block with CSS or JavaScript.',
        },
    },
    {
      name: 'bg_style',
      type: 'select',
      options: [ "default", "gray" ],
      label: 'Background Style',
      defaultValue: 'default'
    },
    {
      name: 'padding_top',
      type: 'select',
      options: [ "0", "10" ],
      label: 'Padding Top (in REM)'
    },
    {
      name: 'padding_bottom',
      type: 'select',
      options: [ "0", "5", "6", "8", "10" ],
      label: 'Padding Bottom'
    },
  ],
  labels: {
    plural: 'Reusable Content',
    singular: 'Reusable Content',
  },
}