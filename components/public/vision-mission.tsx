import { Target, Heart, Users, Lightbulb } from 'lucide-react'

/**
 * 비전 & 미션 섹션 컴포넌트
 */
export function VisionMissionSection() {
  const vision = {
    title: '우리의 비전',
    description:
      '장애인 가족이 지역사회에서 차별 없이 존중받고, 자립적이고 행복한 삶을 영위할 수 있는 사회를 만듭니다.',
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  }

  const mission = {
    title: '우리의 미션',
    description:
      '전문적이고 따뜻한 돌봄 서비스를 통해 장애인 가족의 삶의 질을 향상시키고, 사회적 연대를 강화합니다.',
    icon: Heart,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
  }

  const values = [
    {
      icon: Users,
      title: '공동체 정신',
      description: '가족, 전문가, 지역사회가 함께 만드는 상호 돌봄 문화',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Heart,
      title: '전문성과 따뜻함',
      description: '검증된 전문가의 숙련된 기술과 진심 어린 마음',
      color: 'text-rose-600',
      bgColor: 'bg-rose-100',
    },
    {
      icon: Lightbulb,
      title: '혁신과 성장',
      description: '디지털 기술을 활용한 새로운 돌봄 솔루션 개발',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ]

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Vision */}
          <div
            className={`${vision.bgColor} rounded-2xl p-10 border-2 border-blue-200 hover:shadow-xl transition-all`}
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${vision.color} text-white mb-6`}
            >
              <vision.icon className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {vision.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {vision.description}
            </p>
          </div>

          {/* Mission */}
          <div
            className={`${mission.bgColor} rounded-2xl p-10 border-2 border-rose-200 hover:shadow-xl transition-all`}
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${mission.color} text-white mb-6`}
            >
              <mission.icon className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {mission.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {mission.description}
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              핵심 가치
            </h2>
            <p className="text-lg text-gray-600">
              우리가 소중히 여기는 가치들
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border-2 border-gray-100 p-8 text-center hover:shadow-xl hover:border-gray-200 transition-all"
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${value.bgColor} ${value.color} mb-4`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
