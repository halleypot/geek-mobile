import { Link, useHistory } from 'react-router-dom'

import Icon from '@/components/icon'
import styles from './index.module.scss'
import { getUserProfile } from '@/store/actions/user'
import useInitialState from '@/utils/use-initial-state'

const Profile = () => {
  const history = useHistory()
  const { user } = useInitialState(getUserProfile, 'profile')
  const { id, name, photo, art_count, follow_count, fans_count, like_count } =
    user

  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 个人信息 */}
        <div className="user-info" key={id}>
          <div className="avatar">
            <img
              src={photo || 'http://toutiao.itheima.net/images/user_head.jpg'}
              alt=""
            />
          </div>
          <div className="user-name">{name}</div>

          {/* personal info editing page */}
          <Link to="/profile/edit">
            个人信息 <Icon type="iconbtn_right" />
          </Link>
        </div>

        {/* 今日阅读 */}
        <div className="read-info">
          <Icon type="iconbtn_readingtime" />
          今日阅读
          <span>{art_count}</span>
          分钟
        </div>

        {/* 动态 - 对应的这一行 */}
        <div className="count-list">
          <div className="count-item">
            <p>1</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{follow_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{like_count}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 消息通知 - 对应的这一行 */}
        <div className="user-links">
          <div className="link-item">
            <Icon type="iconbtn_mymessages" />
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_mycollect" />
            <div>收藏</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_history1" />
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_myworks" />
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务 */}
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div className="service-item">
            <Icon type="iconbtn_feedback" />
            <div>用户反馈</div>
          </div>
          <div className="service-item" onClick={() => history.push('/chat')}>
            <Icon type="iconbtn_xiaozhitongxue" />
            <div>小智同学</div>
          </div>
          {/* <Link className="service-item" to={'/chat'}>
            <Icon type="iconbtn_xiaozhitongxue" />
            <div>小智同学</div>
          </Link> */}
        </div>
      </div>
    </div>
  )
}

export default Profile
