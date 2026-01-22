interface ImageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  overlay?: boolean
  height?: 'sm' | 'md' | 'lg' | 'full'
}

const heightClasses = {
  sm: 'h-64 md:h-80',
  md: 'h-80 md:h-96',
  lg: 'h-96 md:h-[500px]',
  full: 'h-screen',
}

export function ImageHero({
  title,
  subtitle,
  backgroundImage,
  overlay = true,
  height = 'md',
}: ImageHeroProps) {
  return (
    <section className={`relative overflow-hidden ${heightClasses[height]}`}>
      {/* Background Image */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
      )}

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/80" />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          {subtitle && (
            <p className="text-primary-400 font-semibold text-base md:text-lg mb-4">
              {subtitle}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}
