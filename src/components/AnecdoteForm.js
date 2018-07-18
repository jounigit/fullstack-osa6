import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showMsg, hideMsg } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.store.dispatch(
      createAnecdote(e.target.anecdote.value)
    )
    this.props.store.dispatch(showMsg(e.target.anecdote.value))
    setTimeout(() => {
      this.props.store.dispatch(hideMsg())
    }, 5000)
    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
