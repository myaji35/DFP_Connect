import { Check, Star } from 'lucide-react'
import type { TimelineEvent } from '@/lib/types/timeline'
import { cn } from '@/lib/utils'

interface TimelineItemProps {
  event: TimelineEvent
  index: number
}

/**
 * 타임라인 아이템 컴포넌트
 */
export function TimelineItem({ event, index }: TimelineItemProps) {
  const categoryColors = {
    founding: 'bg-purple-100 text-purple-600 border-purple-200',
    partnership: 'bg-blue-100 text-blue-600 border-blue-200',
    service: 'bg-green-100 text-green-600 border-green-200',
    achievement: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    expansion: 'bg-rose-100 text-rose-600 border-rose-200',
  }

  const categoryLabels = {
    founding: '설립',
    partnership: '파트너십',
    service: '서비스',
    achievement: '성과',
    expansion: '확장',
  }

  return (
    <div className="flex gap-6 group">
      {/* Timeline Line & Icon */}
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow-lg z-10 transition-transform group-hover:scale-110',
            event.isMajor
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 border-gray-200'
          )}
        >
          {event.isMajor ? (
            <Star className="w-5 h-5 fill-current" />
          ) : (
            <Check className="w-5 h-5" />
          )}
        </div>

        {/* Vertical Line (except last item) */}
        <div className="w-0.5 h-full bg-gray-200 -mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        {/* Date */}
        <div className="text-sm font-bold text-blue-600 mb-2">
          {event.year}
          {event.month && `.${event.month}`}
        </div>

        {/* Category Badge */}
        {event.category && (
          <span
            className={cn(
              'inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 border',
              categoryColors[event.category]
            )}
          >
            {categoryLabels[event.category]}
          </span>
        )}

        {/* Title */}
        <h3
          className={cn(
            'text-lg font-bold mb-2 transition-colors',
            event.isMajor ? 'text-gray-900' : 'text-gray-800 group-hover:text-blue-600'
          )}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">{event.description}</p>
      </div>
    </div>
  )
}
