'use client'

import Link from 'next/link'
import { Phone } from 'lucide-react'

/**
 * 긴급돌봄 Floating Action Button
 *
 * 화면 오른쪽 하단에 고정되어 어느 페이지에서든 긴급돌봄 요청 가능
 */
export function EmergencyFAB() {
  return (
    <Link
      href="/services"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-red-700 hover:scale-110 transition-all duration-300 group animate-pulse hover:animate-none"
      aria-label="긴급돌봄 요청"
    >
      <Phone className="w-6 h-6" />
      <span className="font-bold text-lg hidden sm:inline">긴급돌봄</span>

      {/* Pulse Ring */}
      <span className="absolute inset-0 rounded-full bg-red-600 opacity-75 animate-ping" />
    </Link>
  )
}
