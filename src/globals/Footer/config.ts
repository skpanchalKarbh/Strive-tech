import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'layoutType',
      type: 'select',
      label: 'Footer Layout',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Minimal',
          value: 'minimal',
        },
      ],
      defaultValue: 'default',
      admin: {
        description: 'Choose footer layout used site-wide. Pages can override this.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: true,
    },
    {
      name: 'logoLight',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo (Light) - used for minimal layout',
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter',
      fields: [
        {
          name: 'placeholder',
          type: 'text',
          label: 'Input Placeholder',
          defaultValue: 'Subscribe our newsletter',
        },
        {
          name: 'buttonIcon',
          type: 'text',
          label: 'Button Icon Class',
          defaultValue: 'fal fa-envelope',
        },
      ],
    },
    {
      name: 'mainMenu',
      type: 'array',
      label: 'Main Menu',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: true,
        },
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (used by minimal layout)',
    },
    {
      name: 'policyLinks',
      type: 'array',
      label: 'Policy Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: true,
        },
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'social',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Class',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: true,
        },
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'footerLinks',
      type: 'array',
      label: 'Footer Links (License, Legal, etc)',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: true,
        },
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'locations',
      type: 'array',
      label: 'Office Locations',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Location Title',
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone',
          required: true,
        },
      ],
      maxRows: 5,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© Copyright 2024 - Your Company. All Rights Reserved.',
    },
    {
      name: 'createdBy',
      type: 'text',
      label: 'Created By Text',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
