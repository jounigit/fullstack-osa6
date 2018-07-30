import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { showMsg, hideMsg } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

class AnecdoteList extends React.Component {
  klik = (id, content) => () => {
    this.props.store.dispatch(vote(id))
    this.props.store.dispatch(showMsg(content, 'VOTE'))
    setTimeout(() => {
      this.props.store.dispatch(hideMsg())
    }, 5000)
  }
  render() {
    const anecdotesToShow = () => {
      const { anecdotes, filter } = this.props.store.getState()
      const regex = new RegExp(filter, 'ig')
      return filter === '' ? anecdotes : anecdotes.filter(a => a.content.match(regex) )
    }
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotesToShow().map(anecdote =>
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
