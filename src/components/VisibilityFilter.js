import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

class VisibilityFilter extends React.Component {
  handleChange = (event) => {
    this.props.filterChange(event.target.value.toUpperCase())
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({ filter: state.filter }),
  { filterChange }
)(VisibilityFilter)
