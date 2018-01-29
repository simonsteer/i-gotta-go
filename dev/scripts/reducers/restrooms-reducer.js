const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RESTROOMS_PENDING': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'GET_RESTROOMS_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'GET_RESTROOMS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload.data
      }
    }
    default:
      return state
  }
}