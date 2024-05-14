import './index.css'

const ContentImage = props => {
  const {eachImage, imageClickedVerify} = props
  const {id, thumbnailUrl} = eachImage

  const clickedImage = () => {
    imageClickedVerify(id)
  }

  return (
    <li>
      <button type="button" className="list-image" onClick={clickedImage}>
        <img src={thumbnailUrl} alt="thumbnail" className="each-image" />
      </button>
    </li>
  )
}

export default ContentImage
