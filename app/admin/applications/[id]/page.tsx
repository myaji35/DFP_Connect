import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, User, Calendar, FileText, Users } from 'lucide-react'
import { ApplicationActions } from '@/components/application-actions'

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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

  // 신청 정보 조회
  const application = await prisma.serviceApplication.findUnique({
    where: { id: id },
    include: {
      service: true,
      user: true,
      family: true
    }
  })

  if (!application) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4">
          <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">신청 상세</h1>
            <p className="text-sm text-gray-600">신청 ID: {application.id.substring(0, 8)}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 메인 정보 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 서비스 정보 */}
            <div className="rounded-xl bg-white p-6 shadow">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-bold text-gray-900">서비스 정보</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">서비스명</label>
                  <p className="font-semibold text-gray-900">{application.service.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">카테고리</label>
                  <p className="text-gray-900">{application.service.category}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">서비스 설명</label>
                  <p className="text-sm text-gray-700">{application.service.description}</p>
                </div>
              </div>
            </div>

            {/* 신청 내용 */}
            <div className="rounded-xl bg-white p-6 shadow">
              <h2 className="mb-4 text-lg font-bold text-gray-900">신청 내용</h2>
              <div className="space-y-4">
                {application.preferredDate && (
                  <div>
                    <label className="text-sm text-gray-600">희망 날짜</label>
                    <p className="text-gray-900">
                      {new Date(application.preferredDate).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-600">상세 내용</label>
                  <p className="mt-2 whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm text-gray-800">
                    {application.content}
                  </p>
                </div>
              </div>
            </div>

            {/* 가족 정보 */}
            {application.family && (
              <div className="rounded-xl bg-white p-6 shadow">
                <div className="mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  <h2 className="text-lg font-bold text-gray-900">가족 정보</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">가족명</label>
                    <p className="font-semibold text-gray-900">{application.family.familyName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">구성원 수</label>
                    <p className="text-gray-900">{application.family.familyMemberCount}명</p>
                  </div>
                  {application.family.disabilityType && (
                    <div>
                      <label className="text-sm text-gray-600">장애 유형</label>
                      <p className="text-gray-900">{application.family.disabilityType}</p>
                    </div>
                  )}
                  {application.family.disabilityLevel && (
                    <div>
                      <label className="text-sm text-gray-600">장애 등급</label>
                      <p className="text-gray-900">{application.family.disabilityLevel}</p>
                    </div>
                  )}
                  {application.family.specialNotes && (
                    <div>
                      <label className="text-sm text-gray-600">특이사항</label>
                      <p className="text-sm text-gray-700">{application.family.specialNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 관리자 노트 */}
            {application.adminNotes && (
              <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-6">
                <h3 className="mb-2 font-semibold text-yellow-900">관리자 노트</h3>
                <p className="text-sm text-yellow-800">{application.adminNotes}</p>
              </div>
            )}
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 상태 및 작업 */}
            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="mb-4 font-semibold text-gray-900">신청 상태</h3>
              <div className="mb-6">
                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                  application.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  application.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                  application.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                  application.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {application.status === 'PENDING' ? '대기중' :
                   application.status === 'APPROVED' ? '승인됨' :
                   application.status === 'REJECTED' ? '거절됨' :
                   application.status === 'COMPLETED' ? '완료' : '취소됨'}
                </span>
              </div>

              {application.status === 'PENDING' && (
                <ApplicationActions applicationId={application.id} />
              )}
            </div>

            {/* 신청자 정보 */}
            <div className="rounded-xl bg-white p-6 shadow">
              <div className="mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">신청자 정보</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">이름</label>
                  <p className="text-gray-900">
                    {application.user.firstName || application.user.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">이메일</label>
                  <p className="text-sm text-gray-900">{application.user.email}</p>
                </div>
                {application.user.phoneNumber && (
                  <div>
                    <label className="text-sm text-gray-600">연락처</label>
                    <p className="text-gray-900">{application.user.phoneNumber}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 일정 정보 */}
            <div className="rounded-xl bg-white p-6 shadow">
              <div className="mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">일정 정보</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="text-gray-600">신청일</label>
                  <p className="text-gray-900">
                    {new Date(application.requestDate).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                {application.processedAt && (
                  <div>
                    <label className="text-gray-600">처리일</label>
                    <p className="text-gray-900">
                      {new Date(application.processedAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
