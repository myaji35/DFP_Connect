import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ServiceApplicationForm } from '@/components/service-application-form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function ApplyPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>대시보드로 돌아가기</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">서비스 신청</h1>
          <p className="text-gray-600">
            필요하신 서비스를 선택하고 상세한 내용을 작성해주세요
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <ServiceApplicationForm />
        </div>

        {/* Info Box */}
        <div className="mt-8 rounded-xl bg-blue-50 border border-blue-200 p-6">
          <h3 className="mb-2 font-semibold text-blue-900">신청 안내</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex gap-2">
              <span>•</span>
              <span>신청하신 서비스는 담당자 검토 후 승인됩니다</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>긴급돌봄의 경우 24시간 내 연락드립니다</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>신청 상태는 대시보드에서 확인하실 수 있습니다</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>문의사항은 카톡 상담을 이용해주세요</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
