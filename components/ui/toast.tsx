'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  onClose: (id: string) => void
}

/**
 * Toast 컴포넌트
 */
function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300) // 애니메이션 완료 후 제거
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(id), 300)
  }

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  }

  const styles = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border shadow-lg transition-all duration-300 max-w-md',
        styles[type],
        isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      )}
      role="alert"
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {message && (
          <p className="mt-1 text-sm text-gray-600">{message}</p>
        )}
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="닫기"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

/**
 * Toast Container 컴포넌트
 */
export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastProps[]
  onClose: (id: string) => void
}) {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  )
}

/**
 * Toast Hook
 */
let toastCounter = 0
const toastListeners: Array<(toasts: ToastProps[]) => void> = []
let toastsState: ToastProps[] = []

function notifyListeners() {
  toastListeners.forEach((listener) => listener(toastsState))
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  useEffect(() => {
    toastListeners.push(setToasts)
    setToasts(toastsState)

    return () => {
      const index = toastListeners.indexOf(setToasts)
      if (index > -1) {
        toastListeners.splice(index, 1)
      }
    }
  }, [])

  const show = (
    type: ToastType,
    title: string,
    message?: string,
    duration?: number
  ) => {
    const id = `toast-${++toastCounter}`
    const newToast: ToastProps = {
      id,
      type,
      title,
      message,
      duration,
      onClose: dismiss,
    }

    toastsState = [...toastsState, newToast]
    notifyListeners()
  }

  const dismiss = (id: string) => {
    toastsState = toastsState.filter((toast) => toast.id !== id)
    notifyListeners()
  }

  return {
    toasts,
    success: (title: string, message?: string, duration?: number) =>
      show('success', title, message, duration),
    error: (title: string, message?: string, duration?: number) =>
      show('error', title, message, duration),
    warning: (title: string, message?: string, duration?: number) =>
      show('warning', title, message, duration),
    info: (title: string, message?: string, duration?: number) =>
      show('info', title, message, duration),
    dismiss,
  }
}

/**
 * Toast Provider (app/layout.tsx에 추가)
 */
export function ToastProvider() {
  const { toasts, dismiss } = useToast()

  return <ToastContainer toasts={toasts} onClose={dismiss} />
}
