import { TimelineItem } from './timeline-item'
import { timelineEvents } from '@/lib/constants/timeline'

/**
 * 타임라인 컴포넌트
 *
 * 조직의 연혁을 시간순으로 표시
 */
export function Timeline() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          우리의 여정
        </h2>
        <p className="text-lg text-gray-600">
          2018년부터 함께한 장애인 가족과의 동행
        </p>
      </div>

      {/* Timeline Items */}
      <div className="relative">
        {timelineEvents.map((event, index) => (
          <TimelineItem key={`${event.year}-${index}`} event={event} index={index} />
        ))}
      </div>
    </div>
  )
}
