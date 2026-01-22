'use client'

import { useEffect, useRef, useState } from 'react'
import { LucideIcon } from 'lucide-react'

interface StatItem {
  value: number
  label: string
  suffix?: string
  icon?: LucideIcon
}

interface ImpactStatsProps {
  stats: StatItem[]
  animate?: boolean
  duration?: number
}

function StatCard({ value, label, suffix = '', icon: Icon, animate, duration }: StatItem & { animate?: boolean; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate) {
      setCount(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [animate, value])

  useEffect(() => {
    if (!isVisible || !animate) return

    const animationDuration = duration || 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = animationDuration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setCount(Math.min(Math.round(increment * currentStep), value))
      } else {
        clearInterval(timer)
        setCount(value)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, value, animate, duration])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
    >
      {Icon && (
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-4">
          <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
      )}
      <div className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
        {label}
      </div>
    </div>
  )
}

export function ImpactStats({ stats, animate = true, duration = 2000 }: ImpactStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          {...stat}
          animate={animate}
          duration={duration}
        />
      ))}
    </div>
  )
}
