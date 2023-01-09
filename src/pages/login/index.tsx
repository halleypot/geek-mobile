import { Button, NavBar, Form, Input, Toast, InputRef } from 'antd-mobile'
import { useDispatch } from 'react-redux'
import type { LoginState } from '@/types/data'
import { loginAction } from '@/store/actions/login'

import styles from './index.module.scss'
import { useHistory, useLocation } from 'react-router-dom'
import { AxiosError } from 'axios'
import http from '@/utils/request'
import { useEffect, useRef, useState } from 'react'

const Login = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const history = useHistory()
  const [timeLeft, setTimeLeft] = useState(0)
  const timerRef = useRef(-1)
  const mobileRef = useRef<InputRef>(null)
  const location = useLocation<{ from: string } | undefined>()

  // declare the time left to resend veri-code

  const onFinish = async (value: LoginState) => {
    console.log(value)
    try {
      // 1. if form verification passed, then send token request
      await dispatch<any>(loginAction(value))
      // switch into home page
      Toast.show({
        icon: 'success',
        content: 'successful to login',
        duration: 1000,
        afterClose: () => {
          const path = location.state!.from

          history.replace(path || '/home')
        },
      })
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      Toast.show({
        icon: 'fail',
        content: err.message,
        afterClose: () => Promise.reject(err.message || 'failed to login'),
      })
    }
  }

  // click to send verification code
  const sendCode = async () => {
    const mobile = form.getFieldValue('mobile')
    const regx = /^1[3-9]\d{9}$/

    const isMobile = regx.test(mobile)

    // if no mobile type error, send code request
    if (isMobile) {
      try {
        await http.get(`/sms/codes/${mobile}`)
        Toast.show({
          icon: 'success',
          content: '发送成功',
        })
        // 设置60秒后重新发送
        setTimeLeft(60)
        // 定时器开启
        timerRef.current = window.setInterval(() => {
          setTimeLeft((timeLeft) => timeLeft - 1)
        }, 1000)
      } catch (err) {
        const error = err as AxiosError<{ message: string }>
        Toast.show({
          icon: 'fail',
          content: error.message,
        })
        return Promise.reject(error.message)
      }
    } else {
      Toast.show({
        content: 'please input correct form of mobile',
        maskStyle: { width: '30em' },
      })
      return mobileRef.current?.focus()
    }
  }

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerRef.current)
    }
  }, [timeLeft])

  // clear timer, after component is destroyed
  useEffect(() => {
    // cursor focus on the mobile input node, after loading the page
    mobileRef.current?.focus()

    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.goBack()}></NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form
          validateTrigger={['onChange']}
          onFinish={onFinish}
          form={form}
          initialValues={{ mobile: '15555555555' }}
        >
          {/* mobile input */}
          <Form.Item
            name="mobile"
            validateTrigger="onChange"
            rules={[
              { required: true, message: 'please input your phone number' },
              { pattern: /^1[3-9]\d{9}$/, message: 'wrong number' },

              {
                validator: (_: any, value: string) => {
                  const regx = /^1[3-9]\d{9}$/
                  if (regx.test(value)) return Promise.resolve()
                  return Promise.reject(new Error('wrong number'))
                },
              },
            ]}
            className="login-item"
          >
            <Input placeholder="请输入手机号" clearable ref={mobileRef} />
          </Form.Item>

          {/* verification code input */}
          <Form.Item
            className="login-item"
            extra={
              <span
                className="code-extra"
                onClick={timeLeft === 0 ? sendCode : undefined}
              >
                {timeLeft === 0 ? '发送验证码' : `${timeLeft}秒后重新发送`}
              </span>
            }
            name="code"
            validateTrigger="onChange"
            rules={[
              { required: true, message: 'please input six-digital code' },
              {
                len: 6,
                message: 'the code should be six ditigal',
              },
            ]}
          >
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle shouldUpdate>
            {() => {
              // param: hasError check the error in the form. if ture,
              // then has error and disable the login button
              const hasError =
                form.getFieldsError().filter((item) => item.errors.length > 0)
                  .length > 0

              // if form is not touched, then disable the login button
              const isTouched = !form.isFieldsTouched(true)
              // console.log(hasError,isTouched)

              return (
                <Button
                  block
                  type="submit"
                  color="primary"
                  className="login-submit"
                  disabled={hasError || isTouched}
                >
                  登 录
                </Button>
              )
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
