import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const { notification } = this.props
    //console.log('NOTIF:: ', notification)
    const visibility = { display: notification.visibility ? '' : 'none' }

    const showMsg = notification.actionType === 'VOTE' ?
      `you voted '${notification.content}'` :
      `you created '${notification.content}'`
    return (
      <div style={visibility}>
        <div style={style}>
          { showMsg }
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
