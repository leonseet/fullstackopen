import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
      showNotification(state, action) {
        return action.payload
      },
      hideNotification(state, action) {
        return null
      }
    }
  })
  
export const { showNotification, hideNotification } = notificationSlice.actions

let timeoutId = null

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch(showNotification(message))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => dispatch(hideNotification()), duration)
  }
}

export default notificationSlice.reducer