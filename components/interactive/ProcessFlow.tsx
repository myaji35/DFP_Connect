import { LucideIcon, ArrowRight } from 'lucide-react'

interface ProcessStep {
  number: number
  title: string
  description: string
  icon?: LucideIcon
}

interface ProcessFlowProps {
  steps: ProcessStep[]
  variant?: 'horizontal' | 'vertical'
}

export function ProcessFlow({ steps, variant = 'horizontal' }: ProcessFlowProps) {
  if (variant === 'vertical') {
    return (
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.number} className="flex gap-6">
            {/* Number Circle */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center text-xl font-bold">
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-16 bg-gray-200 dark:bg-gray-700 mx-auto mt-4" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                {step.icon && (
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                )}
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Horizontal variant
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
      {steps.map((step, index) => (
        <div key={step.number} className="relative">
          {/* Card */}
          <div className="h-full bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-700 transition-all">
            {/* Number Badge */}
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white text-lg font-bold mb-4">
              {step.number}
            </div>

            {/* Icon */}
            {step.icon && (
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
            )}

            {/* Title */}
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {step.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Arrow (desktop only) */}
          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 translate-x-full z-10">
              <ArrowRight className="w-6 h-6 text-primary-400" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
