'use client'

import { useState, useEffect } from 'react'
import { StoryCard } from '@/components/public/story-card'
import { Loading } from '@/components/ui/loading'
import { BookOpen, PenSquare } from 'lucide-react'
import Link from 'next/link'

export default function StoriesPage() {
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  const categories = [
    { value: 'ALL', label: '전체' },
    { value: 'PARENTING', label: '육아' },
    { value: 'DAILY_LIFE', label: '일상' },
    { value: 'ADVOCACY', label: '권익옹호' },
    { value: 'SUCCESS', label: '성공사례' },
  ]

  useEffect(() => {
    fetchStories()
  }, [selectedCategory])

  const fetchStories = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== 'ALL') {
        params.append('category', selectedCategory)
      }

      const response = await fetch(`/api/stories?${params}`)
      const data = await response.json()

      if (data.success) {
        setStories(data.data.stories)
      }
    } catch (error) {
      console.error('Failed to fetch stories:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-gray-50">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            장애인가족 이야기
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            비슷한 경험을 가진 가족들의 이야기를 나누고
            <br className="hidden md:block" />
            서로에게 희망과 용기를 전합니다
          </p>
          <Link
            href="/stories/submit"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-purple-50 transition-colors shadow-xl"
          >
            <PenSquare className="w-5 h-5" />
            내 이야기 공유하기
          </Link>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b sticky top-20 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <Loading text="스토리를 불러오는 중..." />
          ) : stories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📖</div>
              <p className="text-gray-500 text-lg">아직 게시된 스토리가 없습니다</p>
              <Link
                href="/stories/submit"
                className="inline-block mt-6 text-purple-600 font-semibold hover:underline"
              >
                첫 번째 스토리를 공유해보세요 →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
