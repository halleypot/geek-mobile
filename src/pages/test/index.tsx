import style from './index.module.scss'
import Icon from '@/components/icon'
import { Toast, Button, Form, Input, TabBar, Dialog, Tabs } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

const tabs = [
  {
    key: 'home',
    title: '首页',
    icon: <AppOutline />,
  },
  {
    key: 'todo',
    title: '待办',
    icon: <UnorderedListOutline />,
  },
  {
    key: 'message',
    title: '消息',
    icon: (active: boolean) => (active ? <MessageFill /> : <MessageOutline />),
  },
  {
    key: 'personalCenter',
    title: '我的',
    icon: <UserOutline />,
  },
]
// const arr = [
//   { name: ['mobile'], errors: ['wrong number', 'wrong number'], warnings: [] },
//   { name: ['code'], errors: [], warnings: [] },
// ]

// console.log(arr.filter((item) => item.errors.length === 0))

const Test = () => {
  return (
    <div className={style.root}>
      {/* Tabs栏 component */}
      <Tabs
        defaultActiveKey="vegetables"
        stretch
        onChange={(key) => console.log(key)}
      >
        <Tabs.Tab title="水果" key="fruits">
          菠萝
        </Tabs.Tab>
        <Tabs.Tab title="蔬菜" key="vegetables">
          西红柿
        </Tabs.Tab>
        <Tabs.Tab title="动物" key="animals">
          蚂蚁
        </Tabs.Tab>
        <Tabs.Tab title="水果" key="fruits1">
          菠萝
        </Tabs.Tab>
        <Tabs.Tab title="蔬菜" key="vegetables1">
          西红柿
        </Tabs.Tab>
        <Tabs.Tab title="动物" key="animals1">
          蚂蚁
        </Tabs.Tab>
        <Tabs.Tab title="水果" key="fruits2">
          菠萝
        </Tabs.Tab>
        <Tabs.Tab title="蔬菜" key="vegetables2">
          西红柿
        </Tabs.Tab>
        <Tabs.Tab title="动物" key="animals2">
          蚂蚁
        </Tabs.Tab>
      </Tabs>
      <Button
        block
        onClick={() => {
          Dialog.show({
            content: '人在天边月上明，风初紧，吹入画帘旌',
            closeOnAction: true,
            actions: [
              {
                key: 'online',
                text: '在线阅读',
              },
              {
                key: 'download',
                text: '下载文件',
              },
              [
                {
                  key: 'cancel',
                  text: '取消',
                },
                {
                  key: 'delete',
                  text: '删除',
                  bold: true,
                  danger: true,
                },
              ],
            ],
          })
        }}
      >
        自定义按钮
      </Button>
      <TabBar className="tabs">
        {tabs.map((item) => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
          ></TabBar.Item>
        ))}
      </TabBar>

      <h2 className="test-h2">Test component</h2>
      <div className="box1"></div>
      <div className="box2"></div>

      <Icon
        type="iconbtn_collect"
        handleClick={() => {
          console.log(123)
        }}
      />

      <Button
        onClick={() =>
          Toast.show({
            content: 'Toast Tips',
            afterClose: () => {
              console.log('after')
            },
          })
        }
      >
        {' '}
        Toast Button
      </Button>
      <Form
        layout="vertical"
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Header>
          自定义表单控件<h5>分组标题</h5>
        </Form.Header>

        <Form.Item label="姓名" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="mobile"
          rules={[
            { required: true },
            {
              validator: (_: any, value: string) => {
                if (!value) {
                  return Promise.reject(new Error('mobile number'))
                }
              },
            },
          ]}
        >
          <Input placeholder="请输手机号" />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Test
