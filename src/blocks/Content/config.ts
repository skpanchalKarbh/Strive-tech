import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'half',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'title',
      type: 'textarea',
      label: 'Title'
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
    {
      name: 'dividerTop',
      type: 'checkbox',
      label: "Divider (top)"
    },
    {
      name: 'dividerBottom',
      type: 'checkbox',
      label: "Divider (bottom)"
    },
    {
      name: 'padding_top',
      type: 'select',
      defaultValue: "160",
      options: [ "0", "160" ],
      label: 'Padding Top'
    },
    {
      name: 'padding_bottom',
      type: 'select',
      defaultValue: "130",
      options: [ "0", "40", "100", "130", "145", "160" ],
      label: 'Padding Bottom'
    },
  ],
}
