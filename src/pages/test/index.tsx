import './index.scss'
import Icon from '@/components/icon'
import { Toast, Button, Form, Input } from 'antd-mobile'

const Test = () => {
  return (
    <div className="test">
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
