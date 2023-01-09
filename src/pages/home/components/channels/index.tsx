import classnames from 'classnames'

import Icon from '@/components/icon'
import styles from './index.module.scss'
import useInitialState from '@/utils/use-initial-state'
import {
  delUserChannel,
  getRestChannels,
  getUserChannels,
} from '@/store/actions/home'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import { Channel } from '@/types/data'
import { Toast } from 'antd-mobile'

type Props = {
  closeChannel: (value: boolean) => void
}

const Channels = ({ closeChannel }: Props) => {
  const { userChannel } = useInitialState(getUserChannels, 'home')
  const { restChannels } = useInitialState(getRestChannels, 'home')
  const { channelActiveKey } = useSelector((state: RootState) => state.home)

  // toggle 'edit' / 'save' status
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()

  // highlight selected channel
  const onChannelClick = (channel: Channel) => {
    if (!isEdit) {
      dispatch({ type: 'home/changeTab', payload: channel.id })
      closeChannel(false)
      return
    }

    // only in editing status, channels can be removed
    // cannot remove item: if first item, current selected item, items number less than 4
    if (channel.id === 0 || userChannel.length <= 4) return
    if (channel.id.toString() === channelActiveKey) return
    dispatch<any>(delUserChannel(channel))
    Toast.show({
      icon: 'success',
      content: 'deleted already',
    })
  }

  // add channel to user channels
  const onAddChannel = (channel: Channel) => {
    dispatch({ type: 'home/addChannel', payload: channel })
  }

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon
          type="iconbtn_channel_close"
          handleClick={() => closeChannel(false)}
        />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            {/* click to  toggle 'edit' / 'save' status */}
            <span
              className="channel-item-edit"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? '保存' : '编辑'}
            </span>
          </div>
          {/* 我的频道 */}
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {userChannel.map((item) => (
              <span
                key={item.id}
                className={classnames(
                  'channel-list-item',
                  channelActiveKey === item.id + '' && 'selected'
                )}
                onClick={() => onChannelClick(item)}
              >
                {item.name}
                {/* exclude selected item, first item, and at least 4 items left */}
                {isEdit &&
                  item.id !== 0 &&
                  item.id.toString() !== channelActiveKey && (
                    <Icon type="iconbtn_tag_close" />
                  )}
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          {/* recommended channels = all channels - user channels */}
          <div className="channel-list">
            {restChannels.map((channel) => (
              <span
                key={channel.id}
                className="channel-list-item"
                onClick={() => onAddChannel(channel)}
              >
                + {channel.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
