import { EditUserDetails } from '@/types/data'
import { Input, InputRef, NavBar, TextArea, TextAreaRef } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'

import styles from './index.module.scss'

type Props = {
  onClose: () => void
  editProfile: (info: EditUserDetails) => void
  mode: string
  value: string | undefined
}

const EditInput = ({ onClose, editProfile, mode, value }: Props) => {
  const inpRef = useRef<InputRef>(null)
  const textRef = useRef<TextAreaRef>(null)
  // initialize inpout /textarea controlled-component
  const [inputText, setInputText] = useState(value)
  // to check whether is name-edited or self-intro component
  const isName = mode === 'name'

  // focus on nicname-input lable when entering
  useEffect(() => {
    if (isName) {
      inpRef.current!.focus()
    } else {
      textRef.current!.focus()
    }
  }, [isName])

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          <span
            className="commit-btn"
            onClick={() =>
              editProfile(
                isName
                  ? { name: inputText || '', mode: 'nickname' }
                  : { intro: inputText || '', mode: 'self-introduction' }
              )
            }
          >
            提交
          </span>
        }
        onBack={onClose}
      >
        {isName ? `编辑昵称` : `编辑简介`}
      </NavBar>

      <div className="edit-input-content">
        <h3>{mode}</h3>

        <div className="input-wrap">
          {isName ? (
            <Input
              placeholder="请输入"
              ref={inpRef}
              value={inputText}
              onChange={setInputText}
            />
          ) : (
            <TextArea
              placeholder="请输入内容"
              ref={textRef}
              value={inputText || ''}
              onChange={setInputText}
              showCount
              maxLength={100}
            ></TextArea>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditInput
