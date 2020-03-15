const nofiticationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.message
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }
}

let timeout

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default nofiticationReducer