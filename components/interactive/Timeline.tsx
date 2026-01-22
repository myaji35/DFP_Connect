import { Circle } from 'lucide-react'

interface TimelineEvent {
  year: string
  title: string
  description: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical Line (desktop) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200 dark:from-primary-800 dark:via-primary-600 dark:to-primary-800 transform -translate-x-1/2" />

      <div className="space-y-12">
        {events.map((event, index) => {
          const isEven = index % 2 === 0

          return (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content Card */}
              <div className="w-full md:w-5/12">
                <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-bold">
                      {event.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Center Dot */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900 shadow-lg" />
              </div>

              {/* Spacer (for alternating layout) */}
              <div className="hidden md:block w-5/12" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
