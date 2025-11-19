'use client'

import { Dialog } from '@/components/ui/dialog'
import type { Service } from '@/lib/types/service'
import { Check, Clock, DollarSign, Users, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface ServiceDetailModalProps {
  service: Service | null
  isOpen: boolean
  onClose: () => void
}

/**
 * 서비스 상세 정보 모달
 */
export function ServiceDetailModal({
  service,
  isOpen,
  onClose,
}: ServiceDetailModalProps) {
  if (!service) return null

  const Icon = service.icon

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="lg" title={service.name}>
      <div className="space-y-6">
        {/* Icon & Description */}
        <div className="flex items-start gap-4">
          <div
            className={`flex items-center justify-center w-16 h-16 rounded-full ${service.bgColor} ${service.iconColor} flex-shrink-0`}
          >
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-700 leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-gray-500 mb-1">대상</div>
              <div className="text-sm font-semibold text-gray-900">
                {service.target}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-gray-500 mb-1">비용</div>
              <div className="text-sm font-semibold text-gray-900">
                {service.cost}
              </div>
            </div>
          </div>
          {service.duration && (
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-gray-500 mb-1">소요 시간</div>
                <div className="text-sm font-semibold text-gray-900">
                  {service.duration}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">주요 특징</h3>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* How to Apply */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">신청 방법</h3>
          <ol className="space-y-2">
            {service.howToApply.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Apply Button */}
        {service.applyLink && (
          <div className="pt-4 border-t">
            <Link
              href={service.applyLink}
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              지금 신청하기
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </Dialog>
  )
}
