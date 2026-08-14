import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'
import type { AboutUsThreeBlock as AboutUsThreeBlockProps } from '@/payload-types'
import { sanitizeHTML } from '@/utilities/sanitizeHtml'
import { VideoModal } from './VideoModal'

export const AboutUsThreeBlock: React.FC<AboutUsThreeBlockProps> = ({
  badge,
  title,
  left_description,
  button1_text,
  button1_url,
  button2_text,
  button2_url,
  right_description1,
  image,
  youtube_video_link,
  vision_mission_goals,
  right_description2,
  skills,
  right_description3,
}) => {
  const getYoutubeVideoId = (url: string) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const youtubeVideoId = youtube_video_link ? getYoutubeVideoId(youtube_video_link) : null

  return (
    <>
      <div className="mil-section mil-premium-about-section">
        <div className="container">
          
          {/* BADGE ABOVE ROW TO ALLOW PERFECT TITLE ALIGNMENT */}
          {badge && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '30px', height: '2px', background: '#00aeef' }}></div>
              <h6 style={{ color: '#00aeef', margin: 0, fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>{badge}</h6>
            </div>
          )}

          {/* ROW 1: TEXT SECTIONS */}
          <div className="row align-items-start mil-mb-5">
            {/* Row 1 Left: Titles & Buttons */}
            <div className="col-lg-6 mil-mb-5">
              <div className="mil-about-content-left" style={{ paddingRight: '50px' }}>
                {title && (
                  <h2 className="mil-premium-about-title mil-up" style={{ marginTop: 0 }} dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }} />
                )}
                {left_description && (
                  <p
                    className="mil-premium-about-text mil-mb-5 mil-up"
                    dangerouslySetInnerHTML={{ __html: sanitizeHTML(left_description) }}
                  />
                )}
                <div className="mil-up" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                  {button1_text && button1_url && (
                    <Link href={button1_url} className="mil-premium-btn-small mil-premium-btn-primary">
                      <span>{button1_text}</span>
                      <i className="far fa-arrow-right"></i>
                    </Link>
                  )}
                  {button2_text && button2_url && (
                    <Link href={button2_url} className="mil-premium-btn-outline">
                      <span>{button2_text}</span>
                      <i className="far fa-arrow-right"></i>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Row 1 Right: We Don't Just Consult... */}
            <div className="col-lg-6 mil-mb-5">
              <div className="mil-about-content-right mil-up" style={{ paddingLeft: '30px' }}>
                {right_description1 && (
                  <div className="mil-premium-about-text" style={{ fontSize: '32px', fontWeight: 800, color: '#021a30', lineHeight: 1.3, marginTop: 0 }}>
                    <RichText data={right_description1} enableGutter={false} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ROW 2: VIDEO & SKILLS */}
          <div className="row mil-mb-5">
            {/* Row 2 Left: Video Modal */}
            <div className="col-lg-6 mil-mb-5">
              {(image || youtubeVideoId) && (
                <div className="mil-premium-video-wrapper" style={{ height: '320px' }}>
                  <VideoModal youtubeVideoId={youtubeVideoId} image={image} />
                </div>
              )}
            </div>

            {/* Row 2 Right: Skills Card */}
            <div className="col-lg-6 mil-mb-5">
              <div style={{ 
                background: '#021a30', 
                borderRadius: '30px', 
                padding: '30px 40px', 
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 30px 60px rgba(2, 26, 48, 0.4)'
              }}>
                <h4 style={{ color: '#fff', marginBottom: '20px', fontWeight: 800 }}>Core Expertise</h4>

                {skills && skills.length > 0 && (
                  <div>
                    {skills.map((skill, index) => (
                      <div key={index} style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          {skill.name && <span style={{ color: '#fff', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{skill.name}</span>}
                          {skill.percentage && <span style={{ color: '#00aeef', fontWeight: 700, fontSize: '14px' }}>{skill.percentage}</span>}
                        </div>
                        <div className="mil-premium-progress-bg">
                           {skill.percentage && (
                             <div className="mil-premium-progress-bar" data-value={skill.percentage} style={{ width: skill.percentage }}></div>
                           )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {right_description3 && (
                  <div style={{ marginTop: '10px', color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: 1.5 }}>
                    <RichText data={right_description3} enableGutter={false} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {vision_mission_goals && vision_mission_goals.length > 0 && (
        <div className="mil-section" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
          <div className="container">
            <div className="row">
              {vision_mission_goals.map((item, index) => {
                const cardColors = ['#2d73a6', '#e79331', '#ce3736'];
                const mainColor = cardColors[index % cardColors.length];
                
                const imgUrl = item.image && typeof item.image === 'object' && item.image.url ? item.image.url : null;

                return (
                  <div key={index} className="col-lg-4 col-md-6 mil-mb-4" style={{ marginTop: '50px' }}>
                    <div className="mil-vmg-card mil-up" style={{ backgroundColor: mainColor }}>
                      
                      <div className="mil-vmg-icon-wrapper" style={{ backgroundColor: mainColor }}>
                        <i className={`fas ${index === 0 ? 'fa-eye' : index === 1 ? 'fa-bullseye' : 'fa-gem'}`} style={{ fontSize: '32px', color: '#ffffff' }}></i>
                      </div>

                      <div className="mil-vmg-card-top">
                        {item.title && <h6 className="mil-vmg-title">{item.title}</h6>}
                      </div>

                      <div className="mil-vmg-card-bottom">
                        {item.description && (
                          <p
                            className="mil-vmg-desc"
                            dangerouslySetInnerHTML={{ __html: sanitizeHTML(item.description || '') }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <style>{`
            .mil-vmg-card {
              border-radius: 12px;
              text-align: center;
              position: relative;
              z-index: 1;
              display: flex;
              flex-direction: column;
              height: 100%;
              box-shadow: 0 10px 30px rgba(0,0,0,0.08);
              transition: transform 0.3s ease;
            }

            .mil-vmg-card:hover {
              transform: translateY(-5px);
            }

            .mil-vmg-icon-wrapper {
              width: 84px;
              height: 84px;
              border-radius: 50%;
              border: 6px solid #f2f7f9; /* Using standard Strive template light background */
              position: absolute;
              top: -42px;
              left: 50%;
              transform: translateX(-50%);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 2;
            }

            @media (prefers-color-scheme: light) {
              .mil-vmg-icon-wrapper {
                border-color: #f2f7f9; /* Assumes parent section is this color, tweak if needed */
              }
            }

            .mil-vmg-icon-img {
              width: 40px !important;
              height: 40px !important;
              object-fit: contain;
            }

            .mil-vmg-card-top {
              padding: 60px 20px 20px;
            }

            .mil-vmg-title {
              color: #ffffff;
              font-weight: 700;
              font-size: 24px;
              margin: 0;
            }

            .mil-vmg-card-bottom {
              padding: 25px 25px 35px;
              background: rgba(0, 0, 0, 0.12);
              border-bottom-left-radius: 12px;
              border-bottom-right-radius: 12px;
              flex-grow: 1;
            }

            .mil-vmg-desc {
              color: rgba(255, 255, 255, 0.9);
              font-size: 15px;
              line-height: 1.7;
              margin: 0;
            }
          `}</style>
        </div>
      )}
    </>
  )
}
