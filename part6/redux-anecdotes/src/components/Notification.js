import { useSelector, connect } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === null) {
    return null
  } else {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

const ConnectedNotification = connect()(Notification)
export default ConnectedNotification
// export default Notification