'use client'

import { ServiceCategory } from '@/lib/types/service'
import { categoryLabels } from '@/lib/constants/services'
import { cn } from '@/lib/utils'

interface ServiceFilterProps {
  selectedCategory: ServiceCategory | 'ALL'
  onCategoryChange: (category: ServiceCategory | 'ALL') => void
}

/**
 * 서비스 카테고리 필터 컴포넌트
 */
export function ServiceFilter({
  selectedCategory,
  onCategoryChange,
}: ServiceFilterProps) {
  const categories: Array<{ value: ServiceCategory | 'ALL'; label: string }> = [
    { value: 'ALL', label: '전체' },
    { value: ServiceCategory.EMERGENCY, label: categoryLabels[ServiceCategory.EMERGENCY] },
    { value: ServiceCategory.EDUCATION, label: categoryLabels[ServiceCategory.EDUCATION] },
    { value: ServiceCategory.COUNSELING, label: categoryLabels[ServiceCategory.COUNSELING] },
    { value: ServiceCategory.TRAVEL, label: categoryLabels[ServiceCategory.TRAVEL] },
    { value: ServiceCategory.B2B, label: categoryLabels[ServiceCategory.B2B] },
  ]

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={cn(
            'px-6 py-2 rounded-full font-semibold transition-all',
            selectedCategory === category.value
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600'
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
