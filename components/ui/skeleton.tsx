/**
 * 스켈레톤 로딩 컴포넌트
 *
 * 콘텐츠 로딩 중 placeholder UI 제공
 */
export function Skeleton({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      {...props}
    />
  )
}

/**
 * 카드 스켈레톤
 */
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      <Skeleton className="w-12 h-12 rounded-lg mb-4" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}

/**
 * 스토리 카드 스켈레톤
 */
export function StoryCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}>
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <Skeleton className="h-4 w-20 mb-3 rounded-full" />
        <Skeleton className="h-6 w-full mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5 mb-4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}

/**
 * 테이블 행 스켈레톤
 */
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      {Array.from({ length: columns }).map((_, idx) => (
        <td key={idx} className="px-6 py-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  )
}

/**
 * 페이지 로딩 스켈레톤 (그리드)
 */
export function GridSkeleton({
  count = 6,
  columns = 3,
}: {
  count?: number
  columns?: number
}) {
  return (
    <div
      className={`grid grid-cols-1 ${
        columns === 2
          ? 'md:grid-cols-2'
          : columns === 3
          ? 'md:grid-cols-2 lg:grid-cols-3'
          : 'md:grid-cols-2 lg:grid-cols-4'
      } gap-6`}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </div>
  )
}
