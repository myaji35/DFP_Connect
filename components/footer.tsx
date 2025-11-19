import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: {
      title: '서비스',
      links: [
        { href: '/services/emergency-care', label: '긴급돌봄' },
        { href: '/services/after-school', label: '방과후 홈티' },
        { href: '/services/counseling', label: '개별/가족 상담' },
        { href: '/services/travel', label: '맞춤형 여행' },
      ],
    },
    company: {
      title: '소개',
      links: [
        { href: '/about', label: '조직 소개' },
        { href: '/stories', label: '가족 이야기' },
        { href: '/b2b', label: '기업/기관 협력' },
        { href: '/support', label: '후원하기' },
      ],
    },
    legal: {
      title: '정책',
      links: [
        { href: '/privacy', label: '개인정보처리방침' },
        { href: '/terms', label: '이용약관' },
      ],
    },
  }

  const contactInfo = [
    { icon: Phone, text: '02-XXXX-XXXX', href: 'tel:02-XXXX-XXXX' },
    { icon: Mail, text: 'info@dfp.or.kr', href: 'mailto:info@dfp.or.kr' },
    { icon: MapPin, text: '서울특별시 강남구 테헤란로 XXX' },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Organization Info */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">
              장애와가족플랫폼
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              장애인 가족의 삶의 질 향상과 사회 통합을 위해 함께합니다.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase mb-4">
              {footerLinks.services.title}
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase mb-4">
              {footerLinks.company.title}
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase mb-4">
              연락처
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <li key={index} className="flex items-start gap-2">
                    <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-sm">{info.text}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {currentYear} 장애와가족플랫폼 사회적협동조합. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex gap-4">
            {footerLinks.legal.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
