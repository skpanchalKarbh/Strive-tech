import React from 'react'
import { Media } from '@/components/Media'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'
import { VideoModal } from './VideoModal'

import type { AboutUsBlock as AboutUsBlockProps } from '@/payload-types'

export const AboutUsBlock: React.FC<AboutUsBlockProps> = ({
  badge,
  title,
  description,
  portrait,
  founder_name,
  founder_role,
  founder_quote,
  image,
  youtube_video_link,
}) => {
  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeVideoId = youtube_video_link ? getYoutubeVideoId(youtube_video_link) : null;

  return (
    <div className="row g-0">
      <div className="col-lg-6 mil-p-10-10">
        <div className="mil-fake-container-left">
          {badge && <div className="mil-badge mil-mb-4">{badge}</div>}
          {title && (
            <h2
              className="mil-mb-5"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
            />
          )}
          {description && (
            <p
              className="mil-t-16 mil-c-m-2 mil-mb-8"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
            />
          )}
          {portrait && founder_name && founder_role && founder_quote && (
            <div className="mil-founder-quote">
              <div className="mil-portrait">
                <Media resource={portrait} />
              </div>
              <div className="mil-text">
                <div className="mil-quote-icon mil-handwrite mil-mb-2">&quot;</div>
                <div className="mil-flex-row mil-mb-3">
                  <h6 className="mil-mr-1">{founder_name}</h6>
                  <span className="mil-t-14 mil-c-m-2">/ &nbsp;&nbsp; {founder_role}</span>
                </div>
                <p
                  className="mil-handwrite"
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(founder_quote) }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="col-lg-6">
        {(image || youtubeVideoId) && (
          <VideoModal youtubeVideoId={youtubeVideoId} image={image} />
        )}
      </div>
    </div>
  )
}