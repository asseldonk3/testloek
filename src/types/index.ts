export interface Permit {
  id: string
  publicationDate: string
  municipality: string
  caseNumber: string
  address: string
  projectDescription: string
  activityType: string
  status: 'approved' | 'pending' | 'rejected' | 'in-review'
  url: string
}

export interface SearchFilters {
  searchQuery: string
  dateFrom: string
  dateTo: string
  status: 'all' | 'approved' | 'pending' | 'rejected' | 'in-review'
  permitType: 'all' | 'bouw' | 'sloop' | 'kap' | 'aanleg' | 'monument'
}

export interface Municipality {
  name: string
  code: string
  permitCount?: number
}