import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { FamilyForm } from '@/components/family-form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function NewFamilyPage() {
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
          <h1 className="mb-2 text-3xl font-bold text-gray-900">가족 정보 등록</h1>
          <p className="text-gray-600">
            서비스 제공을 위해 가족 정보를 등록해주세요
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <FamilyForm />
        </div>
      </main>
    </div>
  )
}
