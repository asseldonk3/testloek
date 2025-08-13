import { Filter, Calendar, FileType, AlertCircle } from 'lucide-react'
import type { SearchFilters } from '../types'

interface FilterPanelProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
}

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-brabant-blue" />
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline h-4 w-4 mr-1" />
            Vanaf datum
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brabant-blue"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline h-4 w-4 mr-1" />
            Tot datum
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brabant-blue"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <AlertCircle className="inline h-4 w-4 mr-1" />
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brabant-blue"
          >
            <option value="all">Alle statussen</option>
            <option value="approved">Goedgekeurd</option>
            <option value="pending">In behandeling</option>
            <option value="rejected">Afgewezen</option>
            <option value="in-review">In beoordeling</option>
          </select>
        </div>

        {/* Permit Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FileType className="inline h-4 w-4 mr-1" />
            Type vergunning
          </label>
          <select
            value={filters.permitType}
            onChange={(e) => handleFilterChange('permitType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brabant-blue"
          >
            <option value="all">Alle types</option>
            <option value="bouw">Bouw</option>
            <option value="sloop">Sloop</option>
            <option value="kap">Kap</option>
            <option value="aanleg">Aanleg</option>
            <option value="monument">Monument</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.dateFrom || filters.dateTo || filters.status !== 'all' || filters.permitType !== 'all') && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-brabant-blue font-medium">Actieve filters:</span>
            <button
              onClick={() => onFiltersChange({
                searchQuery: filters.searchQuery,
                dateFrom: '',
                dateTo: '',
                status: 'all',
                permitType: 'all'
              })}
              className="text-sm text-brabant-blue hover:text-blue-700"
            >
              Wis filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}