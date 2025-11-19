import { Target, Users, TrendingUp, Heart } from 'lucide-react'

/**
 * Mission 섹션 컴포넌트
 *
 * 조직의 미션과 핵심 가치 표시
 */
export function MissionSection() {
  const values = [
    {
      icon: Target,
      title: '전문성',
      description: '장애인 가족 지원 전문 인력과 체계적인 프로그램',
    },
    {
      icon: Users,
      title: '공동체',
      description: '가족, 기관, 후원자가 함께 만드는 사회적 연대',
    },
    {
      icon: TrendingUp,
      title: '성장',
      description: '지속 가능한 발전과 임팩트 확대',
    },
    {
      icon: Heart,
      title: '돌봄',
      description: '따뜻한 마음과 진정성 있는 서비스',
    },
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            우리의 미션
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            장애와가족플랫폼은 장애인 가족이 일상에서 마주하는 어려움을 해결하고,
            <br className="hidden md:block" />
            삶의 질을 향상시키며, 사회 통합을 이루는 데 기여합니다.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-blue-600 text-white rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold">
              함께 만드는 변화
            </h3>
            <p className="text-blue-100 max-w-2xl">
              여러분의 참여와 후원이 장애인 가족의 희망이 됩니다.
              지금 바로 시작하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a
                href="/support"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                후원하기
              </a>
              <a
                href="/about"
                className="inline-block bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
              >
                자세히 알아보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
