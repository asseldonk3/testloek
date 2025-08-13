import { useState } from 'react'
import { Search, Map, FileText, BarChart3, Settings } from 'lucide-react'
import SearchBar from './components/SearchBar'
import MunicipalitySelector from './components/MunicipalitySelector'
import PermitList from './components/PermitList'
import PermitMap from './components/PermitMap'
import StatusDashboard from './components/StatusDashboard'
import FilterPanel from './components/FilterPanel'
import type { Permit, SearchFilters } from './types'

type ViewMode = 'search' | 'map' | 'dashboard' | 'reports'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('search')
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<string[]>([])
  const [permits, setPermits] = useState<Permit[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: '',
    dateFrom: '',
    dateTo: '',
    status: 'all',
    permitType: 'all'
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    setIsLoading(true)
    // TODO: Implement actual API call
    setTimeout(() => {
      setPermits(getMockPermits())
      setIsLoading(false)
    }, 1500)
  }

  const getMockPermits = (): Permit[] => {
    return [
      {
        id: 'gmb-2025-261426',
        publicationDate: '2025-06-17',
        municipality: 'Tilburg',
        caseNumber: 'Z2025-00003110',
        address: 'Steenbergenerf 5, 5035HX Tilburg',
        projectDescription: 'Verbouwen van garage tot extra kamer',
        activityType: 'Bouwactiviteit (omgevingsplan)',
        status: 'approved',
        url: 'https://zoek.officielebekendmakingen.nl/gmb-2025-261426.html'
      },
      {
        id: 'gmb-2025-229040',
        publicationDate: '2025-05-15',
        municipality: 'Eindhoven',
        caseNumber: 'E2025-00002890',
        address: 'Vestdijk 27, 5611CA Eindhoven',
        projectDescription: 'Plaatsen van dakkapel aan achterzijde woning',
        activityType: 'Bouwactiviteit',
        status: 'pending',
        url: 'https://zoek.officielebekendmakingen.nl/gmb-2025-229040.html'
      },
      {
        id: 'gmb-2025-260706',
        publicationDate: '2025-04-20',
        municipality: 'Breda',
        caseNumber: 'B2025-00001234',
        address: 'Grote Markt 1, 4811XL Breda',
        projectDescription: 'Kappen van 3 bomen voor herinrichting plein',
        activityType: 'Omgevingsplanactiviteit',
        status: 'rejected',
        url: 'https://zoek.officielebekendmakingen.nl/gmb-2025-260706.html'
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-brabant-blue text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Noord-Brabant Vergunningen</h1>
                <p className="text-sm text-blue-100">Vind vergunningen in 5 minuten</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="bg-blue-600 px-3 py-1 rounded-full">
                56 gemeenten • {permits.length} vergunningen
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setViewMode('search')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                viewMode === 'search'
                  ? 'border-brabant-blue text-brabant-blue'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search className="h-5 w-5" />
              <span>Zoeken</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                viewMode === 'map'
                  ? 'border-brabant-blue text-brabant-blue'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Map className="h-5 w-5" />
              <span>Kaart</span>
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                viewMode === 'dashboard'
                  ? 'border-brabant-blue text-brabant-blue'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setViewMode('reports')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                viewMode === 'reports'
                  ? 'border-brabant-blue text-brabant-blue'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Rapporten</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {viewMode === 'search' && (
          <div className="space-y-6">
            {/* Municipality Selector */}
            <MunicipalitySelector
              selectedMunicipalities={selectedMunicipalities}
              onSelectionChange={setSelectedMunicipalities}
            />

            {/* Search Bar */}
            <SearchBar
              value={filters.searchQuery}
              onChange={(value) => setFilters({ ...filters, searchQuery: value })}
              onSearch={handleSearch}
            />

            {/* Filter Panel */}
            <FilterPanel filters={filters} onFiltersChange={setFilters} />

            {/* Results */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brabant-blue"></div>
              </div>
            ) : (
              <PermitList permits={permits} />
            )}
          </div>
        )}

        {viewMode === 'map' && (
          <PermitMap
            permits={permits}
            selectedMunicipalities={selectedMunicipalities}
            onMunicipalityClick={(municipality) => {
              if (selectedMunicipalities.includes(municipality)) {
                setSelectedMunicipalities(selectedMunicipalities.filter(m => m !== municipality))
              } else {
                setSelectedMunicipalities([...selectedMunicipalities, municipality])
              }
            }}
          />
        )}

        {viewMode === 'dashboard' && (
          <StatusDashboard permits={permits} />
        )}

        {viewMode === 'reports' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Rapporten & Export</h2>
            <p className="text-gray-600">Export functionaliteit komt binnenkort beschikbaar.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App