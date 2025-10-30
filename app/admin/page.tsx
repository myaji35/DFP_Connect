import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Calendar
} from 'lucide-react'

export default async function AdminDashboard() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // 관리자 권한 확인
  const userProfile = await prisma.userProfile.findUnique({
    where: { clerkId: user.id }
  })

  if (!userProfile || userProfile.userType !== 'ADMIN') {
    redirect('/dashboard')
  }

  // 통계 데이터 가져오기
  const [
    totalUsers,
    totalFamilies,
    totalApplications,
    pendingApplications,
    approvedApplications,
    totalReservations,
    pendingReservations,
    recentApplications
  ] = await Promise.all([
    prisma.userProfile.count(),
    prisma.family.count(),
    prisma.serviceApplication.count(),
    prisma.serviceApplication.count({ where: { status: 'PENDING' } }),
    prisma.serviceApplication.count({ where: { status: 'APPROVED' } }),
    prisma.serviceReservation.count(),
    prisma.serviceReservation.count({ where: { status: 'PENDING' } }),
    prisma.serviceApplication.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        service: true,
        user: true,
        family: true
      }
    })
  ])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
            <p className="text-sm text-gray-600">DFP Connect 관리 시스템</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
            >
              일반 대시보드
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Quick Links */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link href="/admin/applications" className="group">
            <div className="rounded-xl bg-white p-6 shadow transition-all hover:shadow-lg">
              <FileText className="mb-3 h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-gray-900">서비스 신청 관리</h3>
              <p className="mt-1 text-sm text-gray-600">신청 목록 및 승인/거절</p>
            </div>
          </Link>

          <Link href="/admin/reservations" className="group">
            <div className="rounded-xl bg-white p-6 shadow transition-all hover:shadow-lg">
              <Calendar className="mb-3 h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-gray-900">예약 관리</h3>
              <p className="mt-1 text-sm text-gray-600">서비스 예약 확인 및 관리</p>
            </div>
          </Link>

          <Link href="/dashboard" className="group">
            <div className="rounded-xl bg-white p-6 shadow transition-all hover:shadow-lg">
              <Users className="mb-3 h-8 w-8 text-purple-600" />
              <h3 className="font-semibold text-gray-900">일반 대시보드</h3>
              <p className="mt-1 text-sm text-gray-600">서비스 이용자 화면</p>
            </div>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 사용자</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{totalUsers}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">등록 가족</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{totalFamilies}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">대기 중 신청</p>
                <p className="mt-2 text-3xl font-bold text-orange-600">{pendingApplications}</p>
              </div>
              <div className="rounded-full bg-orange-100 p-3">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">승인된 신청</p>
                <p className="mt-2 text-3xl font-bold text-green-600">{approvedApplications}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 예약</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{totalReservations}</p>
                {pendingReservations > 0 && (
                  <p className="mt-1 text-xs text-orange-600">대기 {pendingReservations}건</p>
                )}
              </div>
              <div className="rounded-full bg-indigo-100 p-3">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">최근 신청 목록</h2>
            <Link
              href="/admin/applications"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              전체 보기 →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-600">
                  <th className="pb-3">신청일</th>
                  <th className="pb-3">서비스</th>
                  <th className="pb-3">신청자</th>
                  <th className="pb-3">상태</th>
                  <th className="pb-3">작업</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id} className="border-b last:border-0">
                    <td className="py-4 text-sm text-gray-600">
                      {new Date(app.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="py-4">
                      <div className="font-medium text-gray-900">{app.service.name}</div>
                      {app.family && (
                        <div className="text-xs text-gray-500">{app.family.familyName}</div>
                      )}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {app.user.firstName || app.user.email}
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        app.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status === 'PENDING' ? '대기중' :
                         app.status === 'APPROVED' ? '승인됨' :
                         app.status === 'REJECTED' ? '거절됨' :
                         app.status === 'COMPLETED' ? '완료' : '취소됨'}
                      </span>
                    </td>
                    <td className="py-4">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        상세보기
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {recentApplications.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              아직 신청이 없습니다
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
