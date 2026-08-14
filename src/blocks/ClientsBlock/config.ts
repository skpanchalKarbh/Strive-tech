import type { Block } from 'payload'

export const ClientsBlock: Block = {
  slug: 'clients_block',
  interfaceName: 'ClientsBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'clients',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true,
      label: 'Clients (Leave empty to fetch all automatically)',
    },
  ],
}
