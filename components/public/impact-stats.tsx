import { Users, Handshake, TrendingUp, Heart } from 'lucide-react'

/**
 * 임팩트 통계 컴포넌트
 *
 * 조직의 사회적 임팩트를 숫자로 표시
 */
export function ImpactStats() {
  const stats = [
    {
      icon: Users,
      number: '500+',
      label: '지원 가구',
      description: '6년간 누적 서비스 제공',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Handshake,
      number: '45+',
      label: '협력 파트너',
      description: '전국 복지기관, 기업, 학교',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: TrendingUp,
      number: '15억+',
      label: '사회적 가치',
      description: '누적 지원금 및 서비스',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: Heart,
      number: '98%',
      label: '만족도',
      description: '서비스 이용자 평균',
      color: 'from-rose-500 to-red-500',
      bgColor: 'bg-rose-50',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
    },
  ]

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            숫자로 보는 임팩트
          </h2>
          <p className="text-lg text-gray-600">
            6년간 함께 만들어온 변화와 성과
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`${stat.bgColor} rounded-2xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-gray-200`}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.iconBg} ${stat.iconColor} mb-4`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.label}
                </div>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            여러분의 참여가 더 큰 임팩트를 만듭니다
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            후원과 자원봉사, 파트너십을 통해 더 많은 장애인 가족에게 희망을 전할 수 있습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/support"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              후원하기
            </a>
            <a
              href="/b2b"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
            >
              파트너십 문의
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
