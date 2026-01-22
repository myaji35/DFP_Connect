'use client'

import { Badge } from '@/components/ui/badge'

interface Category {
  id: string
  label: string
  count?: number
}

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string | null
  onChange: (categoryId: string | null) => void
  className?: string
}

/**
 * 카테고리 필터 컴포넌트
 *
 * 카테고리별 필터링 기능 제공
 */
export function CategoryFilter({
  categories,
  activeCategory,
  onChange,
  className = '',
}: CategoryFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* 전체 버튼 */}
      <button
        onClick={() => onChange(null)}
        className={`
          px-4 py-2 rounded-lg font-medium text-sm
          transition-all duration-200
          ${
            activeCategory === null
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }
        `}
      >
        전체
      </button>

      {/* 카테고리 버튼들 */}
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm
            transition-all duration-200
            flex items-center gap-2
            ${
              activeCategory === category.id
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          <span>{category.label}</span>
          {category.count !== undefined && (
            <Badge
              variant={activeCategory === category.id ? 'secondary' : 'default'}
              className={`
                ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }
              `}
            >
              {category.count}
            </Badge>
          )}
        </button>
      ))}
    </div>
  )
}
