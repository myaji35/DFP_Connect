"use client"

import { Phone, MessageCircle } from 'lucide-react'

export function EmergencyCareButton() {
  return (
    <div className="fixed top-20 right-4 z-30 flex flex-col gap-2 md:top-24">
      {/* 긴급돌봄 전화 버튼 */}
      <button
        className="group flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 text-white shadow-2xl transition-all hover:bg-red-600 hover:shadow-red-500/50 hover:scale-105"
        onClick={() => window.location.href = 'tel:1234567890'}
      >
        <Phone className="h-5 w-5 animate-pulse" />
        <span className="font-bold">긴급돌봄</span>
      </button>

      {/* 카카오톡 상담 버튼 */}
      <button
        className="group flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-gray-900 shadow-2xl transition-all hover:bg-yellow-500 hover:shadow-yellow-400/50 hover:scale-105"
        onClick={() => {
          // 카카오톡 채널 채팅 연결
          window.open('https://pf.kakao.com/_457130/chat', '_blank', 'width=400,height=600')
        }}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="font-bold">카톡 상담</span>
      </button>
    </div>
  )
}
