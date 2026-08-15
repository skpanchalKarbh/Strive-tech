'use client';

import React, { Fragment, useEffect, useState } from 'react';
import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource, style } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/media/'+resource); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err);
      } finally {
      }
    }
    if ( Number.isInteger(resource) || typeof resource === 'string' ) {
      fetchData();
    }
  }, [resource]); // Re-run when resource changes

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
            style,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} resource={data !== null ? data : resource} />}
    </Tag>
  )
}
