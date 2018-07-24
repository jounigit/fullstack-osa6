//const getId = () => (100000*Math.random()).toFixed(0)

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.data.id)
    //const voted = store.find(a => a.id === action.id)

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

export const anecdoteInit = (data) => {
  return {
    type: 'INIT',
    data
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
