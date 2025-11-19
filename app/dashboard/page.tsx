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
  Building2,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { NotificationBell } from '@/components/notification-bell'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // 사용자 프로필 및 가족 정보 조회
  let userProfile = await prisma.userProfile.findUnique({
    where: { clerkId: user.id },
    include: {
      families: {
        orderBy: { createdAt: 'desc' }
      },
      applications: {
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          service: true
        }
      },
      reservations: {
        orderBy: { startTime: 'desc' },
        take: 5,
        include: {
          service: true
        }
      }
    } as any // TODO: Fix relation in Phase 8 - UserProfile doesn't have direct reservations relation
  })

  // 첫 로그인 시 프로필 자동 생성
  if (!userProfile) {
    userProfile = await prisma.userProfile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName || null,
        lastName: user.lastName || null,
      },
      include: {
        families: true,
        applications: {
          include: {
            service: true
          }
        },
        reservations: {
          include: {
            service: true
          }
        }
      } as any // TODO: Fix relation in Phase 8
    }) as any
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
            <NotificationBell />
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

            <Link href="/dashboard/reservations">
              <button className="group flex items-center gap-4 rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl w-full">
                <div className="rounded-full bg-blue-100 p-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">서비스 예약</div>
                  <div className="text-sm text-gray-500">일정 확인</div>
                </div>
              </button>
            </Link>

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
          {/* My Families & Services */}
          <div className="lg:col-span-2 space-y-8">
            {/* 가족 정보 */}
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <Users className="h-5 w-5" />
                가족 정보
              </h3>
              <div className="space-y-4">
                {userProfile.families.length > 0 ? (
                  <>
                    {userProfile.families.map((family) => (
                      <div key={family.id} className="rounded-lg border border-gray-200 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{family.familyName}</div>
                            <div className="mt-1 text-sm text-gray-500">
                              구성원 {family.familyMemberCount}명
                              {family.disabilityType && ` · ${family.disabilityType}`}
                              {family.disabilityLevel && ` · ${family.disabilityLevel}`}
                            </div>
                            {family.specialNotes && (
                              <div className="mt-2 text-sm text-gray-600">{family.specialNotes}</div>
                            )}
                          </div>
                          <Link
                            href={`/dashboard/family/${family.id}`}
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            수정
                          </Link>
                        </div>
                      </div>
                    ))}
                    <Link href="/dashboard/family/new">
                      <button className="w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-blue-500 hover:text-blue-500">
                        <Plus className="mx-auto h-5 w-5 mb-1" />
                        가족 정보 추가하기
                      </button>
                    </Link>
                  </>
                ) : (
                  <Link href="/dashboard/family/new">
                    <button className="w-full rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-6 text-blue-600 transition-colors hover:border-blue-500 hover:bg-blue-100">
                      <Plus className="mx-auto h-8 w-8 mb-2" />
                      <div className="font-semibold">첫 가족 정보 등록하기</div>
                      <div className="mt-1 text-sm">서비스 이용을 위해 가족 정보를 등록해주세요</div>
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* 나의 서비스 */}
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <FileText className="h-5 w-5" />
                나의 서비스 신청
              </h3>
              <div className="space-y-4">
                {userProfile.applications.length > 0 ? (
                  <>
                    {userProfile.applications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{app.service.name}</div>
                          <div className="text-sm text-gray-500">
                            신청일: {new Date(app.requestDate).toLocaleDateString('ko-KR')}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                            app.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                            app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                            app.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {app.status === 'APPROVED' ? '승인됨' :
                             app.status === 'PENDING' ? '대기중' :
                             app.status === 'REJECTED' ? '거절됨' :
                             app.status === 'COMPLETED' ? '완료' : '취소됨'}
                          </span>
                          {app.status === 'APPROVED' && (
                            <Link href={`/dashboard/applications/${app.id}/reserve`}>
                              <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded">
                                예약하기
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    아직 신청한 서비스가 없습니다
                  </div>
                )}
                <Link href="/dashboard/apply">
                  <button className="w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-blue-500 hover:text-blue-500">
                    + 새 서비스 신청하기
                  </button>
                </Link>
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
