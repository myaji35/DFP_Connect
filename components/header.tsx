'use client'

import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: '홈' },
    { href: '/services', label: '서비스' },
    { href: '/stories', label: '가족 이야기' },
    { href: '/b2b', label: '기업/기관' },
    { href: '/support', label: '후원하기' },
    { href: '/about', label: '소개' },
  ]

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <div className="text-xl font-bold text-gray-900 md:text-2xl">
            장애와가족플랫폼
          </div>
          <div className="text-[10px] text-gray-500 md:text-xs">
            Disability and Family Platform
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg">
                로그인
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="rounded-full border-2 border-blue-600 px-6 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-50"
            >
              대시보드
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="메뉴"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <nav className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 border-b"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 py-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                    로그인
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full border-2 border-blue-600 px-6 py-2 text-sm font-semibold text-blue-600 text-center transition-all hover:bg-blue-50"
                >
                  대시보드
                </Link>
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
