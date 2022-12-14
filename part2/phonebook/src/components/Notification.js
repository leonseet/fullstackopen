import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if (type === "success") {
    return (
      <div className='successerror'>
        {message}
      </div>
    )
  } else {
    return (
      <div className='failerror'>
        {message}
      </div>
    )
  }

}

export default Notification