import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const message = this.props.store.getState().message
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

export default Notification
