import { Tabs } from 'antd-mobile'
import Icon from '@/components/icon'
import useInitialState from '@/utils/use-initial-state'
import { Popup } from 'antd-mobile'
import Channels from './components/channels'

// import index style
import styles from './index.module.scss'
import { getUserChannels } from '@/store/actions/home'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import ArticleList from './components/articleList'
import { useHistory } from 'react-router-dom'

// home page
const Index = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { userChannel } = useInitialState(getUserChannels, 'home')
  const { channelActiveKey } = useSelector((state: RootState) => state.home)
  // set channel popup visibility
  const [showChannel, setShowChannel] = useState(false)

  // handle tab change event; when changing tab, the channelActiveKey will be changed
  const onTabChange = (key: string) => {
    dispatch({ type: 'home/changeTab', payload: key })
  }

  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {userChannel.length > 0 && (
        <Tabs
          className="tabs"
          activeLineMode="fixed"
          activeKey={channelActiveKey}
          onChange={onTabChange}
        >
          {userChannel.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              {/* article details */}
              {<ArticleList channel_id={item.id.toString()} />}
            </Tabs.Tab>
          ))}
        </Tabs>
      )}

      {/* search icon , channel function icon */}
      <div className="tabs-opration">
        {/* click search icon and route to search page */}
        <Icon
          type="iconbtn_search"
          handleClick={() => history.push('/search')}
        />
        {/* click to show more channels */}
        <Icon type="iconbtn_channel" handleClick={() => setShowChannel(true)} />
      </div>

      {/* Popup components to pop up Channel component */}
      <Popup
        visible={showChannel}
        position="left"
        bodyStyle={{ width: '100vw' }}
      >
        <Channels
          closeChannel={(value: boolean) => {
            setShowChannel(value)
          }}
        />
      </Popup>
    </div>
  )
}

export default Index
