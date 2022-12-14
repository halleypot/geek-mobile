import {
  Button,
  List,
  DatePicker,
  NavBar,
  Popup,
  Toast,
  Dialog,
} from 'antd-mobile'
import classNames from 'classnames'
import { editUserDetails, getUserDetails } from '@/store/actions/user'
import { useHistory } from 'react-router-dom'

import styles from './index.module.scss'
import useInitialState from '@/utils/use-initial-state'
import { useRef, useState } from 'react'
import EditInput from './components/editInput'
import { useDispatch } from 'react-redux'
import EditList from './components/editList'
import { EditUserDetails, UserPhotoResponse } from '@/types/data'
import moment from 'moment'
import http from '@/utils/request'
import { AxiosError } from 'axios'
import { logoutAction } from '@/store/actions/login'

const Item = List.Item

type InputPopup = {
  mode: '' | 'name' | 'intro'
  visible: boolean
  value: string | undefined
}

type ListPopup = {
  mode: '' | 'gender' | 'photo'
  visible: boolean
}

const ProfileEdit = () => {
  const history = useHistory()
  // create photo ref
  const photoRef = useRef<HTMLInputElement>(null)

  // intialize nickname or self-introduction popup component
  const [inputPopup, setInputPopup] = useState<InputPopup>({
    mode: '',
    visible: false,
    value: '',
  })

  // initialize gender and photo popup component
  const [listPopup, setListPopup] = useState<ListPopup>({
    mode: '',
    visible: false,
  })

  // initialize birth datepicker component
  const [showBirth, setShowBirth] = useState(false)

  const dispatch = useDispatch()
  // get user's personal details
  const { userDetails } = useInitialState(getUserDetails, 'profile')
  const { id, photo, intro, gender, name, birthday } = userDetails

  const updateProfile = async (info: EditUserDetails) => {
    if (info.mode === 'photo') {
      setListPopup({ mode: '', visible: false })
      // click photo in editList component and open upload file here
      return photoRef.current!.click()
    }

    await dispatch<any>(editUserDetails(info))
    Toast.show({
      icon: 'success',
      content: (
        <p style={{ height: '100px' }}>{`${info.mode} has been changed`}</p>
      ),
    })
    // close pop-up layer
    if (info.mode === 'nickname' || info.mode === 'self-introduction')
      setInputPopup({ mode: '', visible: false, value: '' })
    else setListPopup({ mode: '', visible: false })
  }

  // monitor photo-changed event
  const onChangePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    if (!e.target.files?.length) {
      return
    }
    const formData = new FormData()
    formData.append('photo', e.target.files[0])

    // 方法一：
    // await dispatch<any>(editUserPhoto(formData))

    // 方法二：
    try {
      const {
        data: { photo },
      }: UserPhotoResponse = await http.patch('/user/photo', formData)
      dispatch<any>(editUserDetails({ photo }))
      alert('图片上传成功')
    } catch (error) {
      const e = error as AxiosError
      alert('图片上传失败')
      return Promise.reject(e)
    }
  }

  // logout
  const toLogout = () => {
    Dialog.show({
      content: 'Confirm to Logout?',
      closeOnAction: true,
      actions: [
        [
          {
            key: 'cancel',
            text: 'Cancel',
          },
          {
            key: 'exit',
            text: 'Exit',
            style: {
              color: 'var(--geek-color-black)',
            },
          },
        ],
      ],
      onAction: (action) => {
        if (action.key === 'exit') {
          dispatch(logoutAction())
          Toast.show({
            icon: 'success',
            content: 'successful to logout',
            duration: 1000,
            afterClose: () => history.replace('/login'),
          })
        }
      },
    })
  }

  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0',
          }}
          onBack={() => history.go(-1)}
        >
          个人信息
        </NavBar>

        <div className="wrapper" key={id}>
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img
                    width={24}
                    height={24}
                    src={
                      photo || 'http://toutiao.itheima.net/images/user_head.jpg'
                    }
                    alt=""
                  />
                </span>
              }
              arrow
              onClick={() => setListPopup({ mode: 'photo', visible: true })}
            >
              头像
            </Item>
            {/* set nickname */}
            <Item
              arrow
              extra={name}
              onClick={() =>
                setInputPopup({ mode: 'name', visible: true, value: name })
              }
            >
              昵称
            </Item>
            {/* set self introduction */}
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {intro || 'not filled'}
                </span>
              }
              // click to show self-intro editor
              onClick={() =>
                setInputPopup({ mode: 'intro', visible: true, value: intro })
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item
              arrow
              extra={gender === 0 ? '男' : '女'}
              onClick={() => setListPopup({ mode: 'gender', visible: true })}
            >
              性别
            </Item>
            <Item arrow extra={birthday} onClick={() => setShowBirth(true)}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={showBirth}
            value={new Date(birthday)}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
            onCancel={() => setShowBirth(false)}
            onConfirm={(birth) => {
              updateProfile({
                mode: 'birthday',
                birthday: moment(birth).format('YYYY-MM-DD'),
              })
              setShowBirth(false)
            }}
          />
        </div>

        <div className="logout">
          {/* button to click to logout */}
          <Button className="btn" onClick={toLogout}>
            退出登录
          </Button>
        </div>
      </div>

      {/* Popup component to edit nickname */}
      <Popup
        visible={inputPopup.visible}
        position="right"
        bodyStyle={{ width: '100vw', height: '100vh' }}
        destroyOnClose
      >
        <EditInput
          onClose={() => setInputPopup({ mode: '', visible: false, value: '' })}
          editProfile={updateProfile}
          mode={inputPopup.mode}
          value={inputPopup.value}
        />
      </Popup>
      {/* Popup component to edit gender and photo*/}
      <Popup
        visible={listPopup.visible}
        onMaskClick={() => setListPopup({ mode: '', visible: false })}
        destroyOnClose
      >
        <EditList
          onCancel={() => setListPopup({ mode: '', visible: false })}
          updateProfile={updateProfile}
          mode={listPopup.mode}
        />
      </Popup>

      {/* upload photo label */}
      <input type="file" hidden ref={photoRef} onChange={onChangePhoto} />
    </div>
  )
}

export default ProfileEdit
