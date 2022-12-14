import { Route, Switch } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import Icon from '@/components/icon'
import styles from './index.module.scss'
import { useHistory, useLocation } from 'react-router-dom'
import Index from '../index'
import Question from '../question'
import Video from '../video'
import Profile from '../profile'
import AuthRouter from '@/utils/authRouter'

const tabs = [
  { path: '/home', icon: 'iconbtn_home', text: '首页' },
  { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
]

const Home = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = (value: string) => {
    history.push(value)
  }

  return (
    <div className={styles.root}>
      {/* child routers for Index, Ask, Question, Profile */}

      <Switch>
        <Route exact path={'/home'} component={Index} />
        <Route path={'/home/Question'} component={Question} />
        <Route path={'/home/video'} component={Video} />
        {/* <Route path={'/home/profile'} component={Profile} /> */}
        <AuthRouter path="/home/profile">
          <Profile />
        </AuthRouter>
      </Switch>

      <TabBar
        className="tab-bar"
        activeKey={pathname}
        onChange={(value) => setRouteActive(value)}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={(active: boolean) => (
              <Icon type={active ? item.icon + '_sel' : item.icon} />
            )}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default Home
