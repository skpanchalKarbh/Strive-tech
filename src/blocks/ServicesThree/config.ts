import type { Block } from 'payload'

export const ServicesThree: Block = {
  slug: 'services_three',
  interfaceName: 'ServicesThreeBlock',
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
      label: 'Top Button Text',
    },
    {
      name: 'button_url',
      type: 'text',
      label: 'Top Button URL',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
        },
        {
          name: 'title',
          type: 'textarea',
          label: 'Service Title (use HTML like <br> for line breaks)',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Service Description (use HTML like <br> for line breaks)',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Service URL (link to full page)',
        },
      ],
    },
  ],
  labels: {
    plural: 'Services Three Blocks',
    singular: 'Services Three Block',
  },
}