const msgAtStart = 'Message form chef'

const initialState = {
  content: msgAtStart,
  visibility: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_MSG':
    return state = { content: action.content, visibility: true }
  case 'HIDE_MSG':
    return state = { content: '', visibility: false }
  default:
    return state
  }
}

export const showMsg = (content) => {
  return {
    type: 'NEW_MSG',
    content
  }
}

export const hideMsg = () => {
  return {
    type: 'HIDE_MSG'
  }
}

export default notificationReducer
