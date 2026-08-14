import type { Block } from 'payload'

export const CareerBlock: Block = {
  slug: 'career_block',
  interfaceName: 'CareerBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Side Image',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'button_text',
      type: 'text',
      label: 'Button Text',
    },
    {
      name: 'button_url',
      type: 'text',
      label: 'Button URL',
    },
  ],
}
