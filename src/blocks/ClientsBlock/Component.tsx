import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ClientsSlider } from './ClientsSlider'

export const ClientsBlock: React.FC<any> = async ({
  subtitle,
  title,
  clients,
}) => {
  let displayClients = clients || [];
  
  if (!displayClients || displayClients.length === 0) {
    try {
      const payload = await getPayload({ config: configPromise })
      const { docs } = await payload.find({
        collection: 'clients',
        limit: 50,
      })
      displayClients = docs;
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  }

  if (!displayClients || displayClients.length === 0) return null;

  return (
    <div className="mil-section" style={{ background: '#f8fbfc', padding: '80px 0', borderTop: '1px solid #eef3f7', borderBottom: '1px solid #eef3f7' }}>
      <div className="container">
        <div className="mil-text-center" style={{ textAlign: 'center', marginBottom: '60px' }}>
           {subtitle && (
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 20px', background: '#ffffff', border: '1px solid rgba(0, 100, 200, 0.15)', borderRadius: '30px', marginBottom: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
               <div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%' }}></div>
               <h6 style={{ color: '#64748b', margin: 0, fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px' }}>
                 {subtitle}
               </h6>
             </div>
           )}
           {title && (
             <h2 style={{ color: '#0f172a', maxWidth: '800px', margin: '0 auto', fontSize: '42px', fontWeight: 600, lineHeight: '1.3', letterSpacing: '-1px' }} dangerouslySetInnerHTML={{ __html: title.replace(/(25,000\+)/g, '<span style="color:#2563eb">$1</span>').replace(/(Fortune 500s.*us\.)/g, '<span style="display:block; margin-top:20px; font-size:16px; color:#64748b; font-weight:400; letter-spacing:0;">$1</span>') || title }}></h2>
           )}
        </div>
        
        <div style={{ borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '30px 0', display: 'flex', alignItems: 'center' }}>
          <ClientsSlider clients={displayClients} />
        </div>
      </div>
    </div>
  )
}
