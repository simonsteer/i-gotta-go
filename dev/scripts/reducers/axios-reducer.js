const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AXIOS_PENDING': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'AXIOS_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'AXIOS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      }
    }
    default:
      return state
  }
}