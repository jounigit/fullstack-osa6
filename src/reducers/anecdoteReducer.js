import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.data.id)

    return [...old, action.data ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.data]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const vote = (data) => {
  return {
    type: 'VOTE',
    data
  }
}

export default anecdoteReducer
