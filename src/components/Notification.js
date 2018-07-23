import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const message = this.props.store.getState().notification
    const visibility = { display: message.visibility ? '' : 'none' }

    const showMsg = message.actionType === 'VOTE' ?
      `you voted '${message.content}'` :
      `you created '${message.content}'`
    return (
      <div style={visibility}>
        <div style={style}>
          { showMsg }
        </div>
      </div>
    )
  }
}

export default Notification
