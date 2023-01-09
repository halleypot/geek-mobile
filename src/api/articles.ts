import http from '@/utils/request'
import type { ArticleDetailResponse } from '@/types/data'

export const getArticleDetail = (
  artId: string
): Promise<ArticleDetailResponse> => {
  return http.get(`/articles/${artId}`)
}
