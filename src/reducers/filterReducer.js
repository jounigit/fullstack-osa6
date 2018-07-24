const filterReducer = (state = 'INIT', action) => {
  //console.log('FILTER REDUCER:: ', state, ' TYPE: ', action.filter)
  switch (action.type) {
  case 'SET_FILTER':
    //console.log('FILTER switch:: ', action.filter)
    return action.filter
  default:
    return state
  }
}

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default filterReducer
