const getId = () => (100000*Math.random()).toFixed(0)

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {
    return [...store, { content: action.content, id: getId(), votes:0 }]
  }
  if (action.type === 'INIT') {
    return action.content
  }

  return store
}

export const anecdoteInit = (content) => {
  return {
    type: 'INIT',
    content
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export default anecdoteReducer
