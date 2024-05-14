import {Component} from 'react'
import TabItem from '../TabItem'
import ContentImage from '../ContentImage'
import FinishGamePlay from '../FinishGamePlay'
import './index.css'

class Home extends Component {
  state = {
    allImagesList: [],
    category: [],
    score: 0,
    runTime: 60,
    activeTabId: '',
    randomThumbnailImage: '',
    gamePlayEnd: false,
  }

  constructor(props) {
    super(props)
    const {imagesList, tabsList} = props

    this.state = {
      allImagesList: imagesList,
      category: tabsList,
      score: 0,
      runTime: 60,
      activeTabId: tabsList[0].tabId,
      randomThumbnailImage: imagesList[0],
      gamePlayEnd: false,
    }
  }

  componentDidMount() {
    this.getMatchGame()
  }

  intervalClear = () => {
    clearInterval(this.intervalId)
  }

  getMatchGame = () => {
    this.intervalId = setInterval(this.decrement, 1000)
  }

  decrement = () => {
    const {runTime} = this.state
    if (runTime === 0) {
      this.closeGamePlay()
    } else {
      this.setState(prevState => ({
        runTime: prevState.runTime - 1,
      }))
    }
  }

  renderNavbar = () => {
    const {score, runTime} = this.state

    return (
      <div className="navbar-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="website-logo"
          />
        </div>
        <ul className="score-container">
          <li>
            <p className="score-name">
              Score: <span className="score-number">{score}</span>
            </p>
          </li>
          <li className="timer-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
              className="timer"
            />
            <p className="timer-seconds">{runTime} sec</p>
          </li>
        </ul>
      </div>
    )
  }

  renderRandomImages = () => {
    const {allImagesList} = this.state
    const randomIndex = Math.floor(Math.random() * allImagesList.length)
    const randomThumbnailImage = allImagesList[randomIndex]

    return randomThumbnailImage
  }

  tabChanged = id => {
    this.setState({activeTabId: id})
  }

  getFilteredList = () => {
    const {activeTabId, allImagesList} = this.state

    const filteredList = allImagesList.filter(
      eachImageList => eachImageList.category === activeTabId,
    )

    return filteredList
  }

  imageClickedVerify = id => {
    const {randomThumbnailImage} = this.state

    if (randomThumbnailImage.id === id) {
      const newThumbnailImage = this.renderRandomImages()
      this.setState(prevState => ({
        score: prevState.score + 1,
        randomThumbnailImage: newThumbnailImage,
      }))
    } else {
      this.closeGamePlay()
    }
  }

  closeGamePlay = () => {
    this.intervalClear()
    this.setState({gamePlayEnd: true, runTime: 0})
  }

  playRematch = () => {
    const {allImagesList, category} = this.state
    this.intervalClear()
    this.setState({
      score: 0,
      runTime: 60,
      activeTabId: category[0].tabId,
      randomThumbnailImage: allImagesList[0],
      gamePlayEnd: false,
    })

    this.getMatchGame()
  }

  render() {
    const {
      randomThumbnailImage,
      category,
      activeTabId,
      gamePlayEnd,
      score,
    } = this.state
    const filteredImagesList = this.getFilteredList()

    return (
      <div className="app-container">
        {this.renderNavbar()}
        <div className="player-container">
          {gamePlayEnd ? (
            <FinishGamePlay score={score} playRematch={this.playRematch} />
          ) : (
            <div>
              <img
                src={randomThumbnailImage.imageUrl}
                alt="match"
                className="random-image"
              />
              <ul className="tab-container">
                {category.map(eachTab => (
                  <TabItem
                    key={eachTab.tabId}
                    tabList={eachTab}
                    isActive={activeTabId}
                    tabChanged={this.tabChanged}
                  />
                ))}
              </ul>
              <ul className="image-container">
                {filteredImagesList.map(eachImage => (
                  <ContentImage
                    key={eachImage.id}
                    eachImage={eachImage}
                    imageClickedVerify={this.imageClickedVerify}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home
