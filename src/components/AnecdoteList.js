import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showMsg, hideMsg } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

class AnecdoteList extends React.Component {
  klik = (id, content) => () => {
    this.props.vote(id)
    this.props.showMsg(content, 'VOTE')
    setTimeout(() => {
      this.props.hideMsg()
    }, 5000)
  }
  render() {
    const { anecdotes, filter } = this.props
    const anecdotesToShow = () => {
      switch (filter) {
      case 'FIRST':
        return anecdotes.sort((a, b) => b.votes - a.votes)
      case 'LAST':
        return anecdotes.sort((a, b) => a.votes - b.votes)
      default:
        return anecdotes
      }
    }
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
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
