import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      color: 'green',
      borderColor: 'green',
      marginTop: 5,
      borderRadius: 5,
      padding: 10,
      borderWidth: 2
    }
    const { notification } = this.props
    //console.log('NOTIF:: ', notification)
    const visibility = { display: notification.visibility ? '' : 'none' }
    return (
      <div style={visibility}>
        <div style={style}>
          { notification.content }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)
