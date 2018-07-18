import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const message = this.props.store.getState().message
    const visibility = { display: message.visibility ? '' : 'none' }
    return (
      <div style={visibility}>
        <div style={style}>
          {message.content}
        </div>
      </div>
    )
  }
}

export default Notification
