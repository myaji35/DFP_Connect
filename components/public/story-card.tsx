import Link from 'next/link'
import { Calendar, Eye, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StoryCardProps {
  story: {
    id: string
    title: string
    summary?: string
    category: string
    authorName: string
    isAnonymous: boolean
    featuredImage?: string | null
    tags: string[]
    viewCount: number
    publishedAt: Date | null
    createdAt: Date
  }
}

const categoryColors = {
  PARENTING: 'bg-blue-100 text-blue-600',
  DAILY_LIFE: 'bg-green-100 text-green-600',
  ADVOCACY: 'bg-purple-100 text-purple-600',
  SUCCESS: 'bg-yellow-100 text-yellow-600',
}

const categoryLabels = {
  PARENTING: '육아',
  DAILY_LIFE: '일상',
  ADVOCACY: '권익옹호',
  SUCCESS: '성공사례',
}

/**
 * 스토리 카드 컴포넌트
 */
export function StoryCard({ story }: StoryCardProps) {
  const category = story.category as keyof typeof categoryColors

  return (
    <Link
      href={`/stories/${story.id}`}
      className="block bg-white rounded-xl border-2 border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all group"
    >
      {/* Featured Image */}
      {story.featuredImage ? (
        <div className="aspect-video bg-gray-200 overflow-hidden">
          <img
            src={story.featuredImage}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <div className="text-6xl">📖</div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <span
          className={cn(
            'inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3',
            categoryColors[category] || 'bg-gray-100 text-gray-600'
          )}
        >
          {categoryLabels[category] || story.category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {story.title}
        </h3>

        {/* Summary */}
        {story.summary && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {story.summary}
          </p>
        )}

        {/* Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {story.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{story.authorName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{story.viewCount}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(story.publishedAt || story.createdAt).toLocaleDateString(
                'ko-KR'
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
