import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      label: 'Logo',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [ "image", "text" ],
          label: 'Type',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          admin: {
            condition: (data) => {
              if (data.logo.type === 'image') {
                return true
              } else {
                return false
              }
            },
          },
        },
        {
          name: 'logo_invert',
          type: 'upload',
          relationTo: 'media',
          label: 'Image (Inverted)',
          admin: {
            condition: (data) => {
              if (data.logo.type === 'image') {
                return true
              } else {
                return false
              }
            },
          },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt',
          admin: {
            condition: (data) => {
              if (data.logo.type === 'image') {
                return true
              } else {
                return false
              }
            },
          },
        },
        {
          name: 'fontawesome_icon',
          type: 'text',
          label: 'Logo Icon',
          admin: {
            condition: (data) => {
              if (data.logo.type === 'text') {
                return true
              } else {
                return false
              }
            },
          },
        },
        {
          name: 'text',
          type: 'text',
          label: 'Logo Text',
          admin: {
            condition: (data) => {
              if (data.logo.type === 'text') {
                return true
              } else {
                return false
              }
            },
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        }
      ]
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Button',
      fields: [
        {
          name: 'actionType',
          type: 'select',
          label: 'Action Type',
          defaultValue: 'link',
          options: [
            { label: 'Open Link', value: 'link' },
            { label: 'Open Popup', value: 'popup' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label'
        },
        {
          name: 'fontawesome_icon',
          type: 'text',
          label: 'FontAwesome Icon'
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          admin: {
            condition: (data) => data?.contact?.actionType === 'link',
          },
        },
        {
          name: 'popupTitle',
          type: 'text',
          label: 'Popup Title',
          admin: {
            condition: (data) => data?.contact?.actionType === 'popup',
          },
        },
        {
          name: 'popupItems',
          type: 'array',
          label: 'Popup Items',
          admin: {
            condition: (data) => data?.contact?.actionType === 'popup',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              required: true,
            },
          ],
        },
        {
          name: 'formTitle',
          type: 'text',
          label: 'Form Title',
          admin: {
            condition: (data) => data?.contact?.actionType === 'popup',
          },
        },
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          required: true,
          admin: {
            condition: (data) => data?.contact?.actionType === 'popup',
          },
        },
      ]
    },
    {
      name: 'ordercall',
      type: 'group',
      label: 'Order Call',
      fields: [
        {
          name: 'actionType',
          type: 'select',
          label: 'Action Type',
          defaultValue: 'link',
          options: [
            { label: 'Open Link', value: 'link' },
            { label: 'Open Popup', value: 'popup' },
          ],
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          admin: {
            condition: (data) => data?.contact?.actionType === 'link',
          },
        },
        {
          name: 'formTitle',
          type: 'text',
          label: 'Form Title',
          admin: {
            condition: (data) => data?.contact?.actionType === 'popup',
          },
        },
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          required: true,
          admin: {
            condition: (data) => data?.contact?.actionType === 'popup',
          },
        },
        {
          name: 'bgImage',
          type: 'upload',
          relationTo: 'media',
          label: 'BG Image',
          admin: {
            condition: (data) => data?.contact?.actionType === 'popup',
          },
        },
      ]
    },
    {
      name: 'navItems',
      label: 'Navigation Items',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'headerStyle',
      type: 'select',
      label: 'Default Header Style',
      defaultValue: 'default',
      options: [
        { label: 'Default (Dark)', value: 'default' },
        { label: 'Inverted (White)', value: 'invert' },
      ],
      admin: {
        description: 'Default header style. Can be overridden per page.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
