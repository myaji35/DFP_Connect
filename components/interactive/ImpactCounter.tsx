'use client'

import { useEffect, useRef, useState } from 'react'
import { LucideIcon } from 'lucide-react'

interface ImpactCounterProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  duration?: number
  icon?: LucideIcon
  className?: string
}

/**
 * 애니메이션 카운터 컴포넌트
 *
 * Intersection Observer로 뷰포트 진입 시 카운터 애니메이션 실행
 */
export function ImpactCounter({
  value,
  label,
  suffix = '',
  prefix = '',
  duration = 2000,
  icon: Icon,
  className = '',
}: ImpactCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const startValue = 0
    const endValue = value

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOut)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value, duration])

  return (
    <div
      ref={counterRef}
      className={`text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'} ${className}`}
    >
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary-500" />
          </div>
        </div>
      )}

      <div className="mb-2">
        <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </span>
      </div>

      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">
        {label}
      </p>
    </div>
  )
}
