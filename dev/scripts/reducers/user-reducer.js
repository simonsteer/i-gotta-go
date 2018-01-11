const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        ...action.payload
      }
      break
  }
  return state
}