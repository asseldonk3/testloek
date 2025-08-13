import type { Permit } from '../types'
import PermitCard from './PermitCard'

interface PermitListProps {
  permits: Permit[]
}

export default function PermitList({ permits }: PermitListProps) {
  if (permits.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 mb-2">Geen vergunningen gevonden</p>
        <p className="text-sm text-gray-400">
          Selecteer gemeenten en klik op zoeken om te beginnen
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {permits.length} vergunningen gevonden
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-status-green rounded-full"></div>
            <span>Goedgekeurd</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-status-amber rounded-full"></div>
            <span>In behandeling</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-status-red rounded-full"></div>
            <span>Afgewezen</span>
          </div>
        </div>
      </div>

      {permits.map((permit) => (
        <PermitCard key={permit.id} permit={permit} />
      ))}
    </div>
  )
}