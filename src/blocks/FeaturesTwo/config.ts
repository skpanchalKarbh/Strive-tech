import type { Block } from 'payload'

export const FeaturesTwo: Block = {
  slug: 'features_two',
  interfaceName: 'FeaturesTwoBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (use HTML like <br> for line breaks, use span like <span class="mil-opacity-text">TEXT</span> for highlighted text)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (use HTML like <br> for line breaks)',
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
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      maxRows: 10,
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
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description (use HTML like <br> for line breaks)',
        },
      ],
    },
  ],
  labels: {
    plural: 'Features 2 Blocks',
    singular: 'Features 2 Block',
  },
}