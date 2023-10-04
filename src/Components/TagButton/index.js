const TagButton = props => {
  const {details, OnFilter} = props
  const {displayText} = details
  const Filter = () => {
    OnFilter(displayText)
  }
  return (
    <li>
      <button type="button" onClick={Filter}>
        {displayText}
      </button>
    </li>
  )
}
export default TagButton
