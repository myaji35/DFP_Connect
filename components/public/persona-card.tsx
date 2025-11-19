import Link from 'next/link'
import { Check } from 'lucide-react'
import type { PersonaCard as PersonaCardType } from '@/lib/types/persona'
import { cn } from '@/lib/utils'

interface PersonaCardProps {
  persona: PersonaCardType
}

/**
 * 페르소나 카드 컴포넌트
 *
 * 단일 페르소나를 표시하는 카드
 */
export function PersonaCard({ persona }: PersonaCardProps) {
  const Icon = persona.icon

  return (
    <div
      className={cn(
        'flex flex-col h-full rounded-2xl border-2 border-gray-200 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2',
        persona.bgColor
      )}
    >
      <div className="flex-1 p-8">
        {/* Icon */}
        <div
          className={cn(
            'inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6 shadow-md',
            persona.iconColor
          )}
        >
          <Icon className="w-8 h-8" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {persona.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-6">{persona.description}</p>

        {/* Benefits */}
        <ul className="space-y-3 mb-8">
          {persona.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="p-8 pt-0">
        <Link
          href={persona.ctaLink}
          className={cn(
            'block w-full text-center py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg',
            persona.buttonColor
          )}
        >
          {persona.ctaText}
        </Link>
      </div>
    </div>
  )
}
