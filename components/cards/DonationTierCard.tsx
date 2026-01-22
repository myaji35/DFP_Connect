import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface DonationTierCardProps {
  amount: number
  title: string
  description: string
  benefits: string[]
  isPopular?: boolean
  ctaLink?: string
  className?: string
}

/**
 * 후원 등급 카드
 *
 * 월 후원 금액별 혜택을 보여주는 카드 컴포넌트
 */
export function DonationTierCard({
  amount,
  title,
  description,
  benefits,
  isPopular = false,
  ctaLink = '#donate',
  className = '',
}: DonationTierCardProps) {
  return (
    <div
      className={`
        relative bg-white dark:bg-gray-800
        rounded-2xl shadow-lg
        border-2 ${
          isPopular
            ? 'border-primary-500 shadow-primary-200 dark:shadow-primary-900/50'
            : 'border-gray-200 dark:border-gray-700'
        }
        p-8
        hover:shadow-xl transition-all duration-300
        ${isPopular ? 'scale-105 z-10' : 'hover:scale-105'}
        ${className}
      `}
    >
      {/* 인기 배지 */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
            인기
          </span>
        </div>
      )}

      {/* 금액 */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className="text-gray-600 dark:text-gray-400 text-lg">월</span>
          <span className="text-5xl font-bold text-gray-900 dark:text-white">
            {amount.toLocaleString()}
          </span>
          <span className="text-gray-600 dark:text-gray-400 text-lg">원</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-200 dark:border-gray-700 mb-6" />

      {/* 혜택 목록 */}
      <ul className="space-y-3 mb-8">
        {benefits.map((benefit, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA 버튼 */}
      <Link
        href={ctaLink}
        className={`
          w-full flex items-center justify-center gap-2
          px-6 py-3 rounded-lg font-semibold
          transition-all duration-300
          ${
            isPopular
              ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
          }
        `}
      >
        <span>후원하기</span>
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  )
}
