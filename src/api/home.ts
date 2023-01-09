import http from '@/utils/request'
import type { AriticlesResponse } from '@/types/data'

// definte article paramters type
type ParamArticle = {
  channel_id: string
  timestamp: number
}

export function getArticleList(
  params: ParamArticle
): Promise<AriticlesResponse> {
  return http.get('/articles', { params })
}
