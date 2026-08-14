'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Media } from '@/components/Media'

interface VideoModalProps {
  youtubeVideoId: string | null
  image?: any
}

export const VideoModal: React.FC<VideoModalProps> = ({ youtubeVideoId, image }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const imgUrl = "/media/diverse-young-adult-business-team-collaborating-in-2025-07-17-18-57-27-utc.jpg";

  return (
    <>
      <div 
        style={{ 
          cursor: youtubeVideoId ? 'pointer' : 'default', 
          position: 'relative', 
          width: '100%', 
          height: '100%', 
          minHeight: '320px', 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0, 0, 0, 0.03)'
        }} 
        onClick={() => {
          if (youtubeVideoId) setIsOpen(true)
        }}
      >
        <img 
          src={imgUrl} 
          alt="Video Thumbnail" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} 
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.3, background: 'linear-gradient(to top, rgba(2, 26, 48, 0.9), rgba(0,0,0,0.1))', pointerEvents: 'none', zIndex: 2 }}></div>
        
        {youtubeVideoId && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            transition: 'all 0.3s ease',
            zIndex: 3
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)' }}
          >
            <div style={{
              width: 0,
              height: 0,
              borderTop: '12px solid transparent',
              borderBottom: '12px solid transparent',
              borderLeft: '20px solid #fff',
              marginLeft: '6px'
            }}></div>
          </div>
        )}
      </div>

      {mounted && isOpen && youtubeVideoId && createPortal(
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div 
            style={{ position: 'relative', width: '100%', height: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '30px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                border: 'none',
                color: 'white',
                fontSize: '30px',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
        </div>,
        document.body
      )}
    </>
  )
}
