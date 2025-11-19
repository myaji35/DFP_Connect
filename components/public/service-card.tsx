import { ArrowRight, Check } from 'lucide-react'
import type { Service } from '@/lib/types/service'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  service: Service
  onViewDetails: (service: Service) => void
}

/**
 * 서비스 카드 컴포넌트
 */
export function ServiceCard({ service, onViewDetails }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <div
      className={cn(
        'rounded-2xl border-2 border-gray-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1 group',
        service.bgColor
      )}
    >
      {/* Icon & Badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            'flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md',
            service.iconColor
          )}
        >
          <Icon className="w-7 h-7" />
        </div>
        {service.badge && (
          <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700 shadow-sm">
            {service.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>

      {/* Features (첫 3개만 표시) */}
      <ul className="space-y-2 mb-6">
        {service.features.slice(0, 3).map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* View Details Button */}
      <button
        onClick={() => onViewDetails(service)}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm group-hover:shadow-md"
      >
        자세히 보기
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  )
}
