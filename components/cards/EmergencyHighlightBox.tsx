import Link from 'next/link'
import { Phone, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmergencyHighlightBoxProps {
  phone?: string
  hours?: string
  description?: string
}

export function EmergencyHighlightBox({
  phone = '02-1234-5678',
  hours = '24시간 365일',
  description = '긴급한 돌봄이 필요하신가요? 언제든지 연락주세요.',
}: EmergencyHighlightBoxProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emergency to-emergency-dark rounded-2xl p-8 md:p-10 text-white shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              긴급돌봄 서비스
            </h3>
            <p className="text-white/90 text-base md:text-lg">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Phone */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-lg p-4">
            <Phone className="w-6 h-6 text-white flex-shrink-0" />
            <div>
              <p className="text-sm text-white/80 mb-1">긴급 연락처</p>
              <a
                href={`tel:${phone.replace(/-/g, '')}`}
                className="text-xl font-bold hover:underline"
              >
                {phone}
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-lg p-4">
            <Clock className="w-6 h-6 text-white flex-shrink-0" />
            <div>
              <p className="text-sm text-white/80 mb-1">운영 시간</p>
              <p className="text-xl font-bold">{hours}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/services#emergency" className="flex-1">
            <Button
              size="lg"
              variant="secondary"
              className="w-full bg-white text-emergency hover:bg-gray-100"
            >
              긴급돌봄 신청하기
            </Button>
          </Link>
          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-2 border-white/50 text-white hover:bg-white/10"
            >
              다른 서비스 보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
