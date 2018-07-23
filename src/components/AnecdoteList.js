import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { showMsg, hideMsg } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

class AnecdoteList extends React.Component {
  klik = (id, content) => () => {
    console.log(id, ' :: ', content)
    this.props.store.dispatch(vote(id))
    this.props.store.dispatch(showMsg(content, 'VOTE'))
    setTimeout(() => {
      this.props.store.dispatch(hideMsg())
    }, 5000)
  }
  render() {
    const anecdotesToShow = () => {
      const { anecdotes, filter } = this.props.store.getState()
      console.log('LIST:: ', filter)
      if (filter === 'INIT') {
        console.log('do init')
        return anecdotes
      }
      else if (filter === 'FIRST') {
        console.log('do first')
        return anecdotes.sort((a, b) => b.votes - a.votes)
      }
      else {
        return anecdotes
      }
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
