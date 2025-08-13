import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Permit } from '../types'

// Fix for default markers in Leaflet with Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

interface PermitMapProps {
  permits: Permit[]
  selectedMunicipalities: string[]
  onMunicipalityClick: (municipality: string) => void
}

export default function PermitMap({ permits, selectedMunicipalities, onMunicipalityClick }: PermitMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Initialize map centered on Noord-Brabant
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([51.5555, 5.0719], 9)
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current)
    }

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer)
      }
    })

    // Add permit markers
    permits.forEach(permit => {
      // Simple geocoding simulation - in production, use real coordinates
      const coords = getCoordinatesForMunicipality(permit.municipality)
      if (coords) {
        const marker = L.marker(coords)
          .addTo(mapRef.current!)
          .bindPopup(`
            <div class="p-2">
              <h4 class="font-semibold">${permit.projectDescription}</h4>
              <p class="text-sm">${permit.address}</p>
              <p class="text-sm mt-1">Status: ${getStatusText(permit.status)}</p>
            </div>
          `)
      }
    })

    return () => {
      // Cleanup is handled by not destroying the map instance
    }
  }, [permits])

  const getCoordinatesForMunicipality = (municipality: string): [number, number] | null => {
    // Simplified coordinates for major Noord-Brabant cities
    const coords: { [key: string]: [number, number] } = {
      'Tilburg': [51.5555, 5.0913],
      'Eindhoven': [51.4416, 5.4697],
      'Breda': [51.5719, 4.7683],
      "'s-Hertogenbosch": [51.6978, 5.3037],
      'Helmond': [51.4793, 5.6570],
      'Oss': [51.7649, 5.5186],
      'Roosendaal': [51.5306, 4.4653],
      'Bergen op Zoom': [51.4944, 4.2872],
      'Oosterhout': [51.6450, 4.8596],
      'Veldhoven': [51.4185, 5.4029]
    }
    return coords[municipality] || null
  }

  const getStatusText = (status: Permit['status']) => {
    switch (status) {
      case 'approved': return 'Goedgekeurd'
      case 'pending': return 'In behandeling'
      case 'rejected': return 'Afgewezen'
      case 'in-review': return 'In beoordeling'
      default: return status
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Vergunningen Kaart</h3>
        <div className="text-sm text-gray-600">
          {permits.length} vergunningen weergegeven
        </div>
      </div>
      <div ref={mapContainerRef} className="h-[600px] rounded-lg overflow-hidden" />
      
      {/* Legend */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Klik op markers voor meer informatie over vergunningen
        </p>
      </div>
    </div>
  )
}