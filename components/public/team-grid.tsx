import { TeamMemberCard } from './team-member-card'
import { teamByCategory } from '@/lib/constants/team'

/**
 * 팀 그리드 컴포넌트
 *
 * 카테고리별로 팀 구성원 표시
 */
export function TeamGrid() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          우리 팀
        </h2>
        <p className="text-lg text-gray-600">
          장애인 가족과 함께하는 전문가들을 소개합니다
        </p>
      </div>

      {/* Leadership */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          경영진
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {teamByCategory.leadership.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Management */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          팀장 및 센터장
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamByCategory.management.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Specialists */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          전문가
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamByCategory.specialist.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Join CTA */}
      <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          함께 일할 동료를 찾습니다
        </h3>
        <p className="text-gray-600 mb-6">
          장애인 가족과 함께 성장하고 싶은 전문가를 기다립니다
        </p>
        <a
          href="mailto:recruit@dfp.or.kr"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
        >
          채용 문의하기
        </a>
      </div>
    </div>
  )
}
