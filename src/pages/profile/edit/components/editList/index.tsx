import { EditUserDetails } from '@/types/data'
import styles from './index.module.scss'

type Props = {
  onCancel: () => void
  updateProfile: (info: EditUserDetails) => void
  mode: 'photo' | 'gender' | ''
}

const genderList = [
  { text: 'Male', value: 0 },
  { text: 'Female', value: 1 },
]

const photoList = [
  { text: '拍照', value: 'picture' },
  { text: '本地选择', value: 'local' },
]

const EditList = ({ onCancel, updateProfile, mode }: Props) => {
  const list = mode === 'gender' ? genderList : photoList

  // click to update gender or upload photo
  const handleClick = (value: number | string) => {
    if (mode === 'gender') {
      updateProfile({ mode: 'gender', gender: value })
    } else if (mode === 'photo') {
      updateProfile({ photo: value as string, mode: 'photo' })
    }
  }

  return (
    <div className={styles.root}>
      {list.map((item) => (
        <div
          className="list-item"
          key={item.text}
          onClick={() => handleClick(item.value)}
        >
          {item.text}
        </div>
      ))}
      <div className="list-item" onClick={onCancel}>
        Cancel
      </div>
    </div>
  )
}

export default EditList
