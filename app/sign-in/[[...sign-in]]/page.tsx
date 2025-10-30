import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            DFP Connect에 오신 것을 환영합니다
          </h1>
          <p className="text-gray-600">
            로그인하여 서비스를 이용하세요
          </p>
        </div>
        <SignIn />
      </div>
    </div>
  )
}
