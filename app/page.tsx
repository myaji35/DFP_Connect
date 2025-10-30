import { PersonaSelector } from '@/components/persona-selector'
import { EmergencyCareButton } from '@/components/emergency-care-button'
import { Header } from '@/components/header'
import { Heart, Users, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Header */}
      <Header />

      {/* 긴급돌봄 바로가기 버튼 */}
      <EmergencyCareButton />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-20 pt-32">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute right-1/4 top-40 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2 shadow-lg">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-700">
              장애인 가족과 함께하는 디지털 허브
            </span>
          </div>

          <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-7xl">
            함께하는 돌봄,
            <br />
            새로운 일상의 시작
          </h1>

          <p className="mb-8 text-xl text-gray-600 md:text-2xl">
            장애와가족플랫폼 사회적협동조합
          </p>

          <p className="mb-12 text-lg text-gray-500 md:text-xl">
            "가족이 입원했는데 아이를 맡길 곳이 없어요"
            <br />
            "우리 아이에게 맞는 교육이 필요해요"
            <br />
            <span className="font-semibold text-gray-700">당신의 고민, 우리가 함께합니다.</span>
          </p>

          {/* Stats */}
          <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:scale-105">
              <div className="mb-2 text-4xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">긴급돌봄 지원</div>
              <div className="mt-2 text-xs text-gray-400">언제나 당신 곁에</div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:scale-105">
              <div className="mb-2 text-4xl font-bold text-purple-600">500+</div>
              <div className="text-gray-600">서비스 제공 가족</div>
              <div className="mt-2 text-xs text-gray-400">함께 성장하는 커뮤니티</div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:scale-105">
              <div className="mb-2 text-4xl font-bold text-pink-600">15+</div>
              <div className="text-gray-600">전문 파트너기관</div>
              <div className="mt-2 text-xs text-gray-400">믿을 수 있는 협력</div>
            </div>
          </div>
        </div>
      </section>

      {/* Persona Selection Section */}
      <section className="px-4 py-20">
        <PersonaSelector />
      </section>

      {/* Services Preview */}
      <section id="services" className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              주요 서비스
            </h2>
            <p className="text-xl text-gray-600">
              가족의 필요에 맞는 전문적이고 따뜻한 서비스를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: '긴급돌봄',
                description: '보호자의 갑작스러운 입원이나 긴급 상황 시 즉시 돌봄 제공',
                icon: '🚨',
                color: 'from-red-500 to-orange-500',
                detail: '24시간 긴급 연락 가능',
                badge: '긴급'
              },
              {
                title: '방과후 홈티',
                description: '아동의 사회성 발달과 맞춤형 교육을 위한 가정방문 서비스',
                icon: '📚',
                color: 'from-blue-500 to-cyan-500',
                detail: '1:1 전문가 매칭',
                badge: '교육'
              },
              {
                title: '개별/가족 상담',
                description: '우울증, 스트레스 등 정서적 어려움에 대한 전문 상담',
                icon: '💬',
                color: 'from-green-500 to-emerald-500',
                detail: '전문 상담사 배치',
                badge: '상담'
              },
              {
                title: '맞춤형 여행',
                description: '장애인 가족을 위한 특별한 여행 설계 및 동행 서비스',
                icon: '✈️',
                color: 'from-purple-500 to-pink-500',
                detail: '안전하고 즐거운 추억',
                badge: '여행'
              },
              {
                title: '전문인력 파견',
                description: '복지기관, 센터, 학교를 위한 전문 강사 및 인력 파견',
                icon: '👥',
                color: 'from-indigo-500 to-blue-500',
                detail: 'B2B 협력 서비스',
                badge: 'B2B'
              },
              {
                title: '장애인가족 이야기',
                description: '비슷한 경험을 가진 가족들의 이야기와 정보 공유',
                icon: '📖',
                color: 'from-pink-500 to-rose-500',
                detail: '커뮤니티 연결',
                badge: '소통'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity group-hover:opacity-10`} />
                <div className="relative">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="text-5xl">{service.icon}</div>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-gray-600">{service.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-blue-600" />
                    <div className="text-xs font-semibold text-blue-600">{service.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Statistics Section */}
      <section className="px-4 py-20 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              신뢰할 수 있는 실적
            </h2>
            <p className="text-xl text-gray-600">
              숫자로 보는 DFP Connect의 성장
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
              <div className="mb-2 text-4xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-700">누적 서비스 가족</div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center">
              <div className="mb-2 text-4xl font-bold text-purple-600">15+</div>
              <div className="text-sm text-gray-700">파트너 기관</div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-6 text-center">
              <div className="mb-2 text-4xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-700">만족도</div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 p-6 text-center">
              <div className="mb-2 text-4xl font-bold text-pink-600">24/7</div>
              <div className="text-sm text-gray-700">긴급돌봄 지원</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stories Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              장애인가족 이야기
            </h2>
            <p className="text-xl text-gray-600">
              함께 성장하고 희망을 나누는 우리의 이야기
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: '김민지 님',
                role: '서비스 이용자',
                story: '"긴급돌봄 덕분에 가족의 위기를 잘 넘길 수 있었어요. 전문적이고 따뜻한 돌봄에 감사합니다."',
                image: '👩‍👧‍👦'
              },
              {
                name: '이수진 님',
                role: '방과후 홈티 이용',
                story: '"우리 아이가 방과후 홈티 선생님과 함께하면서 사회성이 많이 좋아졌어요. 맞춤형 교육의 힘을 느낍니다."',
                image: '👨‍👩‍👧'
              },
              {
                name: '박지현 님',
                role: '가족 상담 이용',
                story: '"가족 상담을 통해 우리 가족이 서로를 더 이해하게 되었어요. 전문 상담사님께 감사드립니다."',
                image: '👨‍👩‍👦‍👦'
              }
            ].map((story, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="mb-4 text-6xl">{story.image}</div>
                <p className="mb-4 text-gray-700 italic leading-relaxed">
                  {story.story}
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{story.name}</div>
                  <div className="text-sm text-gray-500">{story.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 py-20 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                장애와가족플랫폼<br />사회적협동조합
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg leading-relaxed">
                  우리는 <span className="font-semibold text-blue-600">사회적 돌봄체계 구축</span>을 핵심 비전으로,
                  장애인 가족과 함께 새로운 일상을 만들어갑니다.
                </p>
                <p>
                  단순한 서비스 제공을 넘어, 장애인 가족이 지역사회에서 함께 성장하고
                  자립할 수 있도록 지원하는 <span className="font-semibold">디지털 허브</span>를 구축합니다.
                </p>
                <p>
                  긴급돌봄부터 교육, 상담, 여행까지 다양한 서비스를 통해
                  장애인 가족의 삶의 질 향상에 기여하고 있습니다.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-blue-50 p-4">
                  <div className="mb-1 text-3xl font-bold text-blue-600">10+</div>
                  <div className="text-sm text-gray-600">년간의 경험</div>
                </div>
                <div className="rounded-xl bg-purple-50 p-4">
                  <div className="mb-1 text-3xl font-bold text-purple-600">50+</div>
                  <div className="text-sm text-gray-600">전문 인력</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">우리의 가치</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                    ❤️
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">함께하는 돌봄</h4>
                    <p className="text-sm text-gray-600">가족과 지역사회가 함께하는 상호돌봄 문화 조성</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white">
                    🤝
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">전문성</h4>
                    <p className="text-sm text-gray-600">검증된 전문가를 통한 최상의 서비스 제공</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                    ✨
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">혁신</h4>
                    <p className="text-sm text-gray-600">디지털 기술을 활용한 새로운 돌봄 솔루션</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="support" className="px-4 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white shadow-2xl">
          <Heart className="mx-auto mb-6 h-16 w-16" />
          <h2 className="mb-4 text-4xl font-bold">
            함께 만드는 희망의 변화
          </h2>
          <p className="mb-8 text-xl opacity-90">
            후원과 협력으로 더 많은 가족에게 희망을 전하세요
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-full bg-white px-8 py-4 font-bold text-blue-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              후원하기
            </button>
            <button className="rounded-full border-2 border-white px-8 py-4 font-bold text-white transition-all hover:bg-white hover:text-blue-600">
              자세히 알아보기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Organization Info */}
            <div>
              <h3 className="mb-4 text-xl font-bold">DFP Connect</h3>
              <p className="mb-4 text-sm text-gray-400">
                장애와가족플랫폼 사회적협동조합
              </p>
              <p className="text-sm text-gray-400">
                사회적 돌봄체계 구축을 위한
                <br />
                디지털 허브
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 font-semibold">연락처</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📞 긴급돌봄: 1234-5678</p>
                <p>📧 이메일: contact@dfp.or.kr</p>
                <p>🏢 주소: 서울특별시</p>
                <p>⏰ 운영시간: 평일 9:00-18:00</p>
                <p className="pt-2 text-xs text-red-400">* 긴급돌봄은 24시간 가능</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 font-semibold">바로가기</h3>
              <div className="space-y-2 text-sm">
                <a href="#services" className="block text-gray-400 transition-colors hover:text-white">
                  서비스 안내
                </a>
                <a href="#about" className="block text-gray-400 transition-colors hover:text-white">
                  조직 소개
                </a>
                <a href="#support" className="block text-gray-400 transition-colors hover:text-white">
                  후원하기
                </a>
                <a href="/dashboard" className="block text-gray-400 transition-colors hover:text-white">
                  마이페이지
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 DFP Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
