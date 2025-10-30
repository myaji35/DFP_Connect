"use client"

import { Users, Building2, Heart } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface PersonaCardProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
  isSelected: boolean
}

function PersonaCard({ icon, title, description, onClick, isSelected }: PersonaCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300",
        "border-2 hover:scale-105 hover:shadow-2xl",
        isSelected
          ? "border-primary bg-primary/5 shadow-xl"
          : "border-gray-200 bg-white hover:border-primary/50"
      )}
    >
      <div className="relative z-10">
        <div className={cn(
          "mb-4 inline-flex rounded-full p-4 transition-colors",
          isSelected
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary"
        )}>
          {icon}
        </div>
        <h3 className="mb-2 text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Decorative gradient overlay */}
      <div className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-300",
        "bg-gradient-to-br from-primary/5 to-transparent",
        isSelected && "opacity-100"
      )} />
    </button>
  )
}

export function PersonaSelector() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)

  const personas = [
    {
      id: 'family',
      icon: <Users className="h-8 w-8" />,
      title: '서비스 이용자',
      description: '장애인 가족을 위한 돌봄, 교육, 상담 서비스'
    },
    {
      id: 'business',
      icon: <Building2 className="h-8 w-8" />,
      title: '협력 기관',
      description: '전문 인력 파견 및 프로그램 운영 지원'
    },
    {
      id: 'supporter',
      icon: <Heart className="h-8 w-8" />,
      title: '후원 파트너',
      description: '함께 만드는 희망의 변화, 후원과 협력'
    }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          어떻게 도와드릴까요?
        </h2>
        <p className="text-xl text-gray-600">
          맞춤형 서비스를 위해 해당하는 항목을 선택해주세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <PersonaCard
            key={persona.id}
            icon={persona.icon}
            title={persona.title}
            description={persona.description}
            onClick={() => setSelectedPersona(persona.id)}
            isSelected={selectedPersona === persona.id}
          />
        ))}
      </div>

      {selectedPersona && (
        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button className="rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl">
            맞춤 서비스 바로가기
          </button>
        </div>
      )}
    </div>
  )
}
