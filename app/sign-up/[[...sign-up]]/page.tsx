import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            DFP Connect 회원가입
          </h1>
          <p className="text-gray-600">
            함께 희망을 만들어가요
          </p>
        </div>
        <SignUp />
      </div>
    </div>
  )
}
