import type { Block } from 'payload'

export const Subscribe: Block = {
  slug: 'subscribe',
  interfaceName: 'SubscribeBlock',
  fields: [
    {
      name: 'title',
      type: 'textarea',
      label: 'Title'
    },
    {
      name: 'media_file',
      type: 'upload',
      relationTo: 'media',
      label: 'Media File'
    },
  ],
  labels: {
    plural: 'Subscribe',
    singular: 'Subscribe',
  },
}