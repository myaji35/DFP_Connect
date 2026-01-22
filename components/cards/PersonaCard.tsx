import Link from 'next/link'
import { ArrowRight, LucideIcon } from 'lucide-react'

interface PersonaCardProps {
  title: string
  description: string
  icon: LucideIcon
  link: string
  linkText?: string
  accentColor?: 'blue' | 'green' | 'orange' | 'purple'
}

const accentColors = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    icon: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40',
    hover: 'hover:border-blue-300 dark:hover:border-blue-700',
    link: 'text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    icon: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-100 dark:bg-green-900/40',
    hover: 'hover:border-green-300 dark:hover:border-green-700',
    link: 'text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    icon: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-100 dark:bg-orange-900/40',
    hover: 'hover:border-orange-300 dark:hover:border-orange-700',
    link: 'text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    icon: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-100 dark:bg-purple-900/40',
    hover: 'hover:border-purple-300 dark:hover:border-purple-700',
    link: 'text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300',
  },
}

export function PersonaCard({
  title,
  description,
  icon: Icon,
  link,
  linkText = '자세히 보기',
  accentColor = 'blue',
}: PersonaCardProps) {
  const colors = accentColors[accentColor]

  return (
    <Link href={link} className="group block">
      <div className={`h-full bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 transition-all duration-300 hover:shadow-xl ${colors.hover}`}>
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 ${colors.iconBg}`}>
          <Icon className={`w-8 h-8 ${colors.icon}`} />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Link */}
        <div className={`inline-flex items-center gap-2 font-semibold ${colors.link} transition-all`}>
          <span>{linkText}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
