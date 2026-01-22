import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide' | 'full'
  as?: 'div' | 'section' | 'article' | 'main'
}

const sizeClasses = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-[1600px]',
  full: 'max-w-full',
}

export function Container({
  children,
  className,
  size = 'default',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'container mx-auto',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  )
}
