import classnames from 'classnames'

import Icon from '@/components/icon'
import { Image } from 'antd-mobile'
import styles from './index.module.scss'
import { ArticlesItem } from '@/types/data'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
// bind relativeTime plugin to dayjs
dayjs.extend(relativeTime)
// set local time zone (Beijing)

dayjs.locale('zh-cn')

type Props = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  type: 0 | 1 | 3
  item: ArticlesItem
}

const ArticleItem = ({ type, item }: Props) => {
  const getRelativeTime = (value: string) => dayjs().from(dayjs(value))

  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 && 't3',
          type === 0 && 'none-mt'
        )}
      >
        <h3>{item.title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {item.cover.images.map((img, i) => (
              <div key={i} className="article-img-wrapper">
                {/* <img src={img} alt="" /> */}
                <Image
                  src={img}
                  lazy
                  style={{ '--width': '110px', '--height': '75px' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 && 'none-mt')}>
        <span>{item.aut_name}</span>
        <span>{item.comm_count} 评论</span>
        <span>{getRelativeTime(item.pubdate)}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
