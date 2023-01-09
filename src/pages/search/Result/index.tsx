import { useHistory } from 'react-router-dom'
import { NavBar, InfiniteScroll } from 'antd-mobile'

import ArticleItem from '@/components/articleItem'

import styles from './index.module.scss'
import { useRef, useState } from 'react'
import { searchResults } from '@/api/search'
import { Articles } from '@/types/data'

const Result = () => {
  const history = useHistory()
  const [resultList, setResultList] = useState<Articles['results']>([])
  const params = new URLSearchParams(window.location.search)
  const query = params.get('q')
  console.log('获取查询参数q', query)
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef(1)

  // useEffect(() => {
  //   const getSearchResults = async () => {
  //     const params = new URLSearchParams(window.location.search)
  //     const query = params.get('q')
  //     console.log('获取查询参数q', query)
  //     const {
  //       data: { results },
  //     } = await searchResults({ q: query || '', page: 1 })
  //     console.log(results)
  //     setResultList(results)
  //   }
  //   getSearchResults()
  // }, [])

  async function loadMore() {
    const {
      data: { results, total_count },
    } = await searchResults({ q: query || '', page: pageRef.current })
    console.log(results)
    setResultList((val) => [...val, ...results])
    if (total_count === resultList.length) {
      setHasMore(false)
    } else {
      pageRef.current++
    }
  }

  const renderArticleList = () => {
    return resultList.map((item, index) => {
      return (
        <div
          key={item.art_id}
          className="article-item"
          onClick={() => history.push(`/article/${item.art_id}`)}
        >
          <ArticleItem type={item.cover.type} item={item} />
        </div>
      )
    })
  }

  return (
    <div className={styles.root}>
      {/* 搜索结果头部 */}
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      {/* 搜索结果列表 */}
      <div className="article-list">
        {renderArticleList()}
        {/* 无限滚动 */}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  )
}

export default Result
