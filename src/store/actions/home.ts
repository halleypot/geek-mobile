import type { RootThunkAction } from '@/types/store'
import type { Channel, UserChannelResponse } from '@/types/data'
import http from '@/utils/request'

export const getUserChannels = (): RootThunkAction => {
  return async (dispatch) => {
    const res: UserChannelResponse = await http.get('/user/channels')
    dispatch({ type: 'home/getUserChannels', payload: res.data.channels })
  }
}

export const getRestChannels = (): RootThunkAction => {
  return async (dispatch, getState) => {
    const {
      data: { channels },
    }: UserChannelResponse = await http.get('/channels')
    const {
      home: { userChannel },
    } = getState()
    //  get recommended channels by subtracting user channels from all channels
    const restChannels = channels.filter(
      (channel) =>
        userChannel.findIndex((item) => item.name === channel.name) === -1
    )

    dispatch({ type: 'home/getRestChannels', payload: restChannels })
  }
}

export const delUserChannel = (channel: Channel): RootThunkAction => {
  return (dispatch) => {
    http.delete('/user/channels/' + channel.id)
    // delete targeted channel, and update redux
    dispatch({ type: 'home/delChannel', payload: channel })
  }
}

export const addChannel = (channel: Channel): RootThunkAction => {
  return async (dispatch) => {
    await http.patch('/user/channels', { channels: [channel] })
    // update channel
    dispatch({ type: 'home/addChannel', payload: channel })
  }
}
