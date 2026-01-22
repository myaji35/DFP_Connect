'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
  defaultValue?: string
  className?: string
}

/**
 * 검색바 컴포넌트
 *
 * 텍스트 입력 기반 검색 기능
 */
export function SearchBar({
  placeholder = '검색어를 입력하세요',
  onSearch,
  defaultValue = '',
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query.trim())
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        {/* 검색 아이콘 */}
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

        {/* 입력 필드 */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="
            w-full pl-12 pr-24 py-3 md:py-4
            bg-white dark:bg-gray-800
            border-2 border-gray-200 dark:border-gray-700
            rounded-lg
            text-gray-900 dark:text-white
            placeholder:text-gray-400
            focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800
            transition-all duration-200
            outline-none
          "
        />

        {/* 초기화 버튼 */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="
              absolute right-20 top-1/2 -translate-y-1/2
              w-6 h-6 flex items-center justify-center
              text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
              transition-colors
            "
            aria-label="검색어 지우기"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* 검색 버튼 */}
        <button
          type="submit"
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            px-4 py-2
            bg-primary-500 hover:bg-primary-600
            text-white font-semibold
            rounded-md
            transition-colors
            focus:ring-2 focus:ring-primary-300 focus:ring-offset-2
          "
        >
          검색
        </button>
      </div>
    </form>
  )
}
