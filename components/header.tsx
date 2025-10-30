import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex flex-col">
          <div className="text-xl font-bold text-gray-900 md:text-2xl">
            장애와가족플랫폼
          </div>
          <div className="text-[10px] text-gray-500 md:text-xs">
            Disability and Family Platform
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/#services" className="text-gray-600 transition-colors hover:text-blue-600">
            서비스
          </Link>
          <Link href="/#about" className="text-gray-600 transition-colors hover:text-blue-600">
            소개
          </Link>
          <Link href="/#support" className="text-gray-600 transition-colors hover:text-blue-600">
            후원
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg">
                로그인
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="rounded-full border-2 border-blue-600 px-6 py-2 font-semibold text-blue-600 transition-all hover:bg-blue-50"
            >
              대시보드
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
