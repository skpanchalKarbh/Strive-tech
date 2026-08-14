import type { Block } from 'payload'

export const AboutUsPremiumBlock: Block = {
  slug: 'about_us_premium_block',
  interfaceName: 'AboutUsPremiumBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
    },
    {
      name: 'description_1',
      type: 'textarea',
      label: 'Description Paragraph 1',
    },
    {
      name: 'description_2',
      type: 'textarea',
      label: 'Description Paragraph 2',
    },
    {
      name: 'image_back',
      type: 'upload',
      relationTo: 'media',
      label: 'Back Image',
    },
    {
      name: 'image_front',
      type: 'upload',
      relationTo: 'media',
      label: 'Front (Overlapping) Image',
    },
    {
      name: 'award_icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Award Icon (Center Trophy)',
    },
    {
      name: 'award_text',
      type: 'text',
      label: 'Rotating Award Text',
      defaultValue: 'The Best Business Consulting 2024 . ',
    },
    {
      name: 'tabs',
      type: 'array',
      label: 'Interactive Tabs',
      minRows: 1,
      fields: [
        {
          name: 'tab_title',
          type: 'text',
          label: 'Tab Title (e.g. 01. Clear Purpose)',
        },
        {
          name: 'tab_description',
          type: 'textarea',
          label: 'Tab Description',
        },
        {
          name: 'list_items',
          type: 'array',
          label: 'Checkmark List Items',
          fields: [
            {
              name: 'text',
              type: 'text',
            }
          ]
        }
      ]
    },
    {
      name: 'phone_text',
      type: 'text',
      label: 'Phone Text',
      defaultValue: 'Call Us Anytime',
    },
    {
      name: 'phone_number',
      type: 'text',
      label: 'Phone Number',
    }
  ],
}
