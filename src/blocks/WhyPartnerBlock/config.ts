import type { Block } from 'payload'

export const WhyPartnerBlock: Block = {
  slug: 'why_partner_block',
  interfaceName: 'WhyPartnerBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
    },
    {
      name: 'background_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (Optional)',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Feature Text',
        },
      ],
    },
  ],
}
