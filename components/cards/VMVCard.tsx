import { LucideIcon } from 'lucide-react'

interface VMVCardProps {
  title: string
  description: string
  icon: LucideIcon
  accentColor?: 'blue' | 'green' | 'purple' | 'orange'
}

const accentColors = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    iconBg: 'bg-blue-500',
    border: 'border-blue-200 dark:border-blue-800',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    iconBg: 'bg-green-500',
    border: 'border-green-200 dark:border-green-800',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    iconBg: 'bg-purple-500',
    border: 'border-purple-200 dark:border-purple-800',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    iconBg: 'bg-orange-500',
    border: 'border-orange-200 dark:border-orange-800',
  },
}

export function VMVCard({
  title,
  description,
  icon: Icon,
  accentColor = 'blue',
}: VMVCardProps) {
  const colors = accentColors[accentColor]

  return (
    <div className={`h-full ${colors.bg} rounded-2xl border-2 ${colors.border} p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${colors.iconBg} text-white mb-6 shadow-lg`}>
        <Icon className="w-8 h-8" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
