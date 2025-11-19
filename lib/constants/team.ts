import type { TeamMember } from '@/lib/types/team'

/**
 * 장애와가족플랫폼 팀 구성원
 */
export const teamMembers: TeamMember[] = [
  // 리더십
  {
    id: 'ceo',
    name: '김성심',
    position: '이사장',
    department: '경영진',
    bio: '장애인 가족 지원 분야 20년 경력의 전문가로, 사회적 돌봄체계 구축에 헌신하고 있습니다.',
    expertise: ['사회적경제', '장애인복지', '조직운영'],
    order: 1,
  },
  {
    id: 'coo',
    name: '이영희',
    position: '사무국장',
    department: '경영진',
    bio: '사회복지 현장 15년 경력으로 서비스 품질 향상과 운영 효율화를 책임지고 있습니다.',
    expertise: ['복지행정', '프로그램 기획', '품질관리'],
    order: 2,
  },

  // 팀장급
  {
    id: 'emergency-lead',
    name: '박지연',
    position: '긴급돌봄팀 팀장',
    department: '돌봄서비스',
    bio: '긴급 상황 대응 전문가로 24시간 돌봄 체계를 운영하고 있습니다.',
    expertise: ['긴급대응', '돌봄서비스', '위기개입'],
    order: 3,
  },
  {
    id: 'education-lead',
    name: '최민수',
    position: '교육지원팀 팀장',
    department: '교육서비스',
    bio: '특수교육 전문가로 방과후 홈티 프로그램을 기획하고 운영합니다.',
    expertise: ['특수교육', '발달장애', '행동치료'],
    order: 4,
  },
  {
    id: 'counseling-lead',
    name: '정수진',
    position: '상담센터장',
    department: '상담서비스',
    bio: '임상심리 전문가로 가족 상담 및 심리 지원 프로그램을 총괄합니다.',
    expertise: ['가족상담', '임상심리', '트라우마 치료'],
    order: 5,
  },
  {
    id: 'b2b-lead',
    name: '강태현',
    position: 'B2B사업팀 팀장',
    department: 'B2B서비스',
    bio: '기업 협력 전문가로 전문인력 파견 및 파트너십 확대를 담당합니다.',
    expertise: ['기업협력', '인력관리', '사업개발'],
    order: 6,
  },

  // 전문가
  {
    id: 'social-worker-1',
    name: '윤서현',
    position: '사회복지사',
    department: '돌봄서비스',
    bio: '현장 경력 10년의 사회복지사로 가족 맞춤형 돌봄을 제공합니다.',
    expertise: ['사회복지', '사례관리', '자원연계'],
    order: 7,
  },
  {
    id: 'therapist-1',
    name: '한지우',
    position: '언어치료사',
    department: '교육서비스',
    bio: '언어 발달 전문가로 의사소통 능력 향상을 지원합니다.',
    expertise: ['언어치료', '의사소통', 'AAC'],
    order: 8,
  },
  {
    id: 'counselor-1',
    name: '임다은',
    position: '전문상담사',
    department: '상담서비스',
    bio: '가족 관계 개선과 정서 안정 지원을 전문으로 합니다.',
    expertise: ['가족치료', '정서지원', '집단상담'],
    order: 9,
  },
]

/**
 * 카테고리별 팀 구성원
 */
export const teamByCategory = {
  leadership: teamMembers.filter((m) =>
    ['이사장', '사무국장'].includes(m.position)
  ),
  management: teamMembers.filter((m) => m.position.includes('팀장') || m.position.includes('센터장')),
  specialist: teamMembers.filter(
    (m) =>
      !['이사장', '사무국장'].includes(m.position) &&
      !m.position.includes('팀장') &&
      !m.position.includes('센터장')
  ),
}
