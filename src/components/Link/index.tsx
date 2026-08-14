'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import type { Page, Post, Service, Project, Team } from '@/payload-types'
import { SubCMSLink } from '@/components/SubLink'

type CMSLinkType = {
  appearance?: 'inline' | string
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'services' | 'projects' | 'team'
    value: Page | Post | Service | Project | Team | string | number
  } | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  submenu?: object[] | null
  index?: number | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
  const asPath = usePathname();

  const {
    type,
    appearance = 'inline',
    children,
    label,
    newTab,
    reference,
    url,
    submenu,
    index
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const isPathActive = (path: string) => {
    const current = asPath ?? '/';
    if (!path) return false;

    const normalize = (p: string) => (p === '/' ? '/' : p.replace(/\/$/, ''));

    const normalizedPath = normalize(path);
    const normalizedCurrent = normalize(current);

    if (normalizedPath === '/') {
      return normalizedCurrent === '/';
    }

    return (
      normalizedCurrent === normalizedPath ||
      normalizedCurrent.startsWith(normalizedPath + '/')
    );
  };
  
  const handleSubMenuClick = (index: number | null, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const element = e.target as HTMLElement
    
    if ( activeSubMenu !== index ) {
      setActiveSubMenu(index);
    } else {
      setActiveSubMenu(null);
    }
  };

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }
  
  let itemClass = '';
  if ( submenu && submenu.length > 0 ) { itemClass += ' mil-has-children' }
  if ( activeSubMenu === index ) { itemClass += ' mil-active' }

  return (
    <li className={itemClass}>
      <Link href={href || url || ''} {...newTabProps} onClick={(href == '#.' || href == '#') && submenu && submenu.length > 0 ? (e) => handleSubMenuClick(index ? index : 0, e) : () => true} className={isPathActive((href)) ? "mil-current": ""}>
        {label && label}
        {children && children}
      </Link>
      {submenu && submenu.length > 0 && 
      <ul>
        {submenu.map((link, i) => {
          return <li key={i}><SubCMSLink {...link} /></li>
        })}    
      </ul>
      }
    </li>
  )
}
