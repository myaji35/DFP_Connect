import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { koKR } from '@clerk/localizations'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ToastProvider } from '@/components/ui/toast'
import { EmergencyFAB } from '@/components/emergency-fab'
import './globals.css'

export const metadata: Metadata = {
  title: 'DFP Connect - 장애와가족플랫폼',
  description: '장애인 가족과 함께하는 희망의 디지털 허브',
  keywords: '장애인가족, 긴급돌봄, 방과후, 가족상담, 맞춤형여행, 장애인지원',
  authors: [{ name: '장애와가족플랫폼 사회적협동조합' }],
  openGraph: {
    title: 'DFP Connect - 장애와가족플랫폼',
    description: '장애인 가족과 함께하는 희망의 디지털 허브',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={koKR}>
      <html lang="ko">
        <body className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <EmergencyFAB />
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  )
}
