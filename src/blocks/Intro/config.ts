import type { Block } from 'payload'

export const IntroBlock: Block = {
  slug: 'intro',
  interfaceName: 'IntroBlock',
  fields: [
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'short_title',
      type: 'textarea',
      label: 'Title (short)'
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (use HTML like <br> for line breaks, use span like <span class="mil-opacity-text">TEXT</span> for highlighted text)'
    },
  ],
  labels: {
    plural: 'Intro',
    singular: 'Intro',
  },
}