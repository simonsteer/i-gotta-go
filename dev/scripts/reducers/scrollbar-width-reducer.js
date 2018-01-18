const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SCROLLBAR_WIDTH':
      return {
        ...state,
        ...action.payload
      }
      break
  }
  return state
}