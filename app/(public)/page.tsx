import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Users, HandHeart, TrendingUp, Award, Clock, ArrowRight } from 'lucide-react'
import { HeroSection } from '@/components/hero/HeroSection'
import { PersonaCard } from '@/components/cards/PersonaCard'
import { StoryCard } from '@/components/cards/StoryCard'
import { ImpactStats } from '@/components/interactive/ImpactStats'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'DFP Connect - 장애와가족플랫폼 | 장애인 가족과 함께하는 희망의 디지털 허브',
  description:
    '장애인 가족을 위한 긴급돌봄, 방과후 홈티, 가족 상담, 맞춤형 여행 서비스를 제공합니다. 전문 인력 파견과 사회적 협력을 통해 장애인 가족의 삶의 질을 향상시킵니다.',
  keywords:
    '장애인가족, 긴급돌봄, 방과후홈티, 가족상담, 맞춤형여행, 장애인지원, 사회적협동조합, 전문인력파견',
  openGraph: {
    title: 'DFP Connect - 장애와가족플랫폼',
    description: '장애인 가족과 함께하는 희망의 디지털 허브',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://dfp.or.kr',
    siteName: 'DFP Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DFP Connect - 장애와가족플랫폼',
    description: '장애인 가족과 함께하는 희망의 디지털 허브',
  },
}

/**
 * 메인 랜딩 페이지
 *
 * Hero + 3 Persona Cards + Impact Stats + Story Preview 섹션으로 구성
 */
export default async function HomePage() {
  // 최근 스토리 가져오기 (미리보기용)
  let recentStories = []
  try {
    const storiesRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/stories?limit=3&status=PUBLISHED`, {
      cache: 'no-store',
    })
    const storiesData = await storiesRes.json()
    if (storiesData.success) {
      recentStories = storiesData.data.stories
    }
  } catch (error) {
    console.error('Failed to fetch stories:', error)
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        subtitle="장애인 가족과 함께하는"
        title="희망의 디지털 허브"
        description="장애와가족플랫폼은 긴급돌봄, 방과후 홈티, 가족 상담 등 맞춤형 서비스를 통해 장애인 가족의 일상을 함께 지원합니다."
        ctaText="서비스 신청하기"
        ctaLink="/services"
        secondaryCtaText="조직 소개"
        secondaryCtaLink="/about"
        variant="gradient-blue"
      />

      {/* Persona Cards Section */}
      <Section spacing="xl" background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              누구를 위한 서비스인가요?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              DFP Connect는 세 가지 주요 대상을 위한 맞춤형 서비스를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <PersonaCard
              title="장애인 가족"
              description="긴급돌봄, 방과후 홈티, 가족 상담, 맞춤형 여행 등 다양한 서비스를 이용하실 수 있습니다."
              icon={Heart}
              link="/services"
              linkText="서비스 보기"
              accentColor="blue"
            />
            <PersonaCard
              title="협력 파트너"
              description="학교, 센터, 기관을 위한 전문인력 파견 및 맞춤형 솔루션을 제공합니다."
              icon={Users}
              link="/partners"
              linkText="협력 안내"
              accentColor="green"
            />
            <PersonaCard
              title="후원자"
              description="장애인 가족의 일상을 함께 지원하고, 사회적 가치를 실현하는데 동참해주세요."
              icon={HandHeart}
              link="/support"
              linkText="후원하기"
              accentColor="orange"
            />
          </div>
        </Container>
      </Section>

      {/* Impact Stats Section */}
      <Section spacing="xl" background="gradient-blue">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              함께 만든 변화
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              숫자로 보는 DFP의 임팩트
            </p>
          </div>

          <ImpactStats
            stats={[
              { value: 1200, label: '서비스 제공 건수', suffix: '+', icon: TrendingUp },
              { value: 450, label: '지원받은 가족', suffix: '+', icon: Users },
              { value: 98, label: '만족도', suffix: '%', icon: Award },
              { value: 15, label: '평균 응답 시간', suffix: '분', icon: Clock },
            ]}
          />
        </Container>
      </Section>

      {/* Recent Stories Section */}
      {recentStories.length > 0 && (
        <Section spacing="xl" background="white">
          <Container>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  가족 이야기
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  장애인 가족들의 진솔한 경험을 공유합니다
                </p>
              </div>
              <Link
                href="/stories"
                className="hidden md:inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                <span>모든 이야기 보기</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentStories.map((story: any) => (
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

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                <span>모든 이야기 보기</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section spacing="xl" background="gradient-purple">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              장애인 가족의 일상을 함께 지원하는 DFP와 함께하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center h-12 px-8 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
              >
                서비스 신청하기
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center h-12 px-8 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors border-2 border-gray-300"
              >
                더 알아보기
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
