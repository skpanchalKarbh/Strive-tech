'use client'

import { useRowLabel } from '@payloadcms/ui'

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()

  const customLabel = `${data.title || 'Item'} ${rowNumber !== undefined ? rowNumber + 1 : ''}`

  return <div>Submenu: {customLabel}</div>
}
