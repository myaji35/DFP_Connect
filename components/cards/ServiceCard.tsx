import Link from 'next/link'
import { ArrowRight, LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  features?: string[]
  link: string
  linkText?: string
  badge?: string
  badgeVariant?: 'default' | 'success' | 'warning' | 'emergency'
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  features,
  link,
  linkText = '자세히 보기',
  badge,
  badgeVariant = 'default',
}: ServiceCardProps) {
  return (
    <Link href={link} className="group block h-full" id={link.replace('#', '')}>
      <div className="h-full bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 transition-all duration-300 hover:shadow-2xl hover:border-primary-300 dark:hover:border-primary-700 hover:-translate-y-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          {badge && (
            <Badge variant={badgeVariant} size="md">
              {badge}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Link */}
        <div className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold group-hover:gap-3 transition-all">
          <span>{linkText}</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  )
}
