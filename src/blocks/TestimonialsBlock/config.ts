import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (use HTML like <br> for line breaks)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Testimonial Text',
          required: true,
        },
        {
          name: 'authorName',
          type: 'text',
          label: 'Author Name',
          required: true,
        },
        {
          name: 'authorRole',
          type: 'text',
          label: 'Author Role / Company',
        },
        {
          name: 'authorAvatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Avatar Image',
        },
      ],
    },
  ],
  labels: {
    plural: 'Testimonials Blocks',
    singular: 'Testimonials Block',
  },
}
