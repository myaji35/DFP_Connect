'use client'

import { useState, useEffect } from 'react'
import { Loading } from '@/components/ui/loading'
import { Calendar, Eye, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  const [story, setStory] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStory()
  }, [])

  const fetchStory = async () => {
    try {
      const response = await fetch(`/api/stories/${params.id}`)
      const data = await response.json()

      if (data.success) {
        setStory(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch story:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="스토리를 불러오는 중..." />
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-gray-500 text-lg mb-6">스토리를 찾을 수 없습니다</p>
          <Link
            href="/stories"
            className="text-purple-600 font-semibold hover:underline"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Back Button */}
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Link>

        {/* Featured Image */}
        {story.featuredImage && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img
              src={story.featuredImage}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{story.title}</h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{story.authorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(story.publishedAt || story.createdAt).toLocaleDateString(
                'ko-KR'
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>조회 {story.viewCount}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <ReactMarkdown>{story.content}</ReactMarkdown>
        </div>

        {/* Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {story.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 pt-8 border-t">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              당신의 이야기도 들려주세요
            </h3>
            <p className="text-gray-600 mb-6">
              여러분의 경험이 다른 가족에게 큰 힘이 됩니다
            </p>
            <Link
              href="/stories/submit"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              내 이야기 공유하기
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
