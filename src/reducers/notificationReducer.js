const msgAtStart = 'Message form chef'

const initialState = {
  content: msgAtStart,
  actionType: 'INIT',
  visibility: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_MSG':
    return state = { content: action.content, actionType: action.actionType, visibility: true }
  case 'HIDE_MSG':
    return state = initialState
  default:
    return state
  }
}

export const showMsg = (content, actionType) => {
  return {
    type: 'NEW_MSG',
    content,
    actionType
  }
}

export const hideMsg = () => {
  return {
    type: 'HIDE_MSG'
  }
}

export default notificationReducer
