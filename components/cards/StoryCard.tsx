import Link from 'next/link'
import { Calendar, User, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface StoryCardProps {
  id: string
  title: string
  excerpt: string
  author?: string
  date: string
  category?: string
  viewCount?: number
  thumbnail?: string
}

export function StoryCard({
  id,
  title,
  excerpt,
  author,
  date,
  category,
  viewCount,
  thumbnail,
}: StoryCardProps) {
  const categoryLabels: Record<string, string> = {
    PARENTING: '육아',
    DAILY_LIFE: '일상',
    ADVOCACY: '권익옹호',
    SUCCESS: '성공사례',
  }

  const categoryColors: Record<string, 'default' | 'success' | 'warning' | 'secondary'> = {
    PARENTING: 'default',
    DAILY_LIFE: 'secondary',
    ADVOCACY: 'warning',
    SUCCESS: 'success',
  }

  return (
    <Link href={`/stories/${id}`} className="group block h-full">
      <article className="h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-700">
        {/* Thumbnail */}
        {thumbnail && (
          <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {category && (
              <div className="absolute top-3 left-3">
                <Badge variant={categoryColors[category] || 'default'} size="sm">
                  {categoryLabels[category] || category}
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Category Badge (no thumbnail) */}
          {!thumbnail && category && (
            <Badge variant={categoryColors[category] || 'default'} size="sm" className="mb-3">
              {categoryLabels[category] || category}
            </Badge>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {author && (
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>{author}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(date).toLocaleDateString('ko-KR')}</span>
            </div>
            {viewCount !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{viewCount.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
