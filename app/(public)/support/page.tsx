import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Users, TrendingUp, Award, Sparkles, Home, GraduationCap, MessageCircle, Plane } from 'lucide-react'
import { HeroSection } from '@/components/hero/HeroSection'
import { ImpactCounter } from '@/components/interactive/ImpactCounter'
import { DonationTierCard } from '@/components/cards/DonationTierCard'
import { StoryCard } from '@/components/cards/StoryCard'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: '후원하기 | DFP Connect',
  description:
    '장애인 가족과 함께하는 변화를 만들어보세요. 정기 후원으로 긴급돌봄, 교육, 상담 서비스를 지원하고, 투명한 임팩트 리포트를 받아보세요.',
  keywords: '후원, 기부, 장애인후원, 정기후원, 일회성후원, 사회공헌, 장애인가족지원',
  openGraph: {
    title: '후원하기 | DFP Connect',
    description: '함께 만드는 변화, 장애인 가족의 희망이 됩니다',
    type: 'website',
  },
}

/**
 * 후원자 페이지
 *
 * 후원 안내, 후원 등급, 임팩트 스토리, 후원 신청 CTA
 */
export default async function SupportPage() {
  // 후원 관련 스토리 가져오기 (예시)
  let impactStories = []
  try {
    const storiesRes = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/stories?limit=3&status=PUBLISHED`,
      {
        cache: 'no-store',
      }
    )
    const storiesData = await storiesRes.json()
    if (storiesData.success) {
      impactStories = storiesData.data.stories
    }
  } catch (error) {
    console.error('Failed to fetch stories:', error)
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        subtitle="함께 만드는 변화"
        title="장애인 가족의 희망이 됩니다"
        description="귀하의 후원은 긴급돌봄, 교육, 상담 등 실질적인 서비스로 장애인 가족에게 전달됩니다. 투명한 운영과 정기적인 임팩트 리포트로 후원의 가치를 확인하세요."
        ctaText="지금 후원하기"
        ctaLink="#donate"
        secondaryCtaText="임팩트 보기"
        secondaryCtaLink="#impact"
        variant="gradient-orange"
      />

      {/* 임팩트 통계 */}
      <Section spacing="xl" background="white" id="impact">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              숫자로 보는 우리의 임팩트
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              2024년 한 해 동안 후원자님과 함께 만든 변화입니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ImpactCounter value={1250} label="서비스 제공 건수" suffix="+" icon={TrendingUp} />
            <ImpactCounter value={480} label="지원받은 가족" suffix="+" icon={Users} />
            <ImpactCounter value={98} label="서비스 만족도" suffix="%" icon={Award} />
            <ImpactCounter value={320} label="활동 후원자" suffix="+" icon={Heart} />
          </div>
        </Container>
      </Section>

      {/* 후원금 사용처 */}
      <Section spacing="xl" background="gradient-blue">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              후원금은 어디에 쓰이나요?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              후원금의 100%가 장애인 가족을 위한 직접 서비스에 사용됩니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Home,
                title: '긴급돌봄',
                description: '갑작스러운 상황에서 필요한 긴급 돌봄 서비스 제공',
                percentage: '35%',
              },
              {
                icon: GraduationCap,
                title: '교육 지원',
                description: '방과후 홈티, 특수교육 등 맞춤형 교육 서비스',
                percentage: '30%',
              },
              {
                icon: MessageCircle,
                title: '상담 서비스',
                description: '개별 및 가족 상담으로 심리적 안정 지원',
                percentage: '20%',
              },
              {
                icon: Plane,
                title: '문화 활동',
                description: '맞춤형 여행, 문화 체험 등 가족 힐링 프로그램',
                percentage: '15%',
              },
            ].map((item, idx) => {
              const IconComponent = item.icon
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary-500" />
                  </div>
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    {item.percentage}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* 후원 등급 */}
      <Section spacing="xl" background="white" id="donate">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              정기 후원 안내
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              매월 자동으로 후원되며, 언제든지 변경 및 중단이 가능합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 max-w-7xl mx-auto">
            <DonationTierCard
              amount={10000}
              title="함께하는 친구"
              description="작은 정성이 큰 힘이 됩니다"
              benefits={[
                '월간 뉴스레터 발송',
                '연말 기부금 영수증 발급',
                '후원자 명단 등재',
              ]}
            />

            <DonationTierCard
              amount={30000}
              title="든든한 동반자"
              description="지속 가능한 변화를 만듭니다"
              benefits={[
                '월간 뉴스레터 발송',
                '분기별 임팩트 리포트',
                '연말 기부금 영수증 발급',
                '후원자 감사 행사 초대',
              ]}
              isPopular
            />

            <DonationTierCard
              amount={50000}
              title="희망의 메신저"
              description="한 가족의 일상을 바꿉니다"
              benefits={[
                '월간 뉴스레터 발송',
                '분기별 임팩트 리포트',
                '연말 기부금 영수증 발급',
                '후원자 감사 행사 초대',
                '감사 선물 증정',
              ]}
            />

            <DonationTierCard
              amount={100000}
              title="변화의 리더"
              description="지역사회에 큰 영향을 줍니다"
              benefits={[
                '모든 이전 혜택 포함',
                '1:1 후원 매칭 프로그램',
                '특별 간담회 초대',
                '조직 홍보물 이름 게재',
              ]}
            />
          </div>

          {/* 일회성 후원 안내 */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <span className="font-semibold">일회성 후원</span>도 큰 힘이 됩니다
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-600"
              >
                <span>일회성 후원하기</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 후원자 이야기 */}
      {impactStories.length > 0 && (
        <Section spacing="xl" background="gray">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                후원으로 만들어진 이야기
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                후원자님의 도움으로 변화된 장애인 가족의 진솔한 이야기
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {impactStories.map((story: any) => (
                <StoryCard
                  key={story.id}
                  id={story.id}
                  title={story.title}
                  excerpt={story.content.slice(0, 150) + '...'}
                  author={story.isAnonymous ? '익명' : story.authorName || '작성자'}
                  date={story.createdAt}
                  category={story.category}
                  viewCount={story.viewCount}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                <span>더 많은 이야기 보기</span>
              </Link>
            </div>
          </Container>
        </Section>
      )}

      {/* 투명한 운영 */}
      <Section spacing="xl" background="white">
        <Container size="narrow">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              투명한 운영
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              후원금의 사용처와 임팩트를 정기적으로 투명하게 공개합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-3xl font-bold text-primary-500 mb-2">100%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                직접 서비스 사용률
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-3xl font-bold text-primary-500 mb-2">매월</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                뉴스레터 발송
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-3xl font-bold text-primary-500 mb-2">분기</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                임팩트 리포트
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              후원 문의사항이 있으신가요?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:02-1234-5678"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
              >
                전화 문의: 02-1234-5678
              </a>
              <a
                href="mailto:support@dfp.or.kr"
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-600"
              >
                이메일: support@dfp.or.kr
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
