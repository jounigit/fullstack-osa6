import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { showMsg, hideMsg } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  klik = (id, content) => () => {
    console.log(id)
    this.props.store.dispatch(vote(id))
    this.props.store.dispatch(showMsg(content))
    setTimeout(() => {
      this.props.store.dispatch(hideMsg())
    }, 5000)
  }
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.klik(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
