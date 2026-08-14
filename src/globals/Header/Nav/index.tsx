'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

type NavItemLink = NonNullable<NonNullable<HeaderType['navItems']>[number]['link']>

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  
  return (
    <ul className="mil-main-menu">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...(link as NavItemLink)} index={i} appearance="link" />
      })}
    </ul>
  )
}
