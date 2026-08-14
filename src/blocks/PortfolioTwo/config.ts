import type { Block } from 'payload'

export const PortfolioTwo: Block = {
  slug: 'portfolio_two',
  interfaceName: 'PortfolioTwoBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge (e.g., Cases)',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (use HTML like <br> for line breaks, use span like <span class="mil-opacity-text">TEXT</span> for highlighted text)',
    },
    {
      name: 'counter_value',
      type: 'text',
      label: 'Counter Value (e.g., 479; used for data-number and initial display)',
    },
    {
      name: 'counter_suffix',
      type: 'text',
      label: 'Counter Suffix (e.g., +)',
    },
    {
      name: 'counter_title',
      type: 'text',
      label: 'Counter Title (e.g., Projects Completed)',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'projects',
      label: 'Collections To Show',
      options: [
        {
          label: 'Projects',
          value: 'projects',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: 'Categories To Show',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['projects'],
    },
    {
      name: 'info',
      type: 'textarea',
      label: 'Bottom Info Text (use HTML if needed)',
    },
    {
      name: 'more_label',
      type: 'text',
      label: 'Bottom Button Label (e.g., Discover)',
    },
    {
      name: 'more_link',
      type: 'text',
      label: 'Bottom Button Link',
    },
  ],
  labels: {
    plural: 'Portfolio Two Blocks',
    singular: 'Portfolio Two Block',
  },
}