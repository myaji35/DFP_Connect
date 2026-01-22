import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-white font-bold text-xl">
                DFP
              </div>
              <span className="font-bold text-white">
                장애와가족플랫폼
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              장애인 가족의 일상을 함께 지원하는 사회적협동조합입니다.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-primary-400 transition-colors">
                  조직 소개
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-primary-400 transition-colors">
                  서비스 안내
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-sm hover:text-primary-400 transition-colors">
                  가족 이야기
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm hover:text-primary-400 transition-colors">
                  협력 파트너
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm hover:text-primary-400 transition-colors">
                  후원하기
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">주요 서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#emergency" className="text-sm hover:text-primary-400 transition-colors">
                  긴급돌봄
                </Link>
              </li>
              <li>
                <Link href="/services#tutoring" className="text-sm hover:text-primary-400 transition-colors">
                  방과후 홈티
                </Link>
              </li>
              <li>
                <Link href="/services#counseling" className="text-sm hover:text-primary-400 transition-colors">
                  개별/가족 상담
                </Link>
              </li>
              <li>
                <Link href="/services#travel" className="text-sm hover:text-primary-400 transition-colors">
                  맞춤형 여행
                </Link>
              </li>
              <li>
                <Link href="/services#staffing" className="text-sm hover:text-primary-400 transition-colors">
                  전문인력 파견
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">연락처</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary-400" />
                <div>
                  <p className="text-sm">대표번호</p>
                  <a href="tel:02-1234-5678" className="text-sm font-medium text-white hover:text-primary-400 transition-colors">
                    02-1234-5678
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary-400" />
                <div>
                  <p className="text-sm">이메일</p>
                  <a href="mailto:info@dfp.or.kr" className="text-sm font-medium text-white hover:text-primary-400 transition-colors">
                    info@dfp.or.kr
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary-400" />
                <div>
                  <p className="text-sm">주소</p>
                  <p className="text-sm text-white">
                    서울특별시 강남구<br />테헤란로 123
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} 장애와가족플랫폼 사회적협동조합. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
