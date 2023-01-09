import { getArticleList } from '@/api/home'
import { InfiniteScroll } from 'antd-mobile'

import styles from './index.module.scss'
import { useRef, useState } from 'react'
import type { ArticlesItem } from '@/types/data'
import ArticleItem from '@/components/articleItem'
import { useHistory } from 'react-router-dom'

type Props = {
  channel_id: string
}

const ArticleList = ({ channel_id }: Props) => {
  // @data article list
  const [data, setData] = useState<ArticlesItem[]>([])
  // to load more data if hasmMore is true
  const [hasMore, setHasMore] = useState(true)
  // to store current tiemstampe, and load previous data if require more
  const refTimestamp = useRef(Date.now())
  const history = useHistory()

  async function loadMore() {
    const {
      data: { pre_timestamp, results },
    } = await getArticleList({ channel_id, timestamp: refTimestamp.current })
    console.log(results)

    setData((val) => [...val, ...results])
    if (pre_timestamp) {
      refTimestamp.current = pre_timestamp
    } else {
      setHasMore(false)
    }
    setHasMore(results.length > 0)
  }

  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      {data.map((item) => (
        <div
          key={item.art_id}
          className="article-item"
          onClick={() => history.push(`/article/${item.art_id}`)}
        >
          <ArticleItem type={item.cover.type} item={item} />
        </div>
      ))}

      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}

export default ArticleList
