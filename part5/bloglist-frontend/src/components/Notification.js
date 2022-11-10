const Notification = ({message, isError}) => {
    if (isError && message !== null) {
        return (
            <div className="error">
                {message}
            </div>
        )
    } else if (isError === false && message !== null) {
        return (
            <div className="success">
                {message}
            </div>
        )
    } else {
        return null
    }
}
  
  export default Notification