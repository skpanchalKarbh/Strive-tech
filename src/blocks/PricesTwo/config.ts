import type { Block } from 'payload'

export const PricesTwo: Block = {
  slug: 'prices_two',
  interfaceName: 'PricesTwoBlock',
  fields: [
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
      label: 'Description (use HTML like <br> for line breaks)',
    },
    {
      name: 'button_text',
      type: 'text',
      label: 'Top Button Text',
    },
    {
      name: 'button_url',
      type: 'text',
      label: 'Top Button URL',
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Plans',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Plan Name',
        },
        {
          name: 'price',
          type: 'text',
          label: 'Price (e.g., 490)',
        },
        {
          name: 'price_suffix',
          type: 'text',
          label: 'Price Suffix (e.g., / one-time)',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Plan Description (use HTML like <br> for line breaks)',
        },
        {
          name: 'bgImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image (for special card with overlay)',
        },
        {
          name: 'card_style',
          type: 'select',
          label: 'Card Style (for non-bg cards)',
          options: [
            { label: 'Gray Card', value: 'mil-gray-card' },
            { label: 'Angle Gray', value: 'mil-angle-gray' },
          ],
          defaultValue: 'mil-gray-card',
          admin: {
            condition: (data, siblingData) => !siblingData.bgImage,
          },
        },
        {
          name: 'button_style',
          type: 'select',
          label: 'Button Style',
          options: [
            { label: 'Light', value: 'mil-light' },
            { label: 'Accent', value: 'mil-accent' },
            { label: 'Soft', value: 'mil-soft' },
          ],
          defaultValue: 'mil-light',
        },
        {
          name: 'button_text',
          type: 'text',
          label: 'Plan Button Text',
        },
        {
          name: 'button_url',
          type: 'text',
          label: 'Plan Button URL',
        },
      ],
    },
  ],
  labels: {
    plural: 'Prices 2',
    singular: 'Prices 2',
  },
}