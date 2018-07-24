import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showMsg, hideMsg } from '../reducers/notificationReducer'
import Filter from '../components/VisibilityFilter'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  klik = (id, content) => async () => {
    const anecdotes = await anecdoteService.getAll()
    const anecdote = anecdotes.find(a => a.id === id)
    const toUpdate = { ...anecdote, votes: anecdote.votes+1 }
    const changedAnecdote = await anecdoteService.update(id, toUpdate)
    this.props.vote(changedAnecdote)
    this.props.showMsg(content, 'VOTE')
    setTimeout(() => {
      this.props.hideMsg()
    }, 5000)


  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotesToShow.map(anecdote =>
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

const anecdotesToShow = (anecdotes, filter) => {
  if (filter === 'FIRST') {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }
  if (filter === 'LAST') {
    return anecdotes.sort((a, b) => a.votes - b.votes)
  }
  return anecdotes
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  vote,
  showMsg,
  hideMsg
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
