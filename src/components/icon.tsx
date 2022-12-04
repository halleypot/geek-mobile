import classnames from 'classnames'

type props = {
  type: string
  className?: string
  handleClick?: () => void
}

const Icon = ({ type, className, handleClick }: props) => {
  return (
    <svg
      className={classnames('icon', className)}
      aria-hidden="true"
      onClick={handleClick}
    >
      {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
      <use xlinkHref={'#' + type}></use>
    </svg>
  )
}

export default Icon
