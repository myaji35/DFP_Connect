'use client'

import { useState } from 'react'
import { ServiceCard } from './service-card'
import { ServiceFilter } from './service-filter'
import { ServiceDetailModal } from './service-detail-modal'
import { services } from '@/lib/constants/services'
import { Service, ServiceCategory } from '@/lib/types/service'

/**
 * 서비스 그리드 컴포넌트
 *
 * 필터링 및 상세 모달 포함
 */
export function ServiceGrid() {
  const [selectedCategory, setSelectedCategory] = useState<
    ServiceCategory | 'ALL'
  >('ALL')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 필터링된 서비스
  const filteredServices =
    selectedCategory === 'ALL'
      ? services
      : services.filter((s) => s.category === selectedCategory)

  const handleViewDetails = (service: Service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  return (
    <div>
      {/* Filter */}
      <div className="mb-12">
        <ServiceFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            해당 카테고리에 서비스가 없습니다
          </p>
        </div>
      )}

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
