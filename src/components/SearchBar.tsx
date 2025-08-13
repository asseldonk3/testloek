import { useState, useRef, useEffect } from 'react'
import { Search, Info } from 'lucide-react'
import { terminologyTranslator } from '../services/terminologyTranslator'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showTerminologyHelp, setShowTerminologyHelp] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (value.length > 1) {
      const translatedTerms = terminologyTranslator.getSuggestions(value)
      setSuggestions(translatedTerms)
      setShowSuggestions(translatedTerms.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [value])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch()
      setShowSuggestions(false)
    }
  }

  const selectSuggestion = (suggestion: string) => {
    onChange(suggestion)
    setShowSuggestions(false)
    onSearch()
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Zoek Vergunningen</h2>
          <button
            onClick={() => setShowTerminologyHelp(!showTerminologyHelp)}
            className="text-sm text-brabant-blue hover:text-blue-700 flex items-center space-x-1"
          >
            <Info className="h-4 w-4" />
            <span>Terminologie hulp</span>
          </button>
        </div>

        {showTerminologyHelp && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg text-sm">
            <p className="font-semibold mb-2">Oude (Wabo) ↔ Nieuwe (Omgevingswet) termen:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>• Bouwvergunning → Bouwactiviteit</div>
              <div>• Kapvergunning → Omgevingsplanactiviteit (kap)</div>
              <div>• Sloopvergunning → Sloopactiviteit</div>
              <div>• Aanlegvergunning → Aanlegactiviteit</div>
            </div>
          </div>
        )}

        <div className="relative">
          <div className="flex">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => value.length > 1 && setShowSuggestions(true)}
              placeholder="Zoek op type vergunning, adres, of projectomschrijving..."
              className="flex-1 px-4 py-3 pr-12 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-brabant-blue focus:border-transparent"
            />
            <button
              onClick={onSearch}
              className="px-6 py-3 bg-brabant-blue text-white rounded-r-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Zoeken</span>
            </button>
          </div>

          {/* Auto-complete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                >
                  <span className="text-sm">{suggestion}</span>
                  {terminologyTranslator.isOldTerm(suggestion) && (
                    <span className="ml-2 text-xs text-gray-500">(oude term)</span>
                  )}
                  {terminologyTranslator.isNewTerm(suggestion) && (
                    <span className="ml-2 text-xs text-status-green">(Omgevingswet)</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
          <span>Tip: Gebruik "omgevingsvergunning" voor pre-2024 of specifieke activiteiten voor post-2024</span>
          <span>Automatische vertaling tussen Wabo en Omgevingswet termen</span>
        </div>
      </div>
    </div>
  )
}