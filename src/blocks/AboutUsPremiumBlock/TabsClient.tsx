"use client";

import React, { useState } from 'react';
import { sanitizeHTML } from '@/utilities/sanitizeHtml';

export const TabsClient = ({ tabs }: { tabs: any[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="mil-premium-tabs" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Sleek Pill Navigation */}
      <div 
        className="mil-tabs-nav" 
        style={{ 
          display: 'inline-flex', 
          backgroundColor: '#f2f6f9', 
          padding: '6px', 
          borderRadius: '50px', 
          alignSelf: 'flex-start',
          flexWrap: 'wrap',
          gap: '5px'
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              style={{
                padding: '12px 24px',
                borderRadius: '40px',
                backgroundColor: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#001a33' : '#5b6b7a',
                border: 'none',
                boxShadow: isActive ? '0 5px 15px rgba(0,0,0,0.05)' : 'none',
                fontWeight: isActive ? 700 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {tab.tab_title}
            </button>
          )
        })}
      </div>

      {/* Premium Content Card */}
      <div 
        className="mil-tabs-content-card" 
        style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '20px', 
          padding: '35px', 
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.04)', 
          border: '1px solid #edf1f5',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {tabs[activeTab] && (
          <div className="mil-tab-pane" style={{ animation: 'milTabFade 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            
            {tabs[activeTab].tab_description && (
              <h5 
                style={{ fontSize: '18px', lineHeight: '1.6', color: '#001a33', fontWeight: 600, marginBottom: '25px' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(tabs[activeTab].tab_description) }}
              />
            )}
            
            {tabs[activeTab].list_items && tabs[activeTab].list_items.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                {tabs[activeTab].list_items.map((item: any, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div 
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        flexShrink: 0, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        backgroundColor: '#e6f7ef',
                        borderRadius: '50%',
                        marginRight: '12px',
                        marginTop: '2px'
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: '15px', color: '#4a5b6c', lineHeight: '1.5', fontWeight: 500 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Soft decorative accent */}
        <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,180,216,0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
      </div>

      <style>{`
        @keyframes milTabFade {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
