import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contact_form_block',
  interfaceName: 'ContactFormBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Side Image',
      required: false,
    },
    {
      name: 'map_iframe',
      type: 'textarea',
      label: 'Google Maps Iframe Embed (Optional, overrides Side Image)',
    },
    {
      name: 'contact_cards',
      type: 'array',
      label: 'Contact Cards (over image)',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title (e.g. Our Number)',
        },
        {
          name: 'value',
          type: 'text',
          label: 'Value (e.g. +1484 518 1900)',
        },
      ],
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle (e.g. Get In Touch)',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title (e.g. Start The Dialogue...)',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Form',
      required: true,
    },
  ],
}
