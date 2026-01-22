import { Quote } from 'lucide-react'

interface TestimonialCardProps {
  quote: string
  author: string
  organization: string
  role?: string
  className?: string
}

/**
 * 협력 기관 후기 카드
 *
 * B2B 파트너 페이지에서 사용되는 고객 후기 카드
 */
export function TestimonialCard({
  quote,
  author,
  organization,
  role,
  className = '',
}: TestimonialCardProps) {
  return (
    <div
      className={`
        relative bg-white dark:bg-gray-800
        rounded-lg shadow-lg p-6 md:p-8
        border border-gray-100 dark:border-gray-700
        hover:shadow-xl transition-shadow duration-300
        ${className}
      `}
    >
      {/* 따옴표 아이콘 */}
      <div className="absolute top-4 right-4 opacity-10 dark:opacity-5">
        <Quote className="w-12 h-12 text-primary-500" />
      </div>

      {/* 후기 내용 */}
      <blockquote className="relative z-10 mb-6">
        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed italic">
          "{quote}"
        </p>
      </blockquote>

      {/* 작성자 정보 */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center gap-3">
          {/* 이니셜 아바타 */}
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">
              {author.charAt(0)}
            </span>
          </div>

          {/* 정보 */}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {author}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {role && <span>{role} · </span>}
              {organization}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
