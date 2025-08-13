import { MapPin, Check } from 'lucide-react'
import { municipalities } from '../data/municipalities'

interface MunicipalitySelectorProps {
  selectedMunicipalities: string[]
  onSelectionChange: (municipalities: string[]) => void
}

export default function MunicipalitySelector({
  selectedMunicipalities,
  onSelectionChange
}: MunicipalitySelectorProps) {
  const isAllSelected = selectedMunicipalities.length === municipalities.length

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange([])
    } else {
      onSelectionChange(municipalities.map(m => m.name))
    }
  }

  const toggleMunicipality = (municipalityName: string) => {
    if (selectedMunicipalities.includes(municipalityName)) {
      onSelectionChange(selectedMunicipalities.filter(m => m !== municipalityName))
    } else {
      onSelectionChange([...selectedMunicipalities, municipalityName])
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <MapPin className="h-6 w-6 text-brabant-blue" />
          <h2 className="text-xl font-semibold">Selecteer Gemeenten</h2>
        </div>
        <div className="text-sm text-gray-600">
          {selectedMunicipalities.length} van {municipalities.length} geselecteerd
        </div>
      </div>

      {/* One-Click Selection Button - The Hero Feature */}
      <button
        onClick={handleSelectAll}
        className={`w-full mb-6 py-4 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-[1.02] ${
          isAllSelected
            ? 'bg-status-green text-white shadow-lg'
            : 'bg-construction-orange text-white shadow-lg hover:bg-orange-600'
        }`}
      >
        {isAllSelected ? (
          <span className="flex items-center justify-center space-x-2">
            <Check className="h-6 w-6" />
            <span>Alle Noord-Brabant gemeenten geselecteerd!</span>
          </span>
        ) : (
          <span>🚀 Selecteer alle 56 Noord-Brabant gemeenten in één klik!</span>
        )}
      </button>

      {/* Optional: Individual Municipality Selection */}
      <details className="cursor-pointer">
        <summary className="text-sm text-gray-600 hover:text-gray-900 mb-3">
          Of selecteer individuele gemeenten...
        </summary>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-64 overflow-y-auto p-2 border rounded-lg">
          {municipalities.map((municipality) => (
            <button
              key={municipality.code}
              onClick={() => toggleMunicipality(municipality.name)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                selectedMunicipalities.includes(municipality.name)
                  ? 'bg-brabant-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {municipality.name}
            </button>
          ))}
        </div>
      </details>

      {/* Quick Stats */}
      {selectedMunicipalities.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-brabant-blue">
            <strong>Tijd bespaard:</strong> ~20 minuten vs handmatige selectie
          </p>
        </div>
      )}
    </div>
  )
}