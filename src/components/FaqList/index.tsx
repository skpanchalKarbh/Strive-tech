'use client';

import React, { useState } from 'react'
import RichText from '@/components/RichText'
import type { FaqBlock as FaqBlockProps } from '@/payload-types'

export type Props = {
  faqs: FaqBlockProps['faqs']
}

export const FaqList: React.FC<Props> = (props) => {
  const { faqs } = props
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleFaqClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <>
      <div className="mil-premium-faq">
          <ul className="mil-premium-faq-list">
              {faqs?.map((faq, index) => (
              <li key={index} className={`mil-premium-faq-item ${activeIndex === index ? 'mil-active' : ''}`}>
                  <button 
                  className="mil-premium-faq-question"
                  onClick={() => handleFaqClick(index)}
                  >
                  {faq.question}
                  <span className="mil-premium-faq-icon">
                      <i className="far fa-arrow-right"></i>
                  </span>
                  </button>
                  <div className={`mil-premium-faq-answer ${activeIndex === index ? 'mil-active' : ''}`}>
                    <div className="mil-premium-faq-answer-inner">
                      {faq.answer && <RichText data={faq.answer} enableGutter={false} />}
                    </div>
                  </div>
              </li>
              ))}
          </ul>
      </div>
      <style>{`
        .mil-premium-faq-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .mil-premium-faq-item {
          background: linear-gradient(135deg, #010c17 0%, #021a30 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          border-radius: 16px;
          margin-bottom: 12px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .mil-premium-faq-item:hover {
          border-color: rgba(0, 174, 239, 0.3);
          box-shadow: 0 15px 30px rgba(0, 174, 239, 0.15);
        }

        .mil-premium-faq-item.mil-active {
          border-color: rgba(0, 174, 239, 0.5);
          box-shadow: 0 15px 30px rgba(0, 174, 239, 0.15);
        }

        .mil-premium-faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 17px;
          font-weight: 700;
          text-align: left;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .mil-premium-faq-item.mil-active .mil-premium-faq-question,
        .mil-premium-faq-item:hover .mil-premium-faq-question {
          color: #00aeef;
        }

        .mil-premium-faq-icon {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00aeef;
          transition: all 0.4s ease;
          flex-shrink: 0;
          margin-left: 15px;
          font-size: 14px;
        }

        .mil-premium-faq-item:hover .mil-premium-faq-icon {
          background: rgba(0, 174, 239, 0.1);
        }

        .mil-premium-faq-item.mil-active .mil-premium-faq-icon {
          background: #00aeef;
          color: #ffffff;
          transform: rotate(90deg);
        }

        .mil-premium-faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .mil-premium-faq-answer.mil-active {
          max-height: 500px;
        }

        .mil-premium-faq-answer-inner {
          padding: 0 24px 20px 24px;
          color: #8c939e;
          font-size: 15px;
          line-height: 1.6;
        }

        .mil-premium-faq-answer-inner p {
          margin: 0 0 10px 0;
        }
        .mil-premium-faq-answer-inner p:last-child {
          margin: 0;
        }
      `}</style>
    </>
  )
}