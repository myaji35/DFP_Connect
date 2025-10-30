import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { FamilyForm } from '@/components/family-form'

export default async function EditFamilyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // 사용자 프로필 조회
  const userProfile = await prisma.userProfile.findUnique({
    where: { clerkId: user.id }
  })

  if (!userProfile) {
    redirect('/dashboard')
  }

  // 가족 정보 조회 (본인의 가족 정보만)
  const family = await prisma.family.findFirst({
    where: {
      id: id,
      userId: userProfile.id
    }
  })

  if (!family) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">가족 정보 수정</h1>
            <p className="text-sm text-gray-600">등록된 가족 정보를 수정할 수 있습니다</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-xl bg-white p-8 shadow">
          <FamilyForm
            initialData={{
              id: family.id,
              familyName: family.familyName,
              familyMemberCount: family.familyMemberCount,
              disabilityType: family.disabilityType || undefined,
              disabilityLevel: family.disabilityLevel || undefined,
              specialNotes: family.specialNotes || undefined,
              address: family.address || undefined,
              emergencyContact: family.emergencyContact || undefined,
            }}
          />
        </div>
      </main>
    </div>
  )
}
