import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !== action.data.id)
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

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    const anecdote = anecdotes.find(a => a.id === id)
    const toUpdate = { ...anecdote, votes: anecdote.votes+1 }
    const voted = await anecdoteService.update(id, toUpdate)
    dispatch({
      type: 'VOTE',
      data: voted
    })
  }
}

export default anecdoteReducer
