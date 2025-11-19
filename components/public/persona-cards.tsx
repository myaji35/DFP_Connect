import { PersonaCard } from './persona-card'
import { personas } from '@/lib/constants/personas'

/**
 * 페르소나 카드 그리드 컴포넌트
 *
 * 3개의 페르소나 카드를 그리드로 표시
 */
export function PersonaCards() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            어떤 도움이 필요하신가요?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            장애와가족플랫폼은 세 가지 방식으로 함께합니다
          </p>
        </div>

        {/* Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personas.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} />
          ))}
        </div>
      </div>
    </section>
  )
}
