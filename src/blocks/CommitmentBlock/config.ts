import type { Block } from 'payload'

export const CommitmentBlock: Block = {
  slug: 'commitment_block',
  interfaceName: 'CommitmentBlock',
  fields: [
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
      name: 'image_alignment',
      type: 'select',
      label: 'Image Alignment',
      defaultValue: 'right',
      options: [
        { label: 'Image Left', value: 'left' },
        { label: 'Image Right', value: 'right' },
      ],
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Side Image',
    },
  ],
}
