import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'gray' | 'gradient-blue' | 'gradient-purple' | 'white' | 'dark'
  id?: string
}

const spacingClasses = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16 md:py-20',
  xl: 'py-20 md:py-28',
}

const backgroundClasses = {
  default: '',
  gray: 'bg-gray-50 dark:bg-gray-900',
  'gradient-blue': 'bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800',
  'gradient-purple': 'bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800',
  white: 'bg-white dark:bg-gray-800',
  dark: 'bg-gray-900 text-white',
}

export function Section({
  children,
  className,
  spacing = 'lg',
  background = 'default',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </section>
  )
}
