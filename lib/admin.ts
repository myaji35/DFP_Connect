import { currentUser } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export async function isAdmin(): Promise<boolean> {
  const user = await currentUser()

  if (!user) {
    return false
  }

  const userProfile = await prisma.userProfile.findUnique({
    where: { clerkId: user.id }
  })

  return userProfile?.userType === 'ADMIN'
}

export async function requireAdmin() {
  const admin = await isAdmin()

  if (!admin) {
    throw new Error('관리자 권한이 필요합니다')
  }

  return true
}
