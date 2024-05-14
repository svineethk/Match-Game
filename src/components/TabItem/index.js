import './index.css'

const TabItem = props => {
  const {tabList, isActive, tabChanged} = props
  const {tabId, displayText} = tabList

  const activeTabColor = isActive === tabId ? 'tab-color' : 'tab-normal'

  const tabClicked = () => {
    tabChanged(tabId)
  }

  return (
    <li>
      <button
        type="button"
        className={`tab-button ${activeTabColor}`}
        onClick={tabClicked}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
