import RichText from '@/components/RichText'
import React from 'react'

import { Width } from '../Width'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export const Message: React.FC<{ message: DefaultTypedEditorState }> = ({ message }) => {
  return (
    <Width className="mil-mb30" width="50">
      <div className="mil-text-sm mil-up">{message && <RichText data={message} />}</div>
    </Width>
  )
}
