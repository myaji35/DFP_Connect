import type { Metadata } from 'next'
import Link from 'next/link'
import { Eye, Heart, Target, Award, Users, Lightbulb, HandHeart } from 'lucide-react'
import { ImageHero } from '@/components/hero/ImageHero'
import { VMVCard } from '@/components/cards/VMVCard'
import { Timeline } from '@/components/interactive/Timeline'
import { ImpactStats } from '@/components/interactive/ImpactStats'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '조직 소개 - DFP Connect',
  description:
    '장애와가족플랫폼 사회적협동조합의 비전, 미션, 연혁, 팀 구성원을 소개합니다. 2018년부터 500가구 지원, 45개 파트너십을 통해 사회적 가치를 창출하고 있습니다.',
  keywords:
    '장애와가족플랫폼, 사회적협동조합, 조직소개, 연혁, 팀소개, 사회적가치',
}

/**
 * 조직 소개 페이지
 *
 * Hero + Vision/Mission/Values + Timeline + Impact Stats + CTA
 */
export default function AboutPage() {
  const timelineEvents = [
    {
      year: '2018',
      title: '조직 설립',
      description: '장애인 가족의 삶의 질 향상을 위한 사회적협동조합으로 출발했습니다.',
    },
    {
      year: '2019',
      title: '긴급돌봄 서비스 시작',
      description: '24시간 긴급돌봄 서비스를 시작하여 첫 해 120가구를 지원했습니다.',
    },
    {
      year: '2020',
      title: '방과후 홈티 확대',
      description: '코로나19 시기, 온라인/오프라인 방과후 홈티 서비스를 확대했습니다.',
    },
    {
      year: '2021',
      title: 'B2B 전문인력 파견',
      description: '학교 및 센터 대상 전문인력 파견 서비스를 시작했습니다.',
    },
    {
      year: '2022',
      title: '맞춤형 여행 프로그램',
      description: '장애인 가족을 위한 배리어프리 여행 프로그램을 론칭했습니다.',
    },
    {
      year: '2023',
      title: '디지털 플랫폼 구축',
      description: 'DFP Connect 온라인 플랫폼을 통해 서비스 접근성을 크게 향상시켰습니다.',
    },
    {
      year: '2024',
      title: '500가구 누적 지원',
      description: '설립 6년 만에 누적 500가구 지원을 달성하며 지속 가능한 성장을 이뤘습니다.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <ImageHero
        title="장애와가족플랫폼 사회적협동조합"
        subtitle="2018년부터 함께해온 장애인 가족과의 동행"
        height="md"
      />

      {/* Introduction */}
      <Section spacing="xl" background="white">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              함께 만드는 따뜻한 사회
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              장애와가족플랫폼은 2018년 설립 이후, 장애인 가족의 일상을 함께 지원하며
              사회적 돌봄체계 구축을 위해 노력해왔습니다.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              긴급돌봄부터 교육, 상담, 여행까지 다양한 서비스를 통해 장애인 가족의
              삶의 질을 향상시키고, 더 나은 사회를 만들어가고 있습니다.
            </p>
          </div>
        </Container>
      </Section>

      {/* Vision, Mission, Values */}
      <Section spacing="xl" background="gradient-blue">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              우리의 가치
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              DFP가 추구하는 비전과 미션, 핵심 가치입니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <VMVCard
              title="Vision"
              description="장애인 가족이 행복하게 일상을 누리는 사회, 모두가 함께 성장하는 따뜻한 공동체를 만듭니다."
              icon={Eye}
              accentColor="blue"
            />
            <VMVCard
              title="Mission"
              description="전문적이고 따뜻한 돌봄 서비스를 통해 장애인 가족의 삶의 질을 향상시키고, 사회적 가치를 창출합니다."
              icon={Target}
              accentColor="green"
            />
            <VMVCard
              title="Core Values"
              description="전문성, 신뢰, 존중, 협력을 바탕으로 장애인 가족과 함께 지속 가능한 돌봄 생태계를 구축합니다."
              icon={Heart}
              accentColor="purple"
            />
          </div>
        </Container>
      </Section>

      {/* Impact Stats */}
      <Section spacing="xl" background="white">
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
              { value: 500, label: '지원 가구', suffix: '+', icon: Users },
              { value: 1200, label: '서비스 제공 건수', suffix: '+', icon: Heart },
              { value: 45, label: '협력 파트너', suffix: '+', icon: HandHeart },
              { value: 98, label: '만족도', suffix: '%', icon: Award },
            ]}
          />
        </Container>
      </Section>

      {/* Timeline */}
      <Section spacing="xl" background="gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              우리의 여정
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              2018년부터 지금까지 함께 걸어온 길
            </p>
          </div>

          <Timeline events={timelineEvents} />
        </Container>
      </Section>

      {/* Core Strengths */}
      <Section spacing="xl" background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              DFP의 강점
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              우리가 자신있게 제공할 수 있는 것들
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 mb-4">
                <Award className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                전문성
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                자격증 보유 전문가들의 체계적인 서비스
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 mb-4">
                <Users className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                맞춤형
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                가족별 욕구에 맞는 개별화된 솔루션
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 mb-4">
                <Heart className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                신뢰
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                6년간 쌓아온 가족들과의 신뢰 관계
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 mb-4">
                <Lightbulb className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                혁신
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                디지털 기술을 활용한 접근성 향상
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" background="gradient-purple">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              함께 성장하는 파트너를 찾습니다
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              후원, 자원봉사, 파트너십 등 다양한 방식으로 참여하실 수 있습니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/support">
                <Button size="lg" variant="primary">
                  후원하기
                </Button>
              </Link>
              <Link href="/partners">
                <Button size="lg" variant="outline">
                  파트너십 문의
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="secondary">
                  서비스 신청
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
