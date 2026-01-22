'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  { label: '홈', href: '/' },
  { label: '조직 소개', href: '/about' },
  {
    label: '서비스',
    href: '/services',
    children: [
      { label: '긴급돌봄', href: '/services#emergency' },
      { label: '방과후 홈티', href: '/services#tutoring' },
      { label: '상담', href: '/services#counseling' },
      { label: '맞춤형 여행', href: '/services#travel' },
    ],
  },
  { label: '가족 이야기', href: '/stories' },
  { label: '협력 파트너', href: '/partners' },
  { label: '후원하기', href: '/support' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/80">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-white font-bold text-xl">
            DFP
          </div>
          <span className="hidden sm:block font-bold text-lg text-gray-900 dark:text-white">
            장애와가족플랫폼
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors dark:text-gray-300 dark:hover:text-primary-400"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="absolute left-0 top-full mt-2 hidden w-48 rounded-lg bg-white shadow-lg ring-1 ring-black/5 group-hover:block dark:bg-gray-800 dark:ring-white/10">
                  <div className="py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-primary-400"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/services"
            className="inline-flex items-center justify-center h-10 px-5 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg"
          >
            서비스 신청
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-primary-500 font-medium dark:text-gray-300 dark:hover:text-primary-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-1 text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/services"
              className="block mt-4 py-3 px-5 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              서비스 신청
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
