import type { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'call_to_action',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Icon',
    },
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
      label: 'Description (use HTML like <br> for responsive line breaks)',
    },
    {
      name: 'button1_text',
      type: 'text',
      label: 'Button 1 Text',
    },
    {
      name: 'button1_url',
      type: 'text',
      label: 'Button 1 URL',
    },
    {
      name: 'button2_text',
      type: 'text',
      label: 'Button 2 Text',
    },
    {
      name: 'button2_url',
      type: 'text',
      label: 'Button 2 URL',
    },
  ],
  labels: {
    plural: 'CTA Blocks',
    singular: 'CTA Block',
  },
}