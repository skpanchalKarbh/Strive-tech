import type { Block } from 'payload'

export const PremiumOverviewBlock: Block = {
  slug: 'premium_overview_block',
  interfaceName: 'PremiumOverviewBlock',
  fields: [
    {
      name: 'vision_title',
      type: 'text',
      defaultValue: 'Our Vision',
    },
    {
      name: 'vision_text',
      type: 'textarea',
      defaultValue: "To be recognized as one of America's most trusted staffing and consulting partners, known for integrity, innovation, and impact. We aim to inspire growth in people, in businesses, and in the communities we serve.",
    },
    {
      name: 'why_choose_title',
      type: 'text',
      defaultValue: 'Why Choose StriveTech Partners',
    },
    {
      name: 'why_choose_list',
      type: 'array',
      fields: [{ name: 'point', type: 'text' }]
    },
    {
      name: 'clients_title',
      type: 'text',
      defaultValue: 'Our Clients & Partners',
    },
    {
      name: 'clients_description',
      type: 'textarea',
      defaultValue: 'We proudly collaborate with Fortune 500 and fast-growing companies across multiple industries, including:',
    },
    {
      name: 'clients_list',
      type: 'array',
      fields: [{ name: 'client_name', type: 'text' }]
    },
    {
      name: 'cta_title',
      type: 'text',
      defaultValue: "Let's Grow Together",
    },
    {
      name: 'cta_description',
      type: 'textarea',
      defaultValue: "Whether you're an employer seeking top talent or a professional looking for the next big step in your career, StriveTech Partners is here to guide you every step of the way.",
    }
  ],
}
