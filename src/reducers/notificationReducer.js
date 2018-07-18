const msgAtStart = 'Message form chef'

const notificationReducer = (state = msgAtStart, action) => {
  switch (action.type) {
  case 'NEW_MSG':
    //
    break
  default:
    return state
  }
}

export const showMsg = (msg) => {
  return {
    type: 'NEW_MSG',
    msg
  }
}

export default notificationReducer
