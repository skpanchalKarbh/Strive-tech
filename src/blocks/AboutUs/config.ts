import type { Block } from 'payload'

export const AboutUs: Block = {
  slug: 'about_us',
  interfaceName: 'AboutUsBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (use HTML like <br> for line breaks, use span like <span class="mil-c-m-2">TEXT</span> for highlighted text)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (use HTML like <br> for line breaks)',
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'Founder Portrait',
    },
    {
      name: 'founder_name',
      type: 'text',
      label: 'Founder Name',
    },
    {
      name: 'founder_role',
      type: 'text',
      label: 'Founder Role (e.g., founder)',
    },
    {
      name: 'founder_quote',
      type: 'textarea',
      label: 'Founder Quote (use HTML if needed)',
    },
    {
      name: 'youtube_video_link',
      type: 'text',
      label: 'YouTube Video Link (Optional, overrides image if provided)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Right Side Image (Fallback)',
    },
  ],
  labels: {
    plural: 'About Us',
    singular: 'About Us',
  },
}