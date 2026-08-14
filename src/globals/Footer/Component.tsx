import FooterClient from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Footer } from '@/payload-types'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  return <FooterClient data={footerData} />
}