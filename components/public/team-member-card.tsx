import { Mail, Linkedin, User } from 'lucide-react'
import type { TeamMember } from '@/lib/types/team'

interface TeamMemberCardProps {
  member: TeamMember
}

/**
 * 팀 멤버 카드 컴포넌트
 */
export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-100 p-6 hover:shadow-xl hover:border-blue-200 transition-all group">
      {/* Avatar */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mx-auto mb-4 group-hover:scale-110 transition-transform">
        <User className="w-10 h-10 text-blue-600" />
      </div>

      {/* Name & Position */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-sm font-semibold text-blue-600">{member.position}</p>
        {member.department && (
          <p className="text-xs text-gray-500 mt-1">{member.department}</p>
        )}
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4 text-center">
        {member.bio}
      </p>

      {/* Expertise Tags */}
      {member.expertise && member.expertise.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {member.expertise.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Contact Links */}
      <div className="flex gap-2 justify-center pt-4 border-t border-gray-100">
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
            aria-label={`${member.name} 이메일`}
          >
            <Mail className="w-4 h-4" />
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
            aria-label={`${member.name} LinkedIn`}
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  )
}
