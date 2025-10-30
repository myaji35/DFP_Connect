import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { koKR } from '@clerk/localizations'
import './globals.css'

export const metadata: Metadata = {
  title: 'DFP Connect - 장애와가족플랫폼',
  description: '장애인 가족과 함께하는 희망의 디지털 허브',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={koKR}>
      <html lang="ko">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
