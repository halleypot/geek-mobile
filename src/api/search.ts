import http from '@/utils/request'
import type { SearchOptionResponse, SearchResultsResponse } from '@/types/data'

export const searchOption = (q: string): Promise<SearchOptionResponse> => {
  return http.get('/suggestion', { params: { q } })
}

export function searchResults(params: {
  page?: number
  per_page?: number
  q: string
}): Promise<SearchResultsResponse> {
  return http.get('/search', { params })
}
