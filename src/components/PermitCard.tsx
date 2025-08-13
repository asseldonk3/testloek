import { useState } from 'react'
import { MapPin, Calendar, FileText, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import type { Permit } from '../types'

interface PermitCardProps {
  permit: Permit
}

export default function PermitCard({ permit }: PermitCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status: Permit['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-status-green text-white'
      case 'pending':
        return 'bg-status-amber text-white'
      case 'rejected':
        return 'bg-status-red text-white'
      case 'in-review':
        return 'bg-status-blue text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getStatusText = (status: Permit['status']) => {
    switch (status) {
      case 'approved':
        return 'Goedgekeurd'
      case 'pending':
        return 'In behandeling'
      case 'rejected':
        return 'Afgewezen'
      case 'in-review':
        return 'In beoordeling'
      default:
        return status
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(permit.status)}`}>
                {getStatusText(permit.status)}
              </span>
              <span className="text-sm text-gray-500">
                {permit.caseNumber}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {permit.projectDescription}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {permit.activityType}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{permit.address}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{new Date(permit.publicationDate).toLocaleDateString('nl-NL')}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FileText className="h-4 w-4 text-gray-400" />
            <span>{permit.municipality}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-brabant-blue hover:text-blue-700 text-sm"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                <span>Minder details</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span>Meer details</span>
              </>
            )}
          </button>
          <a
            href={permit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-brabant-blue hover:text-blue-700 text-sm"
          >
            <span>Bekijk origineel</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Publicatie ID:</span>
                <p className="text-gray-600">{permit.id}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Gemeente:</span>
                <p className="text-gray-600">{permit.municipality}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Type activiteit:</span>
                <p className="text-gray-600">{permit.activityType}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <p className="text-gray-600">{getStatusText(permit.status)}</p>
              </div>
            </div>
            <div className="mt-3">
              <span className="font-medium text-gray-700">Volledig adres:</span>
              <p className="text-gray-600">{permit.address}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}