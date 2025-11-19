import { cn } from '@/lib/utils'

interface LoadingProps {
  /**
   * 로딩 스피너 크기
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * 로딩 텍스트
   */
  text?: string
  /**
   * 전체 화면 로딩 여부
   */
  fullScreen?: boolean
  /**
   * 추가 클래스명
   */
  className?: string
}

/**
 * 로딩 스피너 컴포넌트
 */
export function Loading({
  size = 'md',
  text,
  fullScreen = false,
  className,
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }

  const spinner = (
    <div
      className={cn(
        'inline-block rounded-full border-gray-300 border-t-blue-600 animate-spin',
        sizeClasses[size]
      )}
      role="status"
      aria-label="로딩 중"
    />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          {text && (
            <p className="text-sm text-gray-600 font-medium">{text}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="flex flex-col items-center gap-3">
        {spinner}
        {text && <p className="text-sm text-gray-600">{text}</p>}
      </div>
    </div>
  )
}

/**
 * 페이지 로딩 (전체 화면)
 */
export function PageLoading({ text = '로딩 중...' }: { text?: string }) {
  return <Loading fullScreen size="lg" text={text} />
}

/**
 * 버튼 내부 로딩 스피너
 */
export function ButtonLoading() {
  return <Loading size="sm" className="mr-2" />
}

/**
 * 스켈레톤 로딩 (카드)
 */
export function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-48 rounded-t-lg" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded" />
          <div className="h-3 bg-gray-200 rounded" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    </div>
  )
}

/**
 * 테이블 로딩 스켈레톤
 */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="h-10 bg-gray-200 rounded flex-1" />
          <div className="h-10 bg-gray-200 rounded w-32" />
          <div className="h-10 bg-gray-200 rounded w-24" />
        </div>
      ))}
    </div>
  )
}

/**
 * 리스트 로딩 스켈레톤
 */
export function ListSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="animate-pulse flex gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
