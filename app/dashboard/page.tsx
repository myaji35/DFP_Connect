import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import {
  Calendar,
  Heart,
  MessageSquare,
  Phone,
  Settings,
  FileText,
  Users,
  Building2
} from 'lucide-react'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-blue-600">DFP Connect</h1>
          </div>
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <h2 className="mb-2 text-3xl font-bold">
            환영합니다, {user.firstName || user.emailAddresses[0].emailAddress}님! 👋
          </h2>
          <p className="text-blue-100">
            DFP Connect와 함께하는 여정에 감사드립니다
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-bold text-gray-900">빠른 실행</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <button className="group flex items-center gap-4 rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div className="rounded-full bg-red-100 p-3">
                <Phone className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">긴급돌봄</div>
                <div className="text-sm text-gray-500">즉시 신청</div>
              </div>
            </button>

            <button className="group flex items-center gap-4 rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div className="rounded-full bg-blue-100 p-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">서비스 예약</div>
                <div className="text-sm text-gray-500">일정 확인</div>
              </div>
            </button>

            <button className="group flex items-center gap-4 rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div className="rounded-full bg-green-100 p-3">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">상담 문의</div>
                <div className="text-sm text-gray-500">전문가 상담</div>
              </div>
            </button>

            <button className="group flex items-center gap-4 rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div className="rounded-full bg-purple-100 p-3">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">후원하기</div>
                <div className="text-sm text-gray-500">함께 만드는 희망</div>
              </div>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* My Services */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <FileText className="h-5 w-5" />
                나의 서비스
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <div className="font-semibold text-gray-900">방과후 홈티</div>
                    <div className="text-sm text-gray-500">매주 월, 수, 금 14:00-16:00</div>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    진행중
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <div className="font-semibold text-gray-900">가족 상담</div>
                    <div className="text-sm text-gray-500">다음 예약: 2025년 11월 5일</div>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    예약됨
                  </span>
                </div>

                <button className="w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-blue-500 hover:text-blue-500">
                  + 새 서비스 신청하기
                </button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <Calendar className="h-5 w-5" />
                최근 활동
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-600"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      긴급돌봄 서비스 완료
                    </div>
                    <div className="text-xs text-gray-500">2025년 10월 28일</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-600"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      가족 상담 예약 확정
                    </div>
                    <div className="text-xs text-gray-500">2025년 10월 25일</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-purple-600"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      방과후 홈티 서비스 시작
                    </div>
                    <div className="text-xs text-gray-500">2025년 10월 20일</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <Users className="h-5 w-5" />
                내 정보
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">이메일</div>
                  <div className="font-medium text-gray-900">
                    {user.emailAddresses[0].emailAddress}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">회원 유형</div>
                  <div className="font-medium text-gray-900">서비스 이용자</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">가입일</div>
                  <div className="font-medium text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                  </div>
                </div>
                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200">
                  <Settings className="h-4 w-4" />
                  설정
                </button>
              </div>
            </div>

            {/* Support Card */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white shadow-lg">
              <h3 className="mb-2 text-lg font-bold">도움이 필요하신가요?</h3>
              <p className="mb-4 text-sm text-blue-100">
                24/7 고객 지원팀이 도와드립니다
              </p>
              <button className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition-all hover:shadow-lg">
                고객센터 문의하기
              </button>
            </div>

            {/* Partnership CTA */}
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <Building2 className="mb-3 h-8 w-8 text-blue-600" />
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                협력 기관이신가요?
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                B2B 파트너십 프로그램에 대해 알아보세요
              </p>
              <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                파트너십 신청하기
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
