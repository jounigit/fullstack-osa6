const filterReducer = (state = 'INIT', action) => {
  switch (action.type) {
  case 'SET_FILTER':
    console.log('FILTER reduce:: ', action.filter)
    return action.filter
  default:
    return state
  }
}

export const filterChange = (filter) => {
  console.log('FILTER:: ', filter)
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default filterReducer
