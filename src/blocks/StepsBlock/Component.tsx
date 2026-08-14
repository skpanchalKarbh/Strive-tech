import React from 'react'
import type { StepsBlock as StepsBlockProps } from '@/payload-types'
import Link from 'next/link'

export const StepsBlock: React.FC<StepsBlockProps> = ({
  subtitle,
  title,
  steps,
  bottom_text_before_link,
  bottom_link_label,
  bottom_link_url,
  bottom_text_after_link,
}) => {
  return (
    <div className="mil-section mil-p-10-8 mil-premium-steps-section">
      <div className="container">
        {(subtitle || title) && (
          <div className="mil-text-center mil-mb-8">
            {subtitle && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 15px', background: '#ffffff', borderRadius: '30px', border: '1px solid #eef3f7', boxShadow: '0 5px 15px rgba(0,0,0,0.03)', marginBottom: '20px' }}>
                <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%' }}></div>
                <h6 style={{ color: '#64748b', margin: 0, fontSize: '12px', fontWeight: 600 }}>{subtitle}</h6>
              </div>
            )}
            {title && <h2 className="mil-mb-0" style={{ color: '#021a30', fontWeight: 800 }}>{title}</h2>}
          </div>
        )}

        <div className="row">
          {steps &&
            steps.map((step, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-3 mil-mb-4">
                <div className="mil-premium-step-card">
                  <div className="mil-premium-step-badge-wrapper">
                    <span className="mil-premium-step-badge">
                      Step {step.step_number}
                    </span>
                  </div>
                  <h4 className="mil-premium-step-title">{step.title}</h4>
                  <p className="mil-premium-step-text">{step.text}</p>
                </div>
              </div>
            ))}
        </div>

        {(bottom_text_before_link || bottom_link_label || bottom_text_after_link) && (
          <div className="mil-text-center mil-mt-8">
            <h4 className="mil-premium-steps-bottom-text">
              {bottom_text_before_link}{' '}
              {bottom_link_label && bottom_link_url && (
                <Link href={bottom_link_url} className="mil-accent" style={{ color: '#00aeef', textDecoration: 'none', position: 'relative', display: 'inline-block' }}>
                  {bottom_link_label}
                  <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: '2px', background: '#00aeef', borderRadius: '2px' }}></span>
                </Link>
              )}{' '}
              {bottom_text_after_link}
            </h4>
          </div>
        )}
      </div>
    </div>
  )
}
