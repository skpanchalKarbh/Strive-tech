import type { Block } from 'payload'

export const StepsBlock: Block = {
  slug: 'steps_block',
  interfaceName: 'StepsBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'step_number',
          type: 'text',
          label: 'Step Number (e.g. 01)',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
      ]
    },
    {
      name: 'bottom_text_before_link',
      type: 'text',
      label: 'Bottom Text Before Link',
    },
    {
      name: 'bottom_link_label',
      type: 'text',
      label: 'Bottom Link Label',
    },
    {
      name: 'bottom_link_url',
      type: 'text',
      label: 'Bottom Link URL',
    },
    {
      name: 'bottom_text_after_link',
      type: 'text',
      label: 'Bottom Text After Link',
    },
  ],
}
