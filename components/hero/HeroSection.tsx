import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: string
  variant?: 'default' | 'gradient-blue' | 'gradient-purple' | 'image-overlay'
}

export function HeroSection({
  title,
  subtitle,
  description,
  ctaText = '시작하기',
  ctaLink = '/services',
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  variant = 'gradient-blue',
}: HeroSectionProps) {
  const backgroundClass = {
    default: 'bg-white dark:bg-gray-900',
    'gradient-blue': 'bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800',
    'gradient-purple': 'bg-gradient-to-b from-purple-50 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800',
    'image-overlay': 'relative bg-gray-900',
  }[variant]

  return (
    <section className={`relative overflow-hidden ${backgroundClass}`}>
      {/* Background Image with Overlay */}
      {variant === 'image-overlay' && backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/90" />
        </>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-36 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Subtitle */}
          {subtitle && (
            <p className={`text-sm md:text-base font-semibold mb-4 ${
              variant === 'image-overlay'
                ? 'text-primary-400'
                : 'text-primary-500'
            }`}>
              {subtitle}
            </p>
          )}

          {/* Title */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight ${
            variant === 'image-overlay'
              ? 'text-white'
              : 'text-gray-900 dark:text-white'
          }`}>
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className={`text-lg md:text-xl mb-10 leading-relaxed ${
              variant === 'image-overlay'
                ? 'text-gray-200'
                : 'text-gray-600 dark:text-gray-300'
            }`}>
              {description}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={ctaLink}>
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
                {ctaText}
              </Button>
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link href={secondaryCtaLink}>
                <Button
                  size="lg"
                  variant={variant === 'image-overlay' ? 'outline' : 'secondary'}
                >
                  {secondaryCtaText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      {variant !== 'image-overlay' && (
        <>
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </>
      )}
    </section>
  )
}
