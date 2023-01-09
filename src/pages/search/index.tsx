import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/icon'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { searchOption } from '@/api/search'
// import { debounce } from 'lodash'
import { useRequest } from 'ahooks'
// @ GEEK_SEARCH_HISTORY
const GEEK_SEARCH_KEY = 'GEEK_SEARCH_KEY'

// use debounce to reduce frenquently sending internet request
// 1. by using lodash
// const debounceFn = debounce(
//   async (query: string, fn: (val: string[]) => void) => {
//     // get search suggestion results
//     const {
//       data: { options },
//     } = await searchOption(query)
//     // highlight searched keyword
//     //  replace the keyword to <span>keyword</span>
//     fn(options)
//   },
//   600
// )

// 2. by using ahooks

const SearchPage = () => {
  const history = useHistory()
  //handle onSearch event
  const [keyword, setKeyword] = useState('')
  //   render search results
  const [searchOpinion, setSearchOpinion] = useState<string[]>([])
  //   render search history results
  const [searchHistory, setSearchHistory] = useState<string[]>(
    JSON.parse(window.localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]')
  )

  // 2. debounce by using useDebounceFn in ahooks
  // const { run } = useDebounceFn(
  //   async (query) => {
  //     const {
  //       data: { options },
  //     } = await searchOption(query)
  //     setSearchOpinion(options)
  //   },
  //   {
  //     wait: 500,
  //   }
  // )

  // 3. debounce by using useRequest in ahooks
  const { run } = useRequest(
    async (query: string) => {
      // get search suggestion results
      const {
        data: { options },
      } = await searchOption(query)
      // set search results list
      setSearchOpinion(options)
    },
    {
      debounceWait: 600,
      manual: true,
    }
  )

  const searchSuggestion = (query: string) => {
    setKeyword(query)
    // if search keywords is empty, hide search suggestion list and return
    if (query.trim() === '') return setSearchOpinion([])

    // Method 1: debounceFn(query, setSearchOpinion)
    // Method 2: run(query)
    run(query)
    // setSearchOpinion(options)
  }

  const saveHistory = (txt: string) => {
    if (searchHistory.some((item) => item === txt)) return
    // store search history and remove repeated history string
    setSearchHistory([txt, ...searchHistory])
  }

  const toSearchResult = (txt: string) => {
    setTimeout(() => history.push(`/search/result?q=${txt}`), 500)
    saveHistory(txt)
  }

  // store search history in local storage
  useEffect(() => {
    window.localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(searchHistory))
  }, [searchHistory])

  // click delte icon to delete a history item
  const delHistory = (item: string) => {
    setSearchHistory(searchHistory.filter((history) => history !== item))
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={
          <span className="search-text" onClick={() => toSearchResult(keyword)}>
            搜索
          </span>
        }
      >
        <SearchBar
          placeholder="请输入关键字搜索"
          value={keyword}
          onChange={(val: string) => searchSuggestion(val)}
          onSearch={() => toSearchResult(keyword)}
        />
      </NavBar>
      {/*search history list  */}
      {searchOpinion.length === 0 && (
        <div
          className="history"
          style={{
            display: searchHistory.length > 0 ? 'block' : 'none',
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span onClick={() => setSearchHistory([])}>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            {/* render search history */}
            {searchHistory.map((item) => (
              <span
                className="history-item"
                key={item}
                onClick={() => history.push(`/search/result?q=${item}`)}
              >
                <span className="text-overflow">{item}</span>
                <Icon
                  type="iconbtn_essay_close"
                  handleClick={(e) => {
                    e.stopPropagation()
                    delHistory(item)
                  }}
                />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* search keywords suggestion  */}
      <div
        className={classnames(
          'search-result',
          searchOpinion.length > 0 ? 'show' : ''
        )}
      >
        {searchOpinion.map((item) => (
          <div
            className="result-item"
            key={item}
            onClick={() => toSearchResult(item)}
          >
            <Icon className="icon-search" type="iconbtn_search" />
            <div
              className="result-value text-overflow"
              dangerouslySetInnerHTML={{
                __html: item?.replace(
                  new RegExp(keyword, 'i'),
                  `<span >${keyword}</span>`
                ),
              }}
            >
              {/* <span >黑马</span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
