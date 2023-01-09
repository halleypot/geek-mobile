import { Channel } from '@/types/data'
import { homeAction } from '@/types/store'
import { sortBy } from 'lodash'

type HomeState = {
  userChannel: Channel[]
  restChannels: Channel[]
  channelActiveKey: string
}

const channelState: HomeState = {
  userChannel: [],
  restChannels: [],
  channelActiveKey: '',
}

const homeReducer = (state = channelState, action: homeAction) => {
  if (action.type === 'home/getUserChannels') {
    return {
      ...state,
      userChannel: action.payload,
      channelActiveKey: action.payload[0]?.id + '',
    }
  }

  if (action.type === 'home/getRestChannels') {
    return {
      ...state,
      restChannels: action.payload,
    }
  }

  if (action.type === 'home/changeTab') {
    return {
      ...state,
      channelActiveKey: action.payload,
    }
  }

  if (action.type === 'home/delChannel') {
    return {
      ...state,
      // delete target channel
      userChannel: state.userChannel.filter(
        (item) => item.id !== action.payload.id
      ),
      // add the deleted channel into recommended channel, and sorted by Id
      restChannels: sortBy([...state.restChannels, action.payload], 'id'),
    }
  }

  if (action.type === 'home/addChannel') {
    return {
      ...state,
      // add channel to user's channels
      userChannel: sortBy([...state.userChannel, action.payload], 'id'),
      // remove channel from recommended channels
      restChannels: state.restChannels.filter(
        (item) => item.id !== action.payload.id
      ),
    }
  }

  return state
}

export default homeReducer
