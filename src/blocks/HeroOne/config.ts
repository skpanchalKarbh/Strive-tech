import type { Block } from 'payload'

export const HeroOne: Block = {
  slug: 'hero_one',
  interfaceName: 'HeroOneBlock',
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
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle (can use HTML)',
    },
    {
      name: 'title_line1',
      type: 'text',
      label: 'Title (Line 1)',
    },
    {
      name: 'title_line2',
      type: 'text',
      label: 'Title (Line 2)',
    },
    {
      name: 'title_line3',
      type: 'text',
      label: 'Title (Line 3, with opacity)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (use <br> for responsive line breaks)',
    },
    {
      name: 'button1_text',
      type: 'text',
      label: 'Button 1 (Text)',
    },
    {
      name: 'button1_url',
      type: 'text',
      label: 'Button 1 (URL)',
    },
    {
      name: 'button2_text',
      type: 'text',
      label: 'Button 2 (Text)',
    },
    {
      name: 'button2_url',
      type: 'text',
      label: 'Button 2 (URL)',
    },
    {
      name: 'counter1_upper',
      type: 'text',
      label: 'Counter 1 (Upper Text)',
    },
    {
      name: 'counter1_lower',
      type: 'text',
      label: 'Counter 1 (Lower Text)',
    },
    {
      name: 'counter1_value',
      type: 'text',
      label: 'Counter 1 (Value)',
    },
    {
      name: 'counter2_upper',
      type: 'text',
      label: 'Counter 2 (Upper Text)',
    },
    {
      name: 'counter2_lower',
      type: 'text',
      label: 'Counter 2 (Lower Text)',
    },
    {
      name: 'counter2_value',
      type: 'text',
      label: 'Counter 2 (Value)',
    },
  ],
  labels: {
    plural: 'Hero One',
    singular: 'Hero One',
  },
}