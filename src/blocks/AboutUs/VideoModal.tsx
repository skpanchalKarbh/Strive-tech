'use client'

import React, { useState } from 'react'
import { Media } from '@/components/Media'

interface VideoModalProps {
  youtubeVideoId: string | null
  image?: any
}

export const VideoModal: React.FC<VideoModalProps> = ({ youtubeVideoId, image }) => {
  const [isOpen, setIsOpen] = useState(false)

  const thumbnailUrl = youtubeVideoId 
    ? `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`
    : null;

  return (
    <>
      <div 
        className="mil-square-box mil-angle mil-angle-lg" 
        style={{ cursor: youtubeVideoId ? 'pointer' : 'default', position: 'relative' }} 
        onClick={() => {
          if (youtubeVideoId) setIsOpen(true)
        }}
      >
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt="Video Thumbnail" className="mil-scale-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : image ? (
          <Media
            resource={image}
            imgClassName="mil-scale-img"
          />
        ) : null}
        <div className="mil-overlay" style={{ opacity: 0.2 }}></div>
        
        {youtubeVideoId && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              width: 0,
              height: 0,
              borderTop: '15px solid transparent',
              borderBottom: '15px solid transparent',
              borderLeft: '25px solid white',
              marginLeft: '5px'
            }}></div>
          </div>
        )}
      </div>

      {isOpen && youtubeVideoId && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div 
            style={{ position: 'relative', width: '80%', maxWidth: '900px', aspectRatio: '16/9' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '30px',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  )
}
