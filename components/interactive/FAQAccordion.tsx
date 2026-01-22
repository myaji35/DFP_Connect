'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
  defaultOpen?: number
}

export function FAQAccordion({ faqs, defaultOpen }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={index}
            className={cn(
              'border-2 rounded-xl overflow-hidden transition-all',
              isOpen
                ? 'border-primary-300 dark:border-primary-700 bg-primary-50/50 dark:bg-primary-900/10'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            )}
          >
            {/* Question Button */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span className="font-semibold text-gray-900 dark:text-white text-lg pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  'w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
              />
            </button>

            {/* Answer Panel */}
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96' : 'max-h-0'
              )}
            >
              <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
