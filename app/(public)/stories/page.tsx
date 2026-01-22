'use client'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { StoryCard } from '@/components/public/story-card'
import { Loading } from '@/components/ui/loading'
import { SearchBar } from '@/components/interactive/SearchBar'
import { CategoryFilter } from '@/components/interactive/CategoryFilter'
import { BookOpen, PenSquare } from 'lucide-react'
import Link from 'next/link'

export default function StoriesPage() {
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = [
    { id: 'PARENTING', label: '육아' },
    { id: 'DAILY_LIFE', label: '일상' },
    { id: 'ADVOCACY', label: '권익옹호' },
    { id: 'SUCCESS', label: '성공사례' },
  ]

  useEffect(() => {
    fetchStories()
  }, [selectedCategory, searchQuery])

  const fetchStories = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory) {
        params.append('category', selectedCategory)
      }
      if (searchQuery) {
        params.append('search', searchQuery)
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

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
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

      {/* Search & Filters */}
      <section className="py-8 px-4 bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-20 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* 검색바 */}
          <SearchBar
            placeholder="제목, 내용으로 검색..."
            onSearch={handleSearch}
            defaultValue={searchQuery}
          />

          {/* 카테고리 필터 */}
          <CategoryFilter
            categories={categories}
            activeCategory={selectedCategory}
            onChange={handleCategoryChange}
            className="justify-center"
          />

          {/* 활성 필터 표시 */}
          {(searchQuery || selectedCategory) && (
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span>활성 필터:</span>
              {searchQuery && (
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
                  검색: "{searchQuery}"
                </span>
              )}
              {selectedCategory && (
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
                  {categories.find((c) => c.id === selectedCategory)?.label}
                </span>
              )}
            </div>
          )}
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
