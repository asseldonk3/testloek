import { CheckCircle, Clock, XCircle, FileSearch, TrendingUp, ArrowRight } from 'lucide-react'
import type { Permit } from '../types'

interface StatusDashboardProps {
  permits: Permit[]
}

export default function StatusDashboard({ permits }: StatusDashboardProps) {
  const getPermitsByStatus = (status: Permit['status']) => {
    return permits.filter(p => p.status === status)
  }

  const approved = getPermitsByStatus('approved')
  const pending = getPermitsByStatus('pending')
  const rejected = getPermitsByStatus('rejected')
  const inReview = getPermitsByStatus('in-review')

  const columns = [
    {
      title: 'Ingediend',
      status: 'in-review' as const,
      permits: inReview,
      icon: FileSearch,
      color: 'bg-status-blue',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'In Behandeling',
      status: 'pending' as const,
      permits: pending,
      icon: Clock,
      color: 'bg-status-amber',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Goedgekeurd',
      status: 'approved' as const,
      permits: approved,
      icon: CheckCircle,
      color: 'bg-status-green',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Afgewezen',
      status: 'rejected' as const,
      permits: rejected,
      icon: XCircle,
      color: 'bg-status-red',
      bgColor: 'bg-red-50'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Totaal</p>
              <p className="text-2xl font-bold">{permits.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-brabant-blue" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Goedgekeurd</p>
              <p className="text-2xl font-bold text-status-green">{approved.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-status-green" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Behandeling</p>
              <p className="text-2xl font-bold text-status-amber">{pending.length}</p>
            </div>
            <Clock className="h-8 w-8 text-status-amber" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Afgewezen</p>
              <p className="text-2xl font-bold text-status-red">{rejected.length}</p>
            </div>
            <XCircle className="h-8 w-8 text-status-red" />
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Status Overzicht</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((column, index) => {
            const Icon = column.icon
            return (
              <div key={column.status} className="flex flex-col">
                <div className={`${column.bgColor} rounded-t-lg p-3`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-5 w-5 text-gray-700`} />
                      <h4 className="font-medium text-gray-700">{column.title}</h4>
                    </div>
                    <span className={`${column.color} text-white text-xs px-2 py-1 rounded-full`}>
                      {column.permits.length}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-b-lg p-3 flex-1 min-h-[300px]">
                  <div className="space-y-2">
                    {column.permits.slice(0, 3).map(permit => (
                      <div key={permit.id} className="bg-white rounded p-3 shadow-sm">
                        <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                          {permit.projectDescription}
                        </p>
                        <p className="text-xs text-gray-500">{permit.municipality}</p>
                        <p className="text-xs text-gray-400 mt-1">{permit.caseNumber}</p>
                      </div>
                    ))}
                    {column.permits.length > 3 && (
                      <div className="text-center py-2">
                        <button className="text-xs text-brabant-blue hover:text-blue-700">
                          +{column.permits.length - 3} meer
                        </button>
                      </div>
                    )}
                    {column.permits.length === 0 && (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        Geen vergunningen
                      </div>
                    )}
                  </div>
                </div>

                {/* Flow Arrow */}
                {index < columns.length - 1 && (
                  <div className="hidden md:flex absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Timeline View */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recente Activiteit</h3>
        <div className="space-y-3">
          {permits.slice(0, 5).map(permit => (
            <div key={permit.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded">
              <div className={`w-2 h-2 rounded-full ${
                permit.status === 'approved' ? 'bg-status-green' :
                permit.status === 'pending' ? 'bg-status-amber' :
                permit.status === 'rejected' ? 'bg-status-red' :
                'bg-status-blue'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{permit.projectDescription}</p>
                <p className="text-xs text-gray-500">
                  {permit.municipality} • {new Date(permit.publicationDate).toLocaleDateString('nl-NL')}
                </p>
              </div>
              <span className="text-xs text-gray-400">{permit.caseNumber}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}